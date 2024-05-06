const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name required'],
        trim: true,
        unique: true,
    },

    slug: {
        type: String,
        required: [true, 'Category name required'],
        lowercase: true,
        unique: true,
    },
}, { timestamps: true });


const Category = model('Category', categorySchema);

module.exports = Category;