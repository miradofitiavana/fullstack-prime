const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Le nom de la catégorie est requis.'],
            unique: true
        },
        products: [{ type: Schema.Types.ObjectId, ref: 'Product', default: [] }],
    }
);

module.exports = mongoose.model('Category', categorySchema);