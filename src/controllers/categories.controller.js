const Category = require('./../models/category.model');
const categorySchemaValidation = require("./../middlewares/validators/category.validation");

exports.create = (req, res) => {
    const validation = categorySchemaValidation.validate(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error);
    }
    const category = new Category({
        title: req.body.title,
    });

    category.save().then(response => {
        res.send({
            data: response
        });
    }).catch((err) => {
        res.status(500).send({
            message: err || "Some error occured"
        })
    });
}

exports.update = (req, res) => {
    let id = req.params.id;

    const validation = categorySchemaValidation.validate(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error);
    }

    Category.findByIdAndUpdate(
        id,
        { title: req.body.title },
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

    Category.findByIdAndDelete(id)
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