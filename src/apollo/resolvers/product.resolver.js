const Product = require('./../../models/product.model');

module.exports = {
    Query: {
        products: () => {
            return Product.find()
        },
        product: (parent, args) => {
            console.log(args.id)
            return Product.findById(args.id)
        },
        // mutations // typer dans schema
        // createProduct
        // updateProduct
        // etc...
    },
    Mutation: {
        createProduct(parent, { input }) {
            let prod = new Product(input);
            return prod.save()
        },
        updateProduct(parent, { id, input }) {
            Product.findByIdAndUpdate(id, input);
            return Product.findById(id);
        },
        deleteProduct(parent, { id }) {
            Product.findByIdAndDelete(id);
            return id;
        },
    }
}