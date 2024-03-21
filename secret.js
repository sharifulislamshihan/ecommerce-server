require('dotenv').config()

const port = process.env.PORT || 5000;

const mongodbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wsbi62n.mongodb.net/homeShopEcommerce`

module.exports = {
    port,
    mongodbURL,
};
