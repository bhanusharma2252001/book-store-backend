# Book Store Application

## Overview

This repository contains the backend implementation for a Book Store Application. The backend focuses on user management, book management, purchase history, and revenue tracking for authors.

## Logic for Computing `sellCount`

The `sellCount` for each book is computed dynamically based on the purchase history. The logic involves incrementing the `sellCount` each time a book is purchased. This ensures real-time tracking of book sales. The `sellCount` is updated using Prisma's `update` operation in book model whenever a successful purchase occurs.

## Mechanism for Sending Email Notifications

Email notifications are sent asynchronously using a message queue (RabbitMQ). The application utilizes RabbitMQ to publish messages whenever a new book is created or a purchase is made. A background job subscribes to these events and sends email notifications to the relevant users, such as authors or buyers. This asynchronous mechanism ensures timely and efficient email delivery without affecting the main application flow.

## Database Design and Implementation

### Entities:

#### Users:

- User authentication and authorization are implemented using roles (Author, Admin, Retail User).
- Prisma's `user` model includes fields for email, phone, password (hashed), and relationships with other entities.

#### Books:

- Unique book identifiers (`id`), title, description, price, and dynamic `sellCount` based on purchase history.
- Relationships with authors, purchase history, ratings, and reviews.

#### Purchase History:

- Unique purchase identifiers (`id`) following the specified format ({{YEAR}}-{{MONTH}}-{{numeric increment id}}).
- Relationships with books and users.
- Status field to track the payment status (e.g., intent_created, succeed, cancel, failed).

#### Revenue Tracking:

- Authors' revenue is updated based on successful book purchases.
- Prisma's `$transaction` ensures atomicity when updating multiple records, ensuring consistency in the database.

### Additional Features:

- Secure payment processing using Stripe for book purchases.
- Rate-limiting mechanism for sending bulk email notifications to avoid spamming.

## Setup

Follow these steps to set up and run the application locally:

1. Clone the repository: `git clone <repository-url>` ( bhavnes - branch)
2. Install dependencies: `npm install`
3. Configure environment variables (PORT, DATABASE_URL, secret_token(JWT),STRIPE_SECRET_KEY, WEBHOOK_SECRET_KEY.)
4. Run the application in dev mode: `npm run dev`
5. insert the 3 records manually in role table ( role names must be "author","buyer","admin" )
6. create new users using these roleIds.
7. Now you can hit all apis


