import Order from './../../models/order.model';

module.exports = {
    Query: {
        orders: () => {
            return Order.find()
            .populate('user')
            .populate('products')
        },
        order: (parent, args) => {
            console.log(args.id)
            return Order.findById(args.id)
                .populate('user')
                .populate('products');
        },
    }
}