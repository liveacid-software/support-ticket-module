const mongodb = require('./mongo/init-mongodb');
const session = require('./session');

module.exports = {
    client: mongodb.client,
    session: session.session()
};