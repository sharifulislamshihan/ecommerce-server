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

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);

module.exports = {
    sendEmailWithNodeMailer,
}
