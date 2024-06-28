document.addEventListener('DOMContentLoaded', async () => {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const newQuoteBtn = document.getElementById('newQuoteBtn');

    async function fetchQuotes() {
        try {
            const response = await fetch('/api/quotes');
            return response.json();
        } catch (error) {
            console.error('Failed to fetch quotes:', error);
            return [];
        }
    }

    async function displayNewQuote() {
        quoteText.textContent = 'Wait Kare Le Bhai...';
        quoteAuthor.textContent = '';
        
        setTimeout(async () => {
            const quotes = await fetchQuotes();
            quotes.forEach(quote => {
                if (quote.author && quote.author.endsWith(', type.fit')) {
                    quote.author = quote.author.replace(', type.fit', '');
                }
            });
            if (quotes.length > 0) {
                const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                quoteText.textContent = randomQuote.text;
                quoteAuthor.textContent = randomQuote.author ? `By ${randomQuote.author}` : 'By Unknown';
            } else {
                quoteText.textContent = 'Failed to load quotes';
                quoteAuthor.textContent = '';
            }
        }, 500); 
    }

    newQuoteBtn.addEventListener('click', displayNewQuote);

    // Display the first quote on page load
    displayNewQuote();
});
