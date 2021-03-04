import Order from './../models/order.model';

exports.create = (req, res) => {
    const order = new Order({
        total: req.body.total,
        user: req.body.user,
        products: req.body.products,
    });

    order.save().then(data => {
        res.send({
            data: data
        });
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured"
        })
    })
}

exports.read = (req, res) => {
    let id = req.params.id;
    Order.findById(id)
        .populate('user')
        .populate('products')
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Order not found."
                });
            }
            return res.send(data);
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occured"
            })
        });
}