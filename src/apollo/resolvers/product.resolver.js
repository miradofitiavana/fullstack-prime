const Product = require('./../../models/product.model');
const Category = require('./../../models/category.model');

module.exports = {
    Query: {
        products: () => {
            return Product.find()
                .populate('categories');
        },
        product: (parent, args) => {
            console.log(args.id)
            return Product.findById(args.id)
                .populate('categories');
        },
        findProducts(parent, args) {
            var searchKey = new RegExp(args.searchKey, 'i');
            return Product.find(
                {
                    $or: [{ title: searchKey }, { description: searchKey }]
                }
            )
        }
    },
    Mutation: {
        createProduct(parent, args) {
            const newProduct = new Product({
                title: args.input.title,
                categories: args.input.categories,
                description: args.input.description,
                price: args.input.price,
                imgUrl: args.input.imgUrl
            });
            newProduct.save().then((resu) => {
                newProduct.categories.map((id_category) => {
                    Category.findByIdAndUpdate(id_category,
                        { $push: { products: resu._id } },
                        { new: true, useFindAndModify: false },
                    ).exec();
                });
            }).catch((err) => (err));
            return newProduct;
        }
        // updateProduct(parent, { id, input }) {
        //     return Product.findByIdAndUpdate(id, input).then((data) => {
        //         return Product.findById(id)
        //             .populate('products');
        //     })
        //         .catch((err) => {
        //             return err
        //         });
        // },
        // deleteProduct(parent, { id }) {
        //     Product.findByIdAndDelete(id);
        //     return id;
        // },

    }
}

// updateCategory(parent, { id, input }) {
//     return Category.findByIdAndUpdate(id, { ...input })
//         .then((data) => {
//             return Category.findById(id)
//                 .populate('products');
//         })
//         .catch((err) => {
//             return err
//         });
// },
// deleteCategory(parent, { id }) {
//     return Category.findByIdAndDelete(id)
//         .then((data) => {
//             return id;
//         })
//         .catch((err) => err);
// },