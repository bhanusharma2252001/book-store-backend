import { Router } from 'express';
import {
    GetAllUsersHandler,
    createUserHandler,
    getSingleUserHandler,
    updateUserHandler,
    deleteUserHandler,
    createPaymentIntentHandler,
    stripeWebhookHandler,
    getPurchaseHistoryHandler
} from '../controllers';

import { authenticate, authorize, validate } from '../middlewares';
import { NewUserSchema, createPaymentIntentSchema } from '../schemas';
import { wrapAsync } from '../helpers/WrapAsync';
const UserRouter = Router();

//admin routes
UserRouter.post('/create_user', authenticate(), authorize(["admin"]), validate(NewUserSchema), wrapAsync(createUserHandler));
UserRouter.get('/get_all_users', authenticate(), authorize(["admin"]), wrapAsync(GetAllUsersHandler));
UserRouter.get('/get_user/:userId', authenticate(), authorize(["admin"]), wrapAsync(getSingleUserHandler));
UserRouter.put('/update_user/:userId', authenticate(), authorize(["admin"]), validate(NewUserSchema), wrapAsync(updateUserHandler));
UserRouter.delete('/delete_user/:userId', authenticate(), authorize(["admin"]), wrapAsync(deleteUserHandler));

//buyer routes
UserRouter.get("/getPurchaseHistoryHandler", authenticate(), wrapAsync(getPurchaseHistoryHandler));
UserRouter.post("/create_payment_intent", authenticate(), validate(createPaymentIntentSchema), wrapAsync(createPaymentIntentHandler));
UserRouter.post("/stripe_webhook_handler", stripeWebhookHandler)
export { UserRouter };
