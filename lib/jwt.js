const jwt = require('jsonwebtoken');
const util = require('util');

const jwtoken = {
        sign: util.promisify(jwt.sign),
        verify: util.promisify(jwt.verify)
}

module.exports = jwtoken