const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        categories: [{ type: Schema.Types.ObjectId, ref: 'Category', default: [] }],
        description: String,
        price: {
            type: Number,
            required: true
        },
        imgUrl: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema);