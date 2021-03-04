import Order from './../../models/order.model';

module.exports = {
    Query: {
        orders: () => {
            return Order.find()
        },
        order: (parent, args) => {
            console.log(args.id)
            return Order.findById(args.id)
                .populate('user')
                .populate('products');
        },
    }
}