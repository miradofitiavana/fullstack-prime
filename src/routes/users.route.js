const express = require('express');

const router = express.Router();
const authenticate = require('./../controllers/authenticate.controller');
const users = require('./../controllers/users.controller');

import verifyToken from "../middlewares/verifyToken";


router.post('/register', authenticate.register);
router.post('/login', authenticate.login);
router.get('/logout', authenticate.logout);

//

router.get('/users', users.list);
router.post('/user', users.create);
router.get('/user/:id', users.read);
router.put('/user/:id', users.update);
router.delete('/user/:id', users.delete);
// router.get('/users', verifyToken, users.list);
// router.post('/user', verifyToken, users.create);
// router.get('/user/:id', verifyToken, users.read);
// router.put('/user/:id', verifyToken, users.update);

module.exports = router;