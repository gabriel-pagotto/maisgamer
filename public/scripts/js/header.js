const header = {
  items: {
    open: function () {
      const items = document.getElementsByClassName('ph-item')

      let counter = 0.1;

      for (let i = 0; i < items.length; i ++) {
        const element = items[i];
        console.log(element);
        counter = counter + 0.1;
        element.style.animation = `showHeaderItem ${counter.toString()}s linear`;
        element.style.animation = `showHeaderItem ${counter.toString()}s linear`;
        element.style.animation = `showHeaderItem ${counter.toString()}s linear`;
      }
      itemsController.itemsContainer.style.left = '0';
      itemsController.itemsContainer.style.opacity = '1';
    },
    close: function () {

    },
  },
  search: {
    open: function () {
      searchController.searchBackground.addEventListener('click', header.search.close);
      searchController.searchBackground.style = `
      visibility: hidden;
      position: fixed;
        top: 64px;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        opacity: 0.7;
        `;

      searchController.headerSearch.appendChild(searchController.searchBackground);

      searchController.searchBackground.style.animation = 'showBackground 0.3s linear';
      searchController.searchResults.style.right = '0';
      searchController.searchBackground.style.visibility = 'visible';
    },
    close: function () {
      const waitBackClose = setInterval(() => {
        searchController.searchBackground.style.animation = 'hideBackground 1s linear';
      }, 200);

      clearInterval(waitBackClose);

      searchController.searchResults.style.right = '-100vw';
      searchController.searchBackground.style.visibility = 'hidden';
      searchController.headerSearch.removeChild(searchBackground);
    },
    showResults: function () {

    },
  }
}

const itemsController = {
  openItems: document.querySelector('.items-open'),
  itemsContainer: document.querySelector('.ph-items'),
};

itemsController.openItems.addEventListener('click', header.items.open);

const searchController = {
  searchInput: document.querySelector('.ph-search-input'),
  headerSearch: document.querySelector('.header-search'),
  searchResults: document.querySelector('.ph-search-results'),
  searchBackground: document.createElement('div'),
};

searchController.searchInput.addEventListener('focus', header.search.open);
searchController.searchInput.addEventListener('input', header.search.showResults);
