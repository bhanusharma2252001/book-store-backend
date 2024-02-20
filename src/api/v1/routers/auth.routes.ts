import { Router } from 'express';
import { loginHander, registerHandler, sendOTPHandler, verifyOTPHanlder } from '../controllers';
import { validate } from '../middlewares';
import {
    SendOTPSchema,
    VerifyOTPSchema,
    loginSchema,
    registerSchema,
} from '../schemas';
import { wrapAsync } from '../helpers/WrapAsync';
const AuthRouter = Router();

AuthRouter.post('/send_otp', validate(SendOTPSchema), wrapAsync(sendOTPHandler));
AuthRouter.post('/verify_otp', validate(VerifyOTPSchema), wrapAsync(verifyOTPHanlder));
AuthRouter.post('/register', validate(registerSchema), wrapAsync(registerHandler));
AuthRouter.post('/login', validate(loginSchema), wrapAsync(loginHander));

export { AuthRouter };
