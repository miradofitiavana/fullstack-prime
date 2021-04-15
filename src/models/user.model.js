const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: String,
        phone: String,
        address: {
            address: String,
            postal_code: String,
            city: String,
            country: String
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
        },

        orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);