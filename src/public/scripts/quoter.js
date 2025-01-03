document.addEventListener('DOMContentLoaded', () => {
	const quoteContainer = document.getElementById('quote-container');

	const quoteHandler = async () => {
		try {
			const response = await fetch('/api/quote');
			const quoteData = await response.json();

			if (quoteData.success) {

				quoteContainer.textContent = quoteData.data;
			} else {
				const errorMessage = quoteData.error || 'Failed to fetch quote';
				throw new Error(errorMessage);
			}
		} catch (error) {
			console.error('Network error:', error);
			quoteContainer.textContent = 'Failed to load quote';
		}
	}


	quoteHandler();
	setInterval(quoteHandler, 5000);
});