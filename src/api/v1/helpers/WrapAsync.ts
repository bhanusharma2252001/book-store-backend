import { Request, Response } from 'express';
import { checkError } from './CheckErrors';

type AsyncFunction = (req: Request, res: Response) => Promise<any>;

export const wrapAsync = (fn: AsyncFunction) => {
    return async (req: Request, res: Response) => {
        try {
            const result = await fn(req, res);
            res.status(200).send(result);

        } catch (err) {
            checkError(err, res);
        }
    };
};
