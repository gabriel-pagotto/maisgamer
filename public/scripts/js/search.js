const searchResultsHeader = document.querySelector('.search-results-header');
const searchResultsLoader = document.querySelector('.search-results-loader');
const searchInput = document.querySelector('.ph-search-input');
const results = document.querySelector('.results');

function search() {
  if (searchInput.value.length === 0 || searchInput.value === ' ') {
    results.innerHTML = '';
    return searchResultsHeader.innerHTML = `Escreva para buscar`;
  }

  searchResultsHeader.style.display = 'none';
  results.style.display = 'none';
  searchResultsLoader.style.display = 'block';

  const xhr = new XMLHttpRequest();

  xhr.open('get', `/search?q=${searchInput.value}`);
  xhr.onload = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      searchResultsLoader.style.display = 'none';
      results.style.display = 'block';
      searchResultsHeader.style.display = 'block';

      const result = JSON.parse(xhr.responseText);

      if (result.response === 'Nothing was found') {
        results.innerHTML = '';
        return searchResultsHeader.innerHTML = `Nada foi encontrado para "${result.q}"`;
      }

      results.innerHTML = '';

      result.response.map((result) => {
        const resultContainer = document.createElement('a');
        resultContainer.href = `/article?q=${result.id}`;
        resultContainer.className = 'result-container';
        resultContainer.innerHTML = `
          <div class="result-image">
            <img src="${result.cover_image}" alt="${result.subtitle}">
          </div>
          <div class="result-title">${result.title}</div> 
        `; 
        results.appendChild(resultContainer);
      });
      if (result.total === 1) searchResultsHeader.innerHTML = `${result.total} resultado encontrado para "${result.q}"`;
      if (result.total > 1) searchResultsHeader.innerHTML = `${result.total} resultados encontrados para "${result.q}"`;
    }
  }

  xhr.send();
}

searchInput.addEventListener('input', search);
