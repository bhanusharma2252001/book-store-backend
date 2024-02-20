import jwt, { decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces';
import { CustomError } from '../helpers';
import createError from 'http-errors';
import { PrismaClient } from '@prisma/client';
import { CustomJwtPayload } from '../interfaces';
const prisma = new PrismaClient();
const { user } = prisma;

const authenticate = () => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') as string;
        const decoded = jwt.verify(token, process.env.secret_token as string) as CustomJwtPayload;
        const user: IUser | null | undefined = await prisma.user.findFirst({
            where: {
                id: decoded.id,
                //@ts-ignore
            }

        });

        if (!user) {
            console.log('Not Auth User Detected');
            throw new CustomError('Bad request', 401, 'Please Authenticate first');
        }

        req.user = user;
        req.id = decoded.id;

        // console.log("user", user);
        next();
    } catch (err: any) {
        res.status(401).send(createError(401, 'Please Authenticate first'));
    }
};

const authorize = (allowedRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    const role = await prisma.role.findFirst({ where: { id: req.user.role_id } })
    if (!req.user || !role || !allowedRoles.includes(role.name)) {
        res.status(403).send(createError(403, 'Not authorized'));
    } else {
        next();
    }

};

export { authenticate, authorize };
