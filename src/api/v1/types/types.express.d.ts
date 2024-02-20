export declare global {
    namespace Express {
        export interface Request {
            user: IUser;
            id : string;
            otp : string;
            email: string
        }
    }
}
