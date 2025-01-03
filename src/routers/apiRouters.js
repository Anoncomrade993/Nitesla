const rateLimit = require('express-rate-limit');
const apiRouter = require('express').Router();

const { randQuotes } = require('../controllers/apiControllers.js')

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 15 minutes
	max: 100, //  100 requests per windowMs
	message: 'Too many requests, please try again later.',
});

apiRouter.get('/qoute', randQuotes);
apiRouter.use(limiter);

module.exports = apiRouter;