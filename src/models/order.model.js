import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        total: Number,
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        products: [{
            _id: false,
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            price: Number,
        }],
        reference: String,
        sentAt: Date,
        deliveredAt: Date
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', orderSchema);