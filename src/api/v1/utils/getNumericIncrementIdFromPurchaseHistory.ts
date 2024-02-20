import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getNumericIncrementIdFromPurchaseHistory(): Promise<number> {
    const result = await prisma.purchase_history.findFirst({
        select: {
            id: true,
        },
        orderBy: {
            id: 'desc',
        },
    });
    
    const currentCounter = result ? result.id : 0;
    return currentCounter;
}
