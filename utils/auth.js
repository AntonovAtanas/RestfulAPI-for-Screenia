const jwtoken = require('../lib/jwt');
const SECRET = require('../consts/SECRET');

async function getAuthResult (user){
    const payload = {
        _id: user._id,
        username: user.username
    }

    // not expirable token! TODO - make it expirable
    const token = await jwtoken.sign(payload, SECRET);

    return {
        username: user.username,
        authToken: token,
        _id: user._id
    }
};

module.exports = getAuthResult;