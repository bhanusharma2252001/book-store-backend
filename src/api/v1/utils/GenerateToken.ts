import jwt from 'jsonwebtoken';

export const generateAuthToken = (user: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!user) {
            reject(new Error('provide user'));
        }
        const { id } = user;
        const secretToken = process.env.secret_token as string;

        const token = jwt.sign({ id: id.toString() }, secretToken).toString();
        resolve(token);
    });
};
