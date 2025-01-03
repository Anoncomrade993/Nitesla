const AuditLog = require('../models/Audits.js')


const auditMiddleware = async function(req, res, next) {
	const originalJson = res.json;

	res.json = function(data) {
		const logData = {
			sessionId: (req.session && req.sessionID) || null,
			action: req.path,
			ipAddress: req.ip,
			userAgent: req.get('User-Agent'),
			status: res.statusCode < 400 ? 'success' : 'failure',
			details: { responseData: data }
		};

		AuditLog.logAction(logData).catch(error => {
			console.error('Error logging audit action:', error);
		});

		originalJson.call(this, data);
	};

	next();
};


// logging  actions
const logAuditAction = async function(sessionId, action, ipAddress, userAgent, status, details) {
	try {
		await AuditLog.logAction({
			sessionId: sessionId || null,
			action,
			ipAddress,
			userAgent,
			status,
			details
		});
	} catch (error) {
		console.error('Error logging audit action:', error);
	}
};



module.exports = {
	logAuditAction,
	auditMiddleware
};