import { Router } from 'express';
import {
    createBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    updateBookByIdHandler,
    deleteBookByIdHandler,
    filterAndSearchBooksHandler
} from '../controllers';
import { wrapAsync } from '../helpers/WrapAsync';
import { authenticate, validate } from '../middlewares';
import { createBookSchema, filterAndSearchBooksSchema, updateBookByIdSchema } from '../schemas/books.schema';

const BookRouter = Router();

BookRouter.post('/', authenticate(), validate(createBookSchema), wrapAsync(createBookHandler));
BookRouter.get('/', authenticate(), wrapAsync(getAllBooksHandler));
BookRouter.get('/filter-search', authenticate(), validate(filterAndSearchBooksSchema), wrapAsync(filterAndSearchBooksHandler));
BookRouter.get('/:id', authenticate(), wrapAsync(getBookByIdHandler));
BookRouter.put('/:id', authenticate(), validate(updateBookByIdSchema), wrapAsync(updateBookByIdHandler));
BookRouter.delete('/:id', authenticate(), wrapAsync(deleteBookByIdHandler));

export { BookRouter };
