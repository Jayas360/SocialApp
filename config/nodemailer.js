const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');



let transport = nodemailer.createTransport({
    service: 'gmail',
    host : 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "vipinjayas123@gmail.com",
        pass: "Jayas@12"
    }

});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log("error in rendering template");
                return;
            }
            mailHTML = template;
        });
    return mailHTML;
}

module.exports = {
    transporter: this.transporter,
    renderTemplate: renderTemplate
}