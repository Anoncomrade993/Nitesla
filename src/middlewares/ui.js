require('dotenv').config()



function handleErrorView(err, req, res) {
	const statusCode = err.status || 500;

	res.status(statusCode).render('error', {
		data: {
			status: statusCode,
			message: err.userMessage || 'An unexpected error occurred',
			error: process.env.NODE_ENV !== 'production' ? err : null
		}
	});
}

function renderView(path = '', data = {}) {
	return (req, res) => {
		try {
			res.render(path, data);
		} catch (error) {
			console.error(`Error rendering view ${path}:`, error);
			res.status(500).render('error.html');
		}
	};
}




function checkAppMode(req, res, next) {
	const APP_MODE = process.env.APP_MODE || 'production';
	try {
		if (APP_MODE === 'maintenance') {
			return res.redirect(302, '/maintenance');
		}
		return next();
	} catch (error) {
		console.error('Maintenance mode check failed:', error);
		res.status(503).render('maintenance.html');
	}
}

function returner(req, res, next) {
	const APP_MODE = process.env.APP_MODE;
	if (req.path === '/maintenance') {
		if (APP_MODE !== 'maintenance') {
			return res.redirect(302, '/');
		}
	} else {
		if (APP_MODE === 'maintenance') {
			return res.redirect(302, '/maintenance');
		}
	}

	return next();
};


module.exports = {
	handleErrorView,
	renderView,
	checkAppMode,
	returner
}