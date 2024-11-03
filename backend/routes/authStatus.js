const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
    if(req.isAuthenticated()) {
        res.json({loggedIn: true});
    } else {
        res.json({loggedIn: false});
    }
})

module.exports = router;