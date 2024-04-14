const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { defaultImagePath } = require('../secret');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
        minlength: [3, 'minimum  length is 3 characters'],
        maxlength: [40, 'maximum length is 40 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide your Email'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: 'Please enter a valid email address'
        }
    },

    password: {
        type: String,
        required: [true, 'Please provide your Password'],
        trim: true,
        minlength: [6, 'Length of Password can not be less than 6 character'],
        // The salt will be stored in this variable in encryption
        set: (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10)),
    },
    image: {
        type: String,
        default: defaultImagePath
    },
    address: {
        type: String,
        required: [false, 'Address field cannot be empty'],

    },
    phone: {
        type: String,
        required: [true, 'Address field cannot be empty'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


const User = model('Users',userSchema);

module.exports = User;