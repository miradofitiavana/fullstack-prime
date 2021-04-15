const Product = require('./../models/product.model');

exports.list = (req, res) => {
    let asc = {};
    console.log(req.query);
    if (req.query.sort) {
        asc = req.query.sort == 'createdAt' ? { createdAt: -1 } : null;
    }
    if (req.query.limit) {
        return Product.find()
            .populate('categories')
            .limit(parseInt(req.query.limit))
            .sort(asc)
            .then(data => {
                res.send({
                    data: data
                });
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occured"
                })
            });
    } else {
        return Product.find()
            .populate('categories')
            .then(data => {
                res.send({
                    data: data
                });
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occured"
                })
            });
    }
}

exports.create = (req, res) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        categories: req.body.categories,
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

exports.read = (req, res) => {
    return Product.findById(req.params.id)
        .populate('categories')
        .then(data => {
            res.send({
                data: data
            });
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured"
            })
        });
}

exports.update = (req, res) => {
    let id = req.params.id;

    // const validation = categorySchemaValidation.validate(req.body);
    // if (validation.error) {
    //     return res.status(400).send(validation.error);
    // }

    Product.findByIdAndUpdate(
        id,
        {
            title: req.body.title,
            price: req.body.price,
            imgUrl: req.body.imgUrl,
            description: req.body.description,
            categories: req.body.categories,
        },
        { new: true, useFindAndModify: false }
    )
        .then(response => {
            res.status(200).send({
                message: "user updated",
                data: response
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured"
            })
        })
}

exports.delete = (req, res) => {
    let id = req.params.id;

    Product.findByIdAndDelete(id)
        .then(response => {
            res.status(200).send({
                message: "user deleted",
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured"
            })
        })
}