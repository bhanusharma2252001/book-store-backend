import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { logger } from './config/logger';
import { routes } from './routers';
import './config/database';
import { RequestHandler } from 'express-serve-static-core';
import setupRabbitMQ from './config/rabbitmq';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { data } from "../src/api/v1/doc/index"
import { handleNewBookCretedEvent } from './api/v1/utils/handleNewBookCreatedEvent';
import { handleNewBookPurchased } from './api/v1/utils/handleNewBookPurchasedEvent';

async function consumeMessages(eventName: string, fun : Function) {
    const { channel, exchangeName } = await setupRabbitMQ(eventName);
    const queueName = 'my_queue';

    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchangeName, '');

    channel.consume(queueName, async (msg) => {
        if (msg) {
            await fun(msg);
            channel.ack(msg);
        }
    });
}
consumeMessages("new book created", handleNewBookCretedEvent);
consumeMessages("book purchased", handleNewBookPurchased);

dotenv.config();

const app = express();
const swaggerSpecs = swaggerJSDoc(data);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.enable('trust proxy');
app.disable('x-powered-by');

// Mapping all modules path and path-handler
routes.map((route: { path: string; handler: RequestHandler }) => {
    app.use(route.path, route.handler);
});

app.get('/', async (req, res) => {
    return res.json({ status: 'active' });
});

const PORT = process.env.PORT || 5000;

async function init() {
    app.listen(PORT, () => {
        logger.info(`=================================`);
        logger.info(`======= ENV: ${process.env.NODE_ENV} =========`);
        logger.info(`🚀 App listening on the port ${PORT}`);
        logger.info(`=================================`);
        console.log('Server is running on port ' + PORT);
    });
}

init();
