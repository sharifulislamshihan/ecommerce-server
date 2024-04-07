require('dotenv').config()

const port = process.env.PORT || 5000;

const mongodbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wsbi62n.mongodb.net/homeShopEcommerce`

const defaultImagePath = 'https://i.ibb.co/bB7cpJG/image.png';

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "jas83&bd^#fk874y&^)*hu(6jba8^769";

const smtpUserName = process.env.SMTP_USER || "";
const smtpPass = process.env.SMTP_PASS || "";

const clientUrl = process.env.CLIENT_URL;

module.exports = {
    port,
    mongodbURL,
    defaultImagePath,
    jwtActivationKey,
    smtpUserName,
    smtpPass,
    clientUrl,
};
