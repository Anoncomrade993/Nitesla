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


const quotesData = {
	"quotes": [
		{ "quote": "The present is theirs; the future, for which I really worked, is mine." },
		{ "quote": "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration." },
		{ "quote": "The day science begins to study non-physical phenomena, it will make more progress in one decade than in all the previous centuries of its existence." },
		{ "quote": "Let the future tell the truth, and evaluate each one according to his work and accomplishments." },
		{ "quote": "What we now want is closer contact and better understanding between individuals and communities all over the earth." },
		{ "quote": "The scientific man does not aim at an immediate result. He does not expect that his advanced ideas will be readily taken up." },
		{ "quote": "Our virtues and our failings are inseparable, like force and matter. When they separate, man is no more." },
		{ "quote": "The spread of civilization may be likened to a fire; first, a feeble spark, then a mighty blaze, ever increasing in speed and power." },
		{ "quote": "We are whirling through endless space, with an inconceivable speed, all around us everything is spinning, everything is moving, everywhere there is energy." },
		{ "quote": "Life is and will ever remain an equation incapable of solution, but it contains certain known factors." },
		{ "quote": "Of all things, I liked books best." },
		{ "quote": "The future will show whether my foresight is as accurate now as it has proved heretofore." },
		{ "quote": "I do not think there is any thrill that can go through the human heart like that felt by the inventor as he sees some creation of the brain unfolding to success." },
		{ "quote": "Peace can only come as a natural consequence of universal enlightenment." },
		{ "quote": "The desire that guides me in all I do is the desire to harness the forces of nature to the service of mankind." },
		{ "quote": "My brain is only a receiver, in the Universe there is a core from which we obtain knowledge, strength and inspiration." },
		{ "quote": "The gift of mental power comes from God, Divine Being, and if we concentrate our minds on that truth, we become in tune with this great power." },
		{ "quote": "Every living being is an engine geared to the wheelwork of the universe." },
		{ "quote": "The motors I built there were exactly as I imagined them. I made no attempt to improve the design, but merely reproduced the pictures as they appeared to my vision." },
		{ "quote": "In the twenty-first century, the robot will take the place which slave labor occupied in ancient civilization." },
		{ "quote": "The individual is ephemeral, races and nations come and pass away, but man remains." },
		{ "quote": "I am part of a light, and it is the music. The light fills my six senses: I see it, hear it, feel it, smell it, touch it and think it." },
		{ "quote": "The progressive development of man is vitally dependent on invention." },
		{ "quote": "Money does not represent such a value as men have placed upon it." },
		{ "quote": "Today's scientists have substituted mathematics for experiments, and they wander off through equation after equation, and eventually build a structure which has no relation to reality." },
		{ "quote": "All that was great in the past was ridiculed, condemned, combated, suppressed — only to emerge all the more powerfully, all the more triumphantly from the struggle." },
		{ "quote": "The history of science shows that theories are perishable. With every new truth that is revealed we get a better understanding of Nature." },
		{ "quote": "The power of reason is very far from what humans believe it to be." },
		{ "quote": "One must be sane to think clearly, but one can think deeply and be quite insane." },
		{ "quote": "The feeling is constantly growing on me that I had been the first to hear the greeting of one planet to another." }
	]
};

module.exports.randQuote = function() {
	try {
		const quotes = quotesData.quotes;
		const index = Math.floor(Math.random() * quotes.length);
		return quotes[index].quote;
	} catch (error) {
		throw new Error(`Failed to get random quote: ${error.message}`);
	}
};