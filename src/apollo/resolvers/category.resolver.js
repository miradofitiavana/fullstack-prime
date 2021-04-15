const Category = require('./../../models/category.model');

module.exports = {
    Query: {
        categories: () => {
            return Category.find()
                .populate('products');
        },
        category: (parent, args) => {
            return Category.findById(args.id)
                .populate('products');
        },
        findCategories(parent, args) {
            var searchKey = new RegExp(args.searchKey, 'i');
            return Category.find({ title: searchKey });
        }
    },
}