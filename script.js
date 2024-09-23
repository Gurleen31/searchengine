document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchHistory = document.getElementById('searchHistory');
    const clearHistoryButton = document.getElementById('clearHistoryButton');

    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    function updateHistory() {
        searchHistory.innerHTML = '';
        history.forEach(term => {
            const li = document.createElement('li');
            li.textContent = term;
            searchHistory.appendChild(li);
        });
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }

    function addToHistory(term) {
        if (!history.includes(term)) {
            history.unshift(term);
            if (history.length > 15) {
                history.pop();
            }
            updateHistory();
        }
    }

    searchButton.addEventListener('click', () => {
        const term = searchInput.value.trim();
        if (term) {
            addToHistory(term);
            console.log('Searching for:', term);
            searchInput.value = '';
        }
    });

    clearHistoryButton.addEventListener('click', () => {
        history = [];
        updateHistory();
    });

    updateHistory();
});