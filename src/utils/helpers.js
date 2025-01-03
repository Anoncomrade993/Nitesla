const fs = require('fs').promises;
const path = require('path');

module.exports.randQuote = async function() {
	try {

		const data = await fs.readFile(path.join(__dirname, '/shared/quotes.json'), 'utf-8');

		const quotesData = JSON.parse(data);
		const quotes = quotesData.quotes;

		const quoteLength = quotes.length;
		const index = Math.floor(Math.random() * quoteLength);


		return quotes[index];
	} catch (error) {
		if (error.code === 'ENOENT') {
			throw new Error('Quotes file not found. Please check the file path.');
		}
		throw new Error(`Failed to get random quote: ${error.message}`);
	}
}

module.exports.sendJsonMessage = function(res, status, success, message, data) {
	const payload = {
		success,
		message,
		status
	}
	if (data !== undefined) {
		payload.data = data;
	}
	try {
		res.status(status).json(payload);
	} catch (error) {
		console.error('Error sending JSON response:', error);
		throw new Error('Failed to send JSON response');
	}
}