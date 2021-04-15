const productResolver = require('./product.resolver');
const orderResolver = require('./order.resolver');
const userResolver = require('./user.resolver');
const categoryResolver = require('./category.resolver');

module.exports = [
    productResolver,
    orderResolver,
    userResolver,
    categoryResolver,
]