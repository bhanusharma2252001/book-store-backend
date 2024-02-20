import { Prisma, PrismaClient, book } from "@prisma/client";
import setupRabbitMQ from '../../../config/rabbitmq';

export async function publishMessage( channelName : string, data: any) {
    const { channel, exchangeName } = await setupRabbitMQ(channelName);
    const message = JSON.stringify(data);
    channel.publish(exchangeName, '', Buffer.from(message));
    console.log(`Sent message: ${data}`);
}
import { Request, Response } from "express";
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Create a new book
export async function createBookHandler(req: Request): Promise< { success : boolean, book : book } > {
  const book = await prisma.book.create({
    data: req.body
  });
  publishMessage('new book created', book )
  return { success: true, book };

}

// Get all books
export async function getAllBooksHandler(req: Request): Promise<any> {
  const books = await prisma.book.findMany({
    include: {
      authors: {
        include: {
          user: {
            select: {
              first_name: true,
              last_name: true,
              email: true,

            },
          },
        },
      },
    },
  });
  return { success: true, books };

}

// Get a single book by ID
export async function getBookByIdHandler(req: Request, res: Response): Promise<any> {

  const bookId = req.params.id;
  const book = await prisma.book.findUnique({
    where: { id: bookId }, include :{ 
      authors : true
    }
  });

  if (!book) throw new Error('Book not found');
  return { success: true, book };

}

// Update a book by ID
export async function updateBookByIdHandler(req: Request, res: Response): Promise<any> {

  const bookId = req.params.id;
  const { title, description, price } = req.body;

  const updatedBook = await prisma.book.update({
    where: { id: bookId },
    data: { title, description, price },
  });

  return { success: true, book: updatedBook };

}

// Delete a book by ID
export async function deleteBookByIdHandler(req: Request, res: Response): Promise<any> {

  const bookId = req.params.id;
  await prisma.book.delete({
    where: { id: bookId },
  });
  return { success: true, message: 'Book deleted successfully' };

};

export async function filterAndSearchBooksHandler(req: Request): Promise<any> {

  const { title, minPrice, maxPrice, searchTerm } = req.query;

  const filterOptions = {
    ...(title && { title: { contains: title as string } }),
    ...(minPrice && { price: { gte: parseInt(minPrice as string, 10) } }),
    ...(maxPrice && { price: { lte: parseInt(maxPrice as string, 10) } }),
  };

  const books = await prisma.book.findMany({
    where: {
      AND: [
        filterOptions,
        searchTerm
          ? {
            OR: [
              { title: { contains: searchTerm as string } },
              { description: { contains: searchTerm as string } },
            ],
          }
          : {},
      ],
    },
  });

  return { success: true, books }
};