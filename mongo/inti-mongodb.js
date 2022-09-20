/**
 * Mongoose Helper
 */
 const mongoose = require('mongoose');
 const url = require('url');
 const config = require('../config');
 
 let connection;

 const client = async () => {
     if (connection) {
         return connection;
     }
     try {
 
         const {
             username,
             password,
             protocol,
             hostname,
             params,
             port,
             database,
             ssl,
             ca
         } = config.mongodb;
         
         const auth = username ? `${username}:${password}` : undefined;
         const host = port ? `${hostname}:${port}` : hostname;
         const pathname = database;
         const search = params? `?${params}` : '';
         
         const mongoUrl = url.format({
             protocol: protocol,
             slashes: true,
             auth,
             host,
             pathname,
             search
         });
         
         // tells mongo not to use deprecated settings
         const mongoOptions = {
             useUnifiedTopology: true,
             useFindAndModify: false,
             useCreateIndex: true,
         };
 
         if (ssl) {
             mongoOptions.ssl = true;
             mongoOptions.sslValidate = true;
             mongoOptions.sslCA = Buffer.from(ca, 'base64').toString('ascii');
         }
         
         console.log("Mongo Connect URL: ", mongoUrl);
         
         console.log('Mongo Connect: Connecting to MongoDB...');
         await mongoose.connect(mongoUrl, mongoOptions);
         console.log('Mongo Connect: DB Successfully Connected...');
 
         connection = mongoose.connection;
         connection.on('error', console.error.bind(console, 'connection error:'));
         
         return connection.getClient();

     } catch (err) {
         console.log(`Error connecting to MongoDB:\n${err}`);
         throw err;
     }
 };
 
 module.exports = {
     client,
 };
 
