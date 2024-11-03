module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        res.status(401).json({message: 'Unauthorized: Please log in to access this page.'})
    },
    forwardAuthenticated: function(req, res, next) {
        if(!req.isAuthenticated()){
            return next();
        }
        res.status(403).json({message: 'Forbidden: You are already logged in.'});
    }
}