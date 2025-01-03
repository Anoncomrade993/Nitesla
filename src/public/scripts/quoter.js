document.addEventListener('DOMContentLoaded', () => {

	const quoteContainer = document.getElementById('quote-container');

	const quoteHandler = async () => {
		try {
			const response = await fetch('/api/quote');

			const quoteData = await response.json();

			if (quoteData.success) {

				quoteContainer.text = quoteData.data;
			} else {
				const errorMessage = await getErrorMessage(response);
				throw errorMessage;
			}
		} catch (error) {
			console.error('Network error:', error);
			throw error
		}
	}

	setInterval(quoteHandler, 5000);
});