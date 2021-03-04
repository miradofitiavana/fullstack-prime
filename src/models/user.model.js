const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            lowercase: true
        },
        lastName: String,
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        isAdmin: {
            type: Boolean,
        },
        age: {
            type: Number,
        },
        orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);