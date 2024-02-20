import { PrismaClient, PrismaPromise, purchase_history, user } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
const SALT_ROUNDS = 2;
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

import Stripe from 'stripe';
import { publishMessage } from "./book.controller";
import { getNumericIncrementIdFromPurchaseHistory } from "../utils/getNumericIncrementIdFromPurchaseHistory";
import { generatePurchaseId } from "../utils/generatePurchaseId";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const WEBHOOK_SECRET_KEY = process.env.WEBHOOK_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  throw new Error('Stripe secret key is not defined.');
} 
if (!WEBHOOK_SECRET_KEY) {
    throw new Error('webhook secret key is not defined.');
  }

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

export async function createUserHandler(req: Request)//: Promise<{ message: string; user: user }> 
{

  // await prisma.role.create( { data : { name : "author"}})
    if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const user = await prisma.user.create({
        data: req.body
    });

    return { message: 'User created successfully', user };
}

export async function GetAllUsersHandler(): Promise<{ count: number; success: boolean, response: user[] }> {

    const users = await prisma.user.findMany({ include : {
        role : true
    }});
    return {
        count: users.length,
        success: true,
        response: users,
    }

}

export async function getSingleUserHandler(req: Request): Promise<user | { error: string }> {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

export async function updateUserHandler(req: Request): Promise<{ message: string; user: user }> {
    const { userId } = req.params;
    let { email, phone, password, role_id } = req.body;


    if (password) password = await bcrypt.hash(password, SALT_ROUNDS);

    const updatedUser = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            email,
            phone,
            password,
            role_id
        },
    });

    return { message: 'User updated successfully', user: updatedUser };
}

export async function deleteUserHandler(req: Request): Promise<{ message: string; user: user }> {
    const { userId } = req.params;

    const deletedUser = await prisma.user.delete({
        where: {
            id: userId,
        },
    });

    return { message: 'User deleted successfully', user: deletedUser };
}

export async function createPaymentIntentHandler(req: Request): Promise<{ clientSecret: string, order : purchase_history }> {
    const { bookId } = req.body;
    const foundBook = await prisma.book.findUniqueOrThrow( { where: { id : bookId }});
    const user = req.user;
  
    // calculate the amount in cents
    const amountInCents = foundBook.price * 100;
  
     // create purchase history
     const purchase_id = await generatePurchaseId();
     const order = await prisma.purchase_history.create({
      data: {
        purchase_id : purchase_id,
        book: {
          connect: {
            id: bookId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
        price_at_purchasing: foundBook.price,
        quantity: 1,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd', 
      description: 'Book Purchase',
      payment_method_types: ['card'],
      receipt_email: user.email || undefined, 
      metadata: {
        userId: user.id,
        bookId: req.body.bookId,
        orderId : order.id
      },
    });
    
  
    return { clientSecret: paymentIntent.client_secret as string, order };
}

  // Webhook endpoint to handle Stripe events 
export async function stripeWebhookHandler(req: Request, res: Response): Promise <void> {
    const sig = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, 'WEBHOOK_SECRET_KEY' );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${(err as Error).message}`);
      return;
    }
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const userId = paymentIntent.metadata.userId;
    const bookId = paymentIntent.metadata.bookId;
    const orderId = Number(paymentIntent.metadata.orderId);
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded': {
        console.log('PaymentIntent was successful!', paymentIntent);
        let updatedBook;
        await prisma.$transaction(async (prisma ) => {
            // update book sell count
            updatedBook =  await prisma.book.update({
              where: {
                id: bookId,
              },
              data: {
                sell_count: {
                  increment: 1,
                },
              },
              include :{
                authors : true
              }
            });
          
            // create purchase history
          await prisma.purchase_history.update({ where : { id : orderId }, data :{ status: 'succeed'}});
          
          const authors = updatedBook.authors.map( o => o.userId )
            // increase user revenue
          const user  = await prisma.user.updateMany({ where: {   id : { in : authors  } }, data: {   revenue: {    increment: paymentIntent.amount / 100 },
              },
            });
          });
          publishMessage('book purchased', updatedBook)
        break;
      }
        
    case 'payment_intent.canceled': {
      await prisma.purchase_history.update({ where : { id : orderId }, data :{ status: 'cancel'}});
        break;
    }

    case 'payment_intent.payment_failed': {
      await prisma.purchase_history.update({ where : { id : orderId }, data :{ status: 'failed'}});
      break;
    }

    default:
        res.status(400).end();
        return;
    }
  
    // return a response to acknowledge receipt of the event
    res.json({ received: true });
}

export async function getPurchaseHistoryHandler(req: Request): Promise<any> {
  const userId = req.user.id; 
  const purchaseHistory = await prisma.purchase_history.findMany({
      where: {
        user_id: userId,
      },
      include: {
        book: true,
      },
    });

   return { success: true, purchaseHistory };

}
  