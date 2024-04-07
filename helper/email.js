const nodemailer = require("nodemailer");
const { smtpUserName, smtpPass } = require("../secret");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: smtpUserName,
        pass: smtpPass,
    },
});


const sendEmailWithNodeMailer = async (emailData) => {
    try {
        const mailOptions = {
            from: smtpUserName, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            html: emailData.html, // html body
        }

        await transporter.sendMail(mailOptions)
            .then((info) => {
                console.log(`Message sent: ${info.response}`);
            })
    }
    catch (error) {
        console.error(`Error occurred while sending email at ${emailData.email}`, error);
        throw error;
    };
}
module.exports = {
    sendEmailWithNodeMailer,
}
