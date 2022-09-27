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
     email: {
        // from: process.env.SMTP_USERNAME,
        // dafault_to: process.env.EMAIL_DEFAULT_TO,
        smtp: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          // secure: true, // we dont use  this. 
          auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
          }
        },
        api_user: process.env.SENDGRID_API_USER,
        api_key: process.env.SENDGRID_API_KEY,
      },
      company: process.env.COMPANY,
      app: process.env.APP_NAME
 };
 
 // export default config;
 module.exports = config;
 