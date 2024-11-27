const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ success: true, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
})

module.exports = router;