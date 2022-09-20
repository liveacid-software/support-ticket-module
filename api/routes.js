/// Configurations with ENV vars
// Github API info and Project
// Email on/off and SMTP info
// Authenticate or not ->  If not authenticated do not send email and no user record ref
// Default customer email -> To send confirmation If no user email or record ref (no session)

const Router = require('express');
const router = Router();

const checkSession =  (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send("Error: Not Authenticated");
    } else {
        return next();
    }
};

router.post('/supportticket/submit', checkSession, (req, res) => {
    const user = req.user; // IF no user return error
    // create mongo support record
    // sned support ticket to gihub API
    // email support ticket to users email if email exists

	const {
		_doc: { password, ...userInfo },
	} = req.user;
	res.json({ userInfo, success: true });
});
