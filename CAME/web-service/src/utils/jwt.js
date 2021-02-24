const expressJwt = require('express-jwt');
const config = require('../config/jwt');
const userService = require('../app/services/user');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/login',
            '/register',
            '/'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.id);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    
    done();
};