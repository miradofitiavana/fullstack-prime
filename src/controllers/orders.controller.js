import Order from './../models/order.model';
import User from './../models/user.model';

exports.create = (req, res) => {
    const order = new Order({
        total: req.body.total,
        user: req.body.user,
        products: req.body.products,
        reference: req.body.reference,
        sentAt: null,
        deliveredAt: null
    });

    order.save().then(data => {
        console.log(data._id);
        User.findByIdAndUpdate(req.body.user, {
            $push: {
                orders: data._id,
            }
        }).then(user => {
            return res.send({
                data: data
            });
        }).catch(error => {
            return res.status(500).send({
                message: error.message || "Some error occured"
            })
        })
    }).catch((err) => {
        return res.status(500).send({
            message: err.message || "Some error occured"
        })
    })
}

exports.getOrders = (req, res) => {
    Order.find()
        .populate('products')
        .populate('user')
        .then((data) => res.send({ data: data }))
        .catch(err => console.log(err))
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