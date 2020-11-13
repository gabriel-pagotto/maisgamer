const home = document.querySelector('.home');
const loadMoreButton = document.querySelector('.load-more');
const loads = document.querySelector('.loads');

let page = 1;
let totalPages = 0;
let working = false;
let animationTime = 0.7;

window.addEventListener('scroll', () => {
  const scrollCounter = (document.documentElement.scrollTop + window.innerHeight) >= document.documentElement.scrollHeight - 550;
  if (scrollCounter === true && working === false) {
    if (totalPages === 0 || page < totalPages - 1) {
      loads.style.visibility = 'visible';
      working = true;
      page = page + 1;
      const xhr = new XMLHttpRequest;
      xhr.open('get', window.location + `?page=${page}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const data = response.pages;
            totalPages = response.total;
            const pageElement = document.createElement('div');
            pageElement.className = 'page';
            home.appendChild(pageElement);
            const headerArt = document.createElement('a');
            let category = '';
            console.log(data);
            if (data.header.category !== null) category = `<div class="category">${data.header.category.name}</div>`;
            headerArt.className = 'header-art';
            headerArt.href = '/article?q=' + data.header.id;
            headerArt.innerHTML = `
              ${category}
              <h3 class="header-title">${data.header.title}</h3>
              <div class="header-pic">
                <img src="${data.header.coverImage}" alt="${data.header.title}">
              </div>
              <p class="header-subtitle">${data.header.subtitle}</p>
              <div class="infos">
                <span class="postedBy"><i style="margin-right: 5px;" 
                    class="fas fa-user-tag"></i>${data.header.postedBy.name + ' ' + data.header.postedBy.surname}
                </span>
                <time datetime="${data.header.createdAt}"><i class="far fa-clock">
                ${data.header.datePost}</i></time>
              </div>
            `;
            pageElement.appendChild(headerArt);

            const restNotices = data.articles;
            for (counter = 0; counter < restNotices.length; counter++) {
              const element = data.articles[counter];
              const restArt = document.createElement('a');
              let category = '';
              if (element.category !== null) category = `<div class="category">${element.category.name}</div>`;
              restArt.className = 'rest-art';
              restArt.href = '/article?q=' + element.id;
              restArt.innerHTML = `
                <div class="rest-pic">
                  <img src="${element.coverImage}" alt="${element.title}">
                </div>
                <div class="infos">
                  ${category}
                  <h3 class="rest-title">${element.title}</h3>
                  <p class="rest-subtitle">${element.subtitle}</p>
                  <span class="postedBy"><i style="margin-right: 5px;" 
                      class="fas fa-user-tag"></i>${element.postedBy.name + ' ' + element.postedBy.surname}</span>
                  <time datetime="${element.createdAt}"><i class="far fa-clock">
                    ${element.datePost}</i></time>
                </div>
              `;
              animationTime = animationTime + 0.2;
              const time = String(animationTime);
              restArt.style.animation = `loadsItems ${time}s  linear`
              if (counter === 3) {
                if (window.innerWidth < 1025) {
                  const adsMobileScript1 = document.createElement('script');
                  adsMobileScript1.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
                  adsMobileScript1.async = true;
                  const adsMobile = document.createElement('div');
                  adsMobile.appendChild(adsMobileScript1);
                  adsMobile.className = 'ads-pc';
                  adsMobile.innerHTML = `
                  <ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-fb+5v+4k-d3+7b"
                  data-ad-client="ca-pub-1284323428666859" data-ad-slot="6148256205"></ins>
                  `;
                  const adsMobileScript2 = document.createElement('script');
                  adsMobileScript2.src = '/static/javascript/googleAds.js';
                  adsMobile.appendChild(adsMobileScript2);
                  pageElement.appendChild(adsMobile);
                } else {
                  const adsPcScript1 = document.createElement('script');
                  adsPcScript1.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
                  adsPcScript1.async = true;
                  const adsPc = document.createElement('div');
                  adsPc.appendChild(adsPcScript1);
                  adsPc.className = 'ads-pc';
                  adsPc.innerHTML = `
                    <ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-fb+5v+4k-d3+7b"
                      data-ad-client="ca-pub-1284323428666859" data-ad-slot="3556740125"></ins>
                  `;
                  const adsPcScript2 = document.createElement('script');
                  adsPcScript2.src = '/static/javascript/googleAds.js';
                  adsPc.appendChild(adsPcScript2);
                  pageElement.appendChild(adsPc);
                };
              };
              pageElement.appendChild(restArt);
            };
            const scriptAd = document.createElement('script');
            scriptAd.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            scriptAd.async = true;
            const adGoogle = document.createElement('div');
            adGoogle.appendChild(scriptAd);
            adGoogle.className = 'ad-h1';
            adGoogle.innerHTML += `
            <!-- H-1 -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-1284323428666859"
                 data-ad-slot="8676887631"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            `;
            const scriptAd2 = document.createElement('script');
            scriptAd2.src = '/scripts/js/googleAds.js';
            pageElement.appendChild(adGoogle);
            pageElement.appendChild(scriptAd2);
            animationTime = 0.7;
            loads.style.visibility = 'hidden';
            working = false;
          };
        };
      };
      xhr.send();
    };
  };
});
