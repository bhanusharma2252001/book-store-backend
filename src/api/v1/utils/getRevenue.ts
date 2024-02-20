const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function getRevenue(userId: string, granularity: string) {
  try {
    let startDate, endDate;

    if (granularity === 'year') {
      const currentYear = new Date().getFullYear();
      startDate = new Date(`${currentYear}-01-01T00:00:00`);
      endDate = new Date(`${currentYear + 1}-01-01T00:00:00`);
    } else if (granularity === 'month') {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      startDate = new Date(`${currentYear}-${currentMonth}-01T00:00:00`);
      endDate = new Date(`${currentYear}-${currentMonth + 1}-01T00:00:00`);
    } else if (granularity === 'total') {
      startDate = new Date("1970-01-01T00:00:00");
      endDate = new Date();
    } else {
      throw new Error("Invalid granularity. Use 'year', 'month', or 'total'.");
    }

    const revenueData = await prisma.purchase_history.aggregate({
      _sum: {
        price_at_purchasing: true,
      },
      where: {
        AND: [
          { user_id: userId },
          { purchase_date: { gte: startDate, lt: endDate } },
        ],
      },
    });

    const revenue = revenueData._sum.price_at_purchasing || 0;

    return revenue;
  } catch (error) {
    console.error("Error fetching revenue:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

