const User = require('../models/User');
const bcrypt = require('bcrypt');

const getAuthResult = require('../utils/auth')

exports.register = async (userData) => {
    
    const user = await User.create(userData);

    const result = getAuthResult(user);

    return result
};

exports.login = async (userData) => {
    const user = await User.findOne({username: userData.username});

    if (!user) {
        throw new Error('Invalid username or password!')
    }

    const isValid = await bcrypt.compare(userData.password, user.password);

    if (!isValid){
        throw new Error('Invalid username or password!')
    }

    const result = getAuthResult(user);

    return result
}