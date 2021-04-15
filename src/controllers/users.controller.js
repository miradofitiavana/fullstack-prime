const User = require('./../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../configs');

import userSchemaValidation from "./../middlewares/validators/user.validation";

exports.list = (req, res) => {
    console.log(req.query.admin);
    var fields = req.query.fields?.split(",") || [];
    let filter = {};
    if (req.query.admin) filter.isAdmin = req.query.admin;
    User.find(
        filter,
        fields.join(' ')
    )
        .then(data => {
            console.log(data);
            return res.status(200).send({
                data: data
            })
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occured"
            })
        })
}

exports.create = (req, res) => {
    const validation = userSchemaValidation.validate(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error);
    }

    let hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        address: {
            address: req.body.address.address,
            postal_code: req.body.address.postal_code,
            city: req.body.address.city,
            country: req.body.address.country,
        },
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin,
    });

    user.save().then(response => {
        res.send({
            user: {
                id: response.id,
                message: "user created",
                display: "L'utilisateur a été créé avec succès"
            },
        });
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured"
        })
    })
}

exports.read = (req, res) => {
    User.findById(req.params.id).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: `user not found with id ${req.params.id}`
            });
        }
        return res.send(data);
    }).catch((err) => {
        res.status(404).send({
            message: err.message || "Some error occured"
        })
    });
}

exports.update = (req, res) => {
    const id = req.params.id;

    const validation = userSchemaValidation.validateBeforeUpdate(req.body);

    console.log(validation);
    if (validation.error) {
        return res.status(400).send(validation.error);
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        isAdmin: req.body.isAdmin,
    };

    User.findByIdAndUpdate(id, user,
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

    User.findByIdAndDelete(id)
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