import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        total: Number,
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', orderSchema);