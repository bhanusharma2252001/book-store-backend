import { PrismaClient } from '@prisma/client';
import {  sendEmailForNewBookPurchased } from './email';
import { getRevenue } from './getRevenue';
const prisma = new PrismaClient();

export async function handleNewBookPurchased(msg: any) {
    const book = JSON.parse(msg.content.toString());
    console.log(`Received object message:`, book);
    for (const author of book.authors) {
        const foundAuthor = await prisma.user.findFirst( { where : { id : author.user_id } });
        const currentMonthRevenue = await getRevenue(author.user_id, 'month');
        const currentYearRevenue = await getRevenue(author.user_id, 'year');
        const totalRevenue = await getRevenue(author.user_id, 'total');
        await sendEmailForNewBookPurchased({ toEmail :  foundAuthor?.email, currentMonthRevenue, currentYearRevenue, totalRevenue })
    }
}