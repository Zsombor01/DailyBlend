const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');

router.get('/', (req, res) => {
    res.send('This is the register backend');
});

router.post('/', async (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors = [];

    if(!name ||!email ||!password ||!password2) {
        errors.push({msg: 'Please enter all fields'});
    }

    if(password != password2) {
        errors.push({msg: 'Passwords do not match'});
    }

    if(password.length < 7) {
        errors.push({msg: 'Password must be at least 8 characters'});
    }

    if(errors.length>0){
        return res.status(400).json({errors});
    } else {
        try {
            const existingUser = await User.findOne({
                $or: [{ email: email }, { name: name }]
            });

            if (existingUser) {
                if (existingUser.email === email) {
                    errors.push({ msg: 'Email already exists' });
                }
                if (existingUser.name === name) {
                    errors.push({ msg: 'Name already exists' });
                }
                return res.status(400).json({ errors });
            }

            const newUser = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);
            await newUser.save();

            console.log("Successfully registered user: " + newUser.name);
            return res.status(200).json({ msg: 'User registered successfully' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: 'Server error' });
        }
    }
})

module.exports = router;