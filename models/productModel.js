const { Schema, model } = require('mongoose');



// name, slug, description, price, quantity, sold, shipping(paid/free), image
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name required'],
        trim: true,
        minlength: [1, 'Product name must be 1 character long'],
        maxlength: [150, 'length of product name can not be more than 150'],
    },

    slug: {
        type: String,
        required: [true, 'Product name required'],
        lowercase: true,
        minlength: [3, 'The length of the Product description minimum 3 character long']
    },

    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
        lowercase: true,
        unique: true,
    },

    price: {
        type: number,
        required: [true, 'Product price is required'],
        trim: true,
        validate: {
            validator: (v) => {
                return v > 0;
            },
            message: 'Price must be greater than 0'
        }
    },

    quantity: {
        type: number,
        required: [true, 'Product quantity is required'],
        trim: true,
        validate: {
            validator: (v) => {
                return v > 0;
            },
            message: 'quantity must be greater than 0'
        }
    },

    sold: {
        type: number,
        required: [true, 'sold quantity is required'],
        trim: true,
        default: 0,
    },
    photo: {
        type: String,
        required: [true, 'Product photo is required'],
        trim: true,
    },
    shipping: {
        type: number,
        default: 0, //if shipping is free it will be 0 otherwise it will add shipping cost
    },


    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },

}, { timestamps: true });


const Product = model('Product', productSchema);

module.exports = Product;