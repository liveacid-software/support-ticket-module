# mongo-connect-module

### Use and Configuration:
#### This module requires the followin ENV Vars in your project .env 

```
MONGODB_USERNAME=<DB User>
MONGODB_PASSWORD=<DB PW>
MONGODB_PROTOCOL=<Connections protocol ex: mongodb or mongodb+srv>
MONGODB_HOSTNAME=localhost
MONGODB_PARAMS=<Required parameters (usually if connecting to managed db service)>
MONGODB_PORT=<Mongo Port>
MONGODB_DATABASE=<DB Name>
MONGODB_SSL=<Boolean>
MONGODB_CA_CERT=<Base64 string of .crt>


SESSION_SECRET=<Session secret string>
SESSION_MAX_AGE=<Max Age of session in seconds>
SESSION_COLLECTION=<name of session mongodb collection>
SESSION_RESAVE=<Boolean>
SESSION_SAVE_UNINITIALIZED=<Boolean>
```

Note: This package uses `express-session` and `mongoose` npm packages

### Example of useage
#### session usage with express:

```
const express = require('express');
const mongoConnect = require('mongo-module');

const app = express();

app.use(mongoConnect.session);

```

#### Mongoose client usage:

```
const mongoConnect = require('mongo-module');

const client = mongoConnect.client

```