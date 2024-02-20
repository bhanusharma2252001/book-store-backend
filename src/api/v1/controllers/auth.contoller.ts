import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { sendOtp } from "../utils/email";
import bcrypt from 'bcrypt';
import { generateAuthToken } from "../utils/GenerateToken";
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
const { user } = prisma;

export async function sendOTPHandler(req: Request) {
    const { email } = req.body;
   

    const alreadyExist = await prisma.user.findFirst({ where:{  email , is_email_verified : true}});
    if(alreadyExist) throw new Error('User already exists.')
   
    const otp = Math.floor(100000 + Math.random() * 900000);

    const newUser = await prisma.user.upsert({
        where: { email },
        update: {
            otp,
            otp_date: Math.floor(Date.now() / 1000) + 300, // 5 minutes expiration
        },
        create: {
            email,
            otp,
            otp_date: Math.floor(Date.now() / 1000) + 300,
        }

    });

    await sendOtp({ toEmail: email, otp: otp })
    return { success: true, message: 'OTP sent successfully', newUser };
}

export async function verifyOTPHanlder(req: Request) {
    const { email, otp } = req.body;
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    if (user && user.otp === otp && user.otp_date && user.otp_date > Math.floor(Date.now() / 1000)) {
        await prisma.user.update({ where: { email }, data :{ is_email_verified : true}});
        return { success: true, message: 'OTP verified successfully' };
    } else throw new Error('Invalid OTP or expired');
};

export async function registerHandler(req: Request) {
    const { email } = req.body;
 
   // Verify the OTP
    await verifyOTPHanlder(req);
   
    //To avoid updation of email and otp 
    delete req.body.email;
    delete req.body.otp;
    req.body.password = await bcrypt.hash(req.body.password, 5);
    const user = await prisma.user.update({
        where: { email },
        data: {
            ...req.body
        },
    });
    if (user) return { user };
    else throw new Error('Server Error');

}

export async function loginHander(req: Request) {
    const { email , password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) throw new Error('User doest not exist');
    
    const hashedPassword = user.password;
    if (hashedPassword === null)  throw new Error('Password is null'); 
      
    const isPasswordMatch =  await bcrypt.compare(password,hashedPassword);
    const accessToken = await generateAuthToken(user);
    if (isPasswordMatch) return { success: true, user, accessToken };
    throw new Error('Invalid username or password');
}



