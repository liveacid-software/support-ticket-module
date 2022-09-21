/**
 * App Config
 *
 * Wrapper object around env vars loaded by dotenv.
 */
 const dotenv = require('dotenv');

 const { error } = dotenv.config();
 
 if (error) {
     throw error;
 }
 
 const config = {
     mongodb: {
         username: process.env.MONGODB_USERNAME,
         password: process.env.MONGODB_PASSWORD,
         protocol: process.env.MONGODB_PROTOCOL,
         hostname: process.env.MONGODB_HOSTNAME,
         params: process.env.MONGODB_PARAMS,
         port: process.env.MONGODB_PORT,
         database: process.env.MONGODB_DATABASE,
         ssl: process.env.MONGODB_SSL,
         ca: process.env.MONGODB_CA_CERT,
     },
     session: {
         secret: process.env.SESSION_SECRET,
         maxAge: parseInt(process.env.SESSION_MAX_AGE, 10),
         collection: process.env.SESSION_COLLECTION || 'sessions',
         resave: !!process.env.SESSION_RESAVE || false,
         saveUninitialized: !!process.env.SESSION_SAVE_UNINITIALIZED || false,
     }
 };
 
 // export default config;
 module.exports = config;
 