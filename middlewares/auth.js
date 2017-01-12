'use strict'

module.exports = function(options) {

    var middleware = function(req,res,next) {
        if(!options.auth) {
            res.redirect('/login');
        }
        next();
    }

    return middleware;
}
