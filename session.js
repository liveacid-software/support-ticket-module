const MongoStore = require('connect-mongo');
const expressSession = require('express-session');
const mongodb = require('./mongodb');
const config = require('./config');

module.exports = {
    session() {
        return expressSession({
            secret: config.session.secret,
            maxAge: config.session.maxAge,
            resave: config.session.resave,
            saveUninitialized: config.session.saveUninitialized,
            store: MongoStore.create({
                collection: config.session.collection,
                clientPromise: mongodb.client(),
            }),
            cookie: {
                maxAge: config.session.maxAge,
                sameSite: 'lax',
                httpOnly: true,
                secure: config.NODE_ENV === 'development',
            },
        });
    },
};