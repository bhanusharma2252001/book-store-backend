import amqp from 'amqplib';

async function setupRabbitMQ( exchangeName : string) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    // const exchangeName = 'my_exchange';
    await channel.assertExchange(exchangeName, 'direct', { durable: true });
    return { connection, channel, exchangeName };
}

export default setupRabbitMQ