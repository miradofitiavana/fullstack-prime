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

    // vérifier si reference existe
    Order.find({ reference: req.body.reference })
        .then(response => {
            console.log(response.length == 0, response == []);
            if (response.length != 0) {
                return res.send({
                    data: response,
                    already_saved: true
                });
            } else {
                order.save().then(data => {
                    console.log(data._id);
                    User.findByIdAndUpdate(req.body.user, {
                        $push: {
                            orders: data._id,
                        }
                    }).then(user => {
                        return res.send({
                            data: data,
                            user: {
                                email: user.email,
                                name: `${user.firstName} ${user.lastName}`,
                            },
                            already_saved: false
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
        }).catch(error => {
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

exports.getMyOrders = (req, res) => {
    Order.find({ user: req.params.id })
        .populate('products')
        .populate('user')
        .then((data) => res.send({ data: data }))
        .catch(err => console.log(err))
}

exports.read = (req, res) => {
    let id = req.params.id;
    Order.findById(id)
        .populate('user')
        .populate('products.product')
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Order not found."
                });
            }
            return res.send({ data: data });
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occured"
            })
        });
}

exports.update = (req, res) => {
    let id = req.params.id;

    let date = new Date();
    let update = null;
    if (req.body.status == 'SENT') {
        update = { sentAt: date };
    }
    if (req.body.status == 'DELIVERED') {
        update = { deliveredAt: date };
    }

    Order.findByIdAndUpdate(
        id,
        update,
        { new: true, useFindAndModify: false }
    )
        .then(response => {
            res.status(200).send({
                message: "order updated",
                data: response
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured"
            })
        })
}