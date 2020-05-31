const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
var jwt = require('jsonwebtoken');

const User = require('../models/user');

const saltRounds = 10;

const privateKey = 'iwuew6WER';

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: "Username is Taken !!" });
        }

        user = new User({
            username,
            password
        });

        await bcrypt.hash(password, saltRounds, async (err, hash) => {
            user.password = hash;
            await user.save();
            res.status(200).json({ msg: 'User Saved Successfully' })
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "User Doesn't exist"
            });
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                const payload = getPayload(user);
                return res.status(200).json({
                    payload
                });
            }
            return res.status(400).json({
                message: "Incorrect Password !"
            });
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error');
    }
});

module.exports = router;

function getPayload(user) {
    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, privateKey);

    return token;
}
