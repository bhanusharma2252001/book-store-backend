import nodemailer from "nodemailer"

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    service: "Gmail",
    auth: {
        user: "bhanusharma252001@gmail.com", // generated ethereal user
        pass: "utdl cjen wgad chau", // generated ethereal password
    },
});

export async function sendOtp(data: any) {
    try {
        let info = await transporter.sendMail({
            from: "bhanusharma252001@gmail.com", // sender address
            to: data.toEmail, // sender address
            subject: "Email Verification OTP - book store", // Subject line
            text: " ", // plain text body
            html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Book Store</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/all.min.css" />
        </head>
        
        <body>
        <center> <h1> Thank you for sign up on bookstore.net </h1> 
        <br> <h2>OTP: ${data.otp}</h2>  </center>
        
        

            </table>
        </body>
        
        </html>`,
        });
        if (info) {
            return info.messageId;
        } else {
            console.log("error");
        }
    } catch (err) {
        console.log(err);
    }
};

export async function sendEmailForNewBook(data : any) {
    try {
        let info = await transporter.sendMail({
            from: "bhanusharma252001@gmail.com", // sender address
            to: data.toEmail, // sender address
            subject: "New book published on bookstore.net", // Subject line
            text: " ", // plain text body
            html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Book Store</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/all.min.css" />
        </head>
        
        <body>
        <center> <h1> Dear User, A new book has been published on bookstore.net </h1> 
        <br> <h2> Title: ${data.title}</h2> 
        <br> <h2> Description: ${data.description}</h2> 
        <br> <h2> Price: ${data.price}</h2>  </center>
            </table>
        </body>
        
        </html>`,
        });
        if (info) {
            return info.messageId;
        } else {
            console.log("error");
        }
    } catch (err) {
        console.log(err);
    }
}

export async function sendEmailForNewBookPurchased(data : any) {
    try {
        let info = await transporter.sendMail({
            from: "bhanusharma252001@gmail.com", // sender address
            to: data.toEmail, // sender address
            subject: "There is a sell of your book!", // Subject line
            text: " ", // plain text body
            html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Book Store</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/all.min.css" />
        </head>
        
        <body>
        <center> <h1> Dear User, A new book has been published on bookstore.net </h1> 
        <br> <h2> Title: ${data.title}</h2> 
        <br> <h2> Description: ${data.description}</h2> 
        <br> <h2> Price: ${data.price}</h2> 
        <br> <h2> your current month revenue is : ${data.currentMonthRevenue} </h2>  
        <br> <h2> your current year revenue is : ${data.currentYearRevenue} </h2>  
        <br> <h2> your current month revenue is : ${data.currentMonthRevenue} </h2>  
        <br> <h2> your total revenue is : ${data.totalRevenue} </h2>  
        </center>
            </table>
        </body>
        
        </html>`,
        });
        if (info) {
            return info.messageId;
        } else {
            console.log("error");
        }
    } catch (err) {
        console.log(err);
    }
}
