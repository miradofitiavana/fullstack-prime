const User = require('./../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../configs');

import userSchemaValidation from "./../middlewares/validators/user.validation";

exports.logout = (req, res) => {
    res.status(200).send({
        auth: false,
        token: null
    });
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((response) => {
            if (!response) {
                return res.status(404).send({
                    auth: false,
                    user: null,
                    token: null,
                    message: `no user find with  email ${req.body.email}`,
                    display: `Cet adresse email n'est rattaché à aucun utilisateur.`
                });
            }
            let compare = bcrypt.compareSync(req.body.password, response.password);
            if (!compare) {
                res.status(401).send({
                    auth: false,
                    user: null,
                    token: null,
                    message: 'Wrong password',
                    display: `Le mot de passe entré n'est pas valide.`
                });
            }
            let userToken = jwt.sign(
                {
                    id: response._id,
                    admin: response.isAdmin
                },
                config.jwt.secret,
                {
                    expiresIn: 86400
                }
            );
            return res.status(200).send({
                auth: true,
                user: {
                    firstname: response.firstName,
                    isAdmin: response.isAdmin
                },
                token: userToken
            });

        }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occured",
                display: "Une erreur s'est produite."
            })
        });
}

exports.register = (req, res) => {
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
        let userToken = jwt.sign(
            {
                id: response._id,
                admin: response.isAdmin,
            },
            config.jwt.secret,
            {
                expiresIn: 86400
            }
        );
        res.send({
            auth: true,
            user: {
                firstname: response.firstName,
            },
            token: userToken
        });
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured"
        })
    })
}