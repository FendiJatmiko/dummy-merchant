const crypto = require('crypto');
const config = require('../config');

class Auth {
    constructor(token, secret) {
        this.token = 'auth5cur3';
        this.secret = 'x9O1LkXjyxpRiyhNRX8T';
    }

    getSignature(body) {
        return crypto.createHmac('sha256', this.secret).update(body).digest('hex');
    }

    generate(body) {
        return "Ganesha " + Buffer.from(this.token + ":" + this.getSignature(body)).toString('base64');
    }
}

const auth = new Auth(config.token, config.secret);

module.exports = auth;

