const {
	sendJsonMessage,
	randQuote
} = require('../utils/helpers.js');


module.exports.randQuotes = async function(req, res) {
	try {
		const quote = await randQuote()
		if (!quote) {
			return sendJsonMessage(res, 500, false, 'Something went wrong ,try again')
		}
		return sendJsonMessage(res, 200, true, 'quote', quote);
	} catch (e) {
		return sendJsonMessage(res, 500, false, 'Internal server error occurred')
	}
}

