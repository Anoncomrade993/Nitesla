const fs = require('fs').promises;
const path = require('path');

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


module.exports.randQuote = async function() {
	try {
		const filePath = path.join(__dirname, '/shared/quotes.json');
		const data = await fs.readFile(filePath, 'utf-8');

		const quotesData = JSON.parse(data);

		// Validate quotes structure
		if (!Array.isArray(quotesData.quotes) || quotesData.quotes.length === 0) {
			throw new Error('Invalid quotes data structure');
		}

		const quotes = quotesData.quotes;
		const index = Math.floor(Math.random() * quotes.length);

		return quotes[index];
	} catch (error) {
		if (error.code === 'ENOENT') {
			throw new Error('Quotes file not found. Please check the file path.');
		}
		if (error instanceof SyntaxError) {
			throw new Error('Invalid JSON format in quotes file.');
		}
		throw new Error(`Failed to get random quote: ${error.message}`);
	}
}