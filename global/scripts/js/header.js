const header = {
  items: {
    open: function () {
      const items = document.getElementsByClassName('ph-item');

      let counter = 0.2;

      for (let i = 0; i < items.length; i++) {
        const element = items[i];
        counter = counter + 0.06;
        element.style.animation = `showHeaderItem ${counter.toString()}s linear`;
      }
      itemsController.itemsContainer.style.left = '0';
      itemsController.itemsContainer.style.opacity = '1';
    },
    close: function () {
      const items = document.getElementsByClassName('ph-item');

      let counter = 0.2;

      for (let i = 0; i < items.length; i++) {
        const element = items[i];
        counter = counter + 0.06;
        element.style.animation = `hideHeaderItem ${counter.toString()}s linear reverse`;
      }
      itemsController.itemsContainer.style.left = '-100vw';
      itemsController.itemsContainer.style.opacity = '0';
    },
    showItems: function () {
      if (window.innerWidth >= 1025) itemsController.itemsContainer.style.opacity = '1';
    }
  },
  search: {
    open: function () {
      console.log('fock');
      if (window.innerWidth < 1025) {
        searchController.headerSearch.style.right = '0';
        searchController.headerSearch.style.opacity = '1';
      } else {
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
      }
    },
    close: function () {
      if (window.innerWidth < 1025) {
        searchController.headerSearch.style.opacity = '0';
        searchController.headerSearch.style.right = '-100vw';
      } else {
        const waitBackClose = setInterval(() => {
          searchController.searchBackground.style.animation = 'hideBackground 1s linear';
        }, 200);

        clearInterval(waitBackClose);

        searchController.searchResults.style.right = '-100vw';
        searchController.searchBackground.style.visibility = 'hidden';
        searchController.headerSearch.removeChild(searchBackground);
      }
    },
  }
}

const itemsController = {
  openItems: document.querySelector('.items-open'),
  itemsHeader: document.querySelector('.ph-header'),
  itemsContainer: document.querySelector('.ph-items'),
};

itemsController.openItems.addEventListener('click', header.items.open);
itemsController.itemsHeader.addEventListener('click', header.items.close);

const searchController = {
  searchOpen: document.querySelector('.search-open'),
  searchCloser: document.querySelector('.search-closer'),
  searchInput: document.querySelector('.ph-search-input'),
  headerSearch: document.querySelector('.header-search'),
  searchResults: document.querySelector('.ph-search-results'),
  searchBackground: document.createElement('div'),
};

searchController.searchInput.addEventListener('focus', header.search.open);
searchController.searchOpen.addEventListener('click', header.search.open);
searchController.searchCloser.addEventListener('click', header.search.close);
searchController.searchInput.addEventListener('input', header.search.showResults);
window.addEventListener('resize', header.items.showItems);
window.addEventListener('resize', header.search.close);
