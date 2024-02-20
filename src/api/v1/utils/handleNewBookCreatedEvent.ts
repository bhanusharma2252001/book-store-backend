import { PrismaClient } from '@prisma/client';
import { sendEmailForNewBook } from './email';
const prisma = new PrismaClient();
export async function handleNewBookCretedEvent( msg : any) {
    const buyerRoleId = await prisma.role.findFirst({ where: { name: "buyer" } });
            if (!buyerRoleId) throw new Error('role for buyer does not exist');
            
            const allBuyers = await prisma.user.findMany({ 
                where: { role_id: buyerRoleId.id }, 
                select: { email: true } 
            });
            
            const allBuyersEmail = allBuyers.map(o => o.email);
            let emailCounter = 0;
            const book = JSON.parse(msg.content.toString());
            console.log(`Received object message:`, book);

            const interval = setInterval(async () => {
                // console.log("executed", allBuyers, emailCounter );
                
                let emails = allBuyersEmail.slice(emailCounter, 100 );
                // console.log("emails", emails );
                if (emails.length == 0) {
                    clearInterval(interval);
                    return;
                } 
               
                
                await sendEmailForNewBook({ 
                    toEmail: emails, 
                    title : book.title, 
                    description : book.description,
                    price : book.price
                 });
                emailCounter += 100;
            }, 1000 * 5);
}