const Product = require('./../models/product.model');

exports.create = (req, res) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
    });

    product.save().then(data => {
        res.send({
            data: data
        });
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured"
        })
    })
}