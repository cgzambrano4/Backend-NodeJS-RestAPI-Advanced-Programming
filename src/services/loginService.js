const crypto = require('crypto');
const uuid = require('uuid');
const Login = require('../collections/Login');

const loginService = {
    createLogin: async (loginData) => {
        const {email, password } = loginData;
        const salt = uuid.v4();
        const hashedPassword = crypto.createHash('sha256').update(salt + password).digest('hex');
        const newUser = new Login ({ email, password: hashedPassword, salt});
        await newUser.save();
        return newUser;
    },

    authenticateLogin: async (email, password) => {
        const login = await Login.findOne({ email });
        if (!login) return null;
        const hashedPassword = crypto.createHash('sha256').update(login.salt + password).digest('hex');
        return hashedPassword === login.password ? login : null;
    }
};

module.exports = loginService;