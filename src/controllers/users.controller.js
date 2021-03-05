const User = require('./../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../configs');

import userSchemaValidation from "./../middlewares/validators/user.validation";

exports.register = (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        age: req.body.age,
        password: hashedPassword
    });

    const validation = userSchemaValidation.validate(req.body);

    console.log(validation);
    if(validation.error){
        return res.status(400).send(validation.error);
    }

    user.save().then(data => {
        let userToken = jwt.sign(
            {
                id: data._id,
                adlin: data.isAdmin
            },
            config.jwt.secret,
            {
                expiresIn: 86400
            }
        );
        res.send({
            auth: true,
            token: userToken
        });
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured"
        })
    })
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: `no user find with  email ${req.body.email}`
                });
            }
            let compare = bcrypt.compareSync(req.body.password, data.password);
            if (!compare) {
                res.status(401).send({
                    auth: false,
                    token: null,
                    message: 'Wrong password'
                });
            }
            let userToken = jwt.sign(
                {
                    id: data._id,
                    adlin: data.isAdmin
                },
                config.jwt.secret,
                {
                    expiresIn: 86400
                }
            );
            return res.status(200).send({
                auth: true,
                token: userToken
            });

        }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occured"
            })
        });
}

exports.logout = (req, res) => {
    res.status(200).send({
        auth: false,
        token: null
    });
}

exports.getMe = (req, res) => {
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