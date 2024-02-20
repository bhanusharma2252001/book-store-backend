import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.findMany();
    logger.info("db connected successfully")

    
}
main()
.catch(e => {
    logger.error("db error: ", e)
})
.finally(async () => {
        await prisma.$disconnect();
});
