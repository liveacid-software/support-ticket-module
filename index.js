const mongodb = require('./mongodb');
const session = require('./session');

module.exports = {
    client: mongodb.client,
    session: session.session()
};