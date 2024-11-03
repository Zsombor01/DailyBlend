const express = require("express");
const router = express.Router();

//middlware to check if user is logged in or not (should put this later in another file)
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ msg: "Not authenticated" });
};

router.get("/", isAuthenticated, (req, res) => {
    try {
        const userInfo = {
            name: req.user.name || "user",
            email: req.user.email,
        };

        req.logout((err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error during logout",
                    error: err.message,
                });
            }

            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Error during session destroy",
                        error: err.message,
                    });
                }
            });

            res.status(200).json({
                success: true,
                message: `Logged out ${userInfo.name}`,
            });
            console.log(`Logged out ${userInfo.name}`);
        });
    } catch (err) {
        console.error("Logout error:", err);
        res.status(500).json({
            success: false,
            message: "Server error during logout",
            error: err.message,
        });
    }
});

module.exports = router;
