require('dotenv').config();

const express = require('express');

const { renderView, handleErrorView ,returner} = require('../middlewares/ui.js');
const { logAuditAction } = require('../middlewares/audit.js')


const uiRouter = express.Router();

let links = {
	png_logo: process.env.PNG_LOGO_URL,
	portfolio_url: process.env.PORTFOLIO_URL,
	start_url: process.env.START_URL,
};


uiRouter.get('/', renderView('landing.html', links));
uiRouter.get('/home', renderView('landing.html', links));
uiRouter.get('/maintenance', returner, renderView('maintenance.html'));






uiRouter.use((err, req, res, next) => {
	console.error('Unhandled Error:', err);

	const isApiRequest = req.xhr || req.accepts('json');

	const logError = async () => {
		try {
			await logAuditAction(
				req.sessionID || null,
				req.path,
				req.ip,
				req.get('User-Agent'),
				'error',
				{
					error: err.message,
					stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
				}
			);
		} catch (logError) {
			console.error('Error logging failed', logError);
		}
	};

	logError();

	if (isApiRequest) {
		return res.status(err.status || 500).json({
			status: 'error',
			message: err.message || 'An unexpected error occurred'
		});
	}

	handleErrorView(err, req, res);
});

module.exports = uiRouter;