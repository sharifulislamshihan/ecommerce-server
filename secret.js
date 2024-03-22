require('dotenv').config()

const port = process.env.PORT || 5000;

const mongodbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wsbi62n.mongodb.net/homeShopEcommerce`

const defaultImagePath = 'https://i.ibb.co/bB7cpJG/image.png';
module.exports = {
    port,
    mongodbURL,
    defaultImagePath,
};
