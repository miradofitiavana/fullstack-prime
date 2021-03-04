import Order from './../../models/order.model';

module.exports = {
    Query: {
        myOrders: (parent, args) => {
            return Order.find({ user: args.id })
                // .populate('products')
        },
    },
}