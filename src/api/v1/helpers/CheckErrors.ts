import { Response } from 'express';
import { Prisma } from '@prisma/client';

export function checkError(error: any, res: Response) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    const { code, meta } = prismaError;

    if (code === 'P2002') {
      return res.status(409).json({
        success: false,
        errorType: 'Conflict',
        message: `Unique constraint violation on ${meta?.target} field.`,
      });
    } else if (code === 'P2025') {
      return res.status(400).json({
        success: false,
        errorType: 'Bad Request',
        message: `Error ${meta?.modelName}: ${meta?.cause}`,
      });
    } else if (code === 'P2000') {
      return res.status(404).json({
        success: false,
        errorType: 'Not Found',
        message: `Record not found.`,
      });
    } else if (code === 'P2001') {
      return res.status(422).json({
        success: false,
        errorType: 'Unprocessable Entity',
        message: `Foreign key constraint violation.`,
      });
    } 
  }

  if (error.isJoi) {
    return res.status(422).json({
      success: false,
      errorType: 'Unprocessable Entity',
      message: error.message,
    });
  }

  if (error.message) {
    return res.status(400).json({
      success: false,
      errorType: 'Bad Request',
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    errorType: 'Internal Server Error',
    message: 'Internal server error.',
  });
}
