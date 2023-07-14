// ==== Configurations with ENV vars =====
// MONGO or POSTGRES
// Github API info and Project for the issue creation
// Email on/off and SMTP info
// Authenticate or not ->  If not authenticated do not send email and no user record ref
// Default customer email -> To send confirmation If no user email or record ref (no session)

const Router = require('express');
const router = Router();

const supportTicketController  = require('./controller');
const { SupportTicket } = require('../mongo'); // if config mongo use this ELSE import the postgres option
const upload = multer({ dest: 'uploads/' });

const checkSession =  (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send("Error: Not Authenticated");
    } else {
        return next();
    }
};

router.post('/supportticket/submit', checkSession, upload.array('files', 5), supportTicketController.createTicket);

module.exports = router;