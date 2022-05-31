const nodeMailer = require('../config/nodemailer');

//This is another way of exporting a method
exports.newComment = (comment) => {
    console.log("inside new comment mailer");

    nodeMailer.transporter.send
}