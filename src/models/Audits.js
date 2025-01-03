const mongoose = require('mongoose');


const apiAuditSchema = new mongoose.Schema({
	sessionId: {
		type: String,
		index: true,
		default: null
	},
	action: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		default: () => new Date().toISOString()
	},
	ipAddress: {
		type: String,
		required: true,
	},
	userAgent: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	details: {
		type: mongoose.Schema.Types.Mixed,
		default: {},
	},
}, {
	timestamps: true,
});


apiAuditSchema.index({ sessionId: 1, action: 1, createdAt: -1 });

apiAuditSchema.statics.logAction = async function(logData = {}) {
	return await this.create(logData);
};

module.exports = mongoose.model('Audit', apiAuditSchema);