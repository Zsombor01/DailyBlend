const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.send('This is the login backend');
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            return res.status(500).json({msg: 'Server error'});
        }

        if(!user){
            return res.status(401).json({msg: info.message || 'Invalid credentials'});
        }

        req.logIn(user, (err) => {
            if(err){
                return res.status(500).json({msg: 'Server error'});
            }

            return res.status(200).json({
                msg: 'Login successful',
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        });
    })(req, res, next);
});

module.exports = router;
