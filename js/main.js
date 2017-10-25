// =================
// DOM SELECTORS
// =================

// Home page
const body = document.querySelector('body');
const wikiBtn = document.querySelector('.wiki-btn');
const transitionModal = document.querySelector('.transition-modal');

// Search modal page
const searchModal = document.querySelector('.search-modal');
const closeBtn = document.querySelector('.close-btn');
const searchInterface = document.querySelector('.search-interface');
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');

// Results page
const header = document.querySelector('header');
const homeBtn = document.querySelector('.home-btn');
const magBtn = document.querySelector('.mag-btn');
const searchTerm = document.querySelector('.search-term');
const articles = document.querySelector('.articles');
const noResultsMessage = document.querySelector('.no-results-message');

// Multiple selectors
const searchModalOpener = document.querySelectorAll('.search-modal-opener');


// =================
// EVENT LISTENERS
// =================

let searchNodesArray = [].slice.call(searchModalOpener); // Edge fix: converts selected elements array-like object into a real array in order to use native Array.prototype.forEach
searchNodesArray.forEach(function(element) {
  element.addEventListener('click', openSearchModal);
});

document.addEventListener('keydown', function() {
  if (event.keyCode === 27) {
    closeSearchModal();
  }
})

searchBar.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    search();
  }
});

closeBtn.addEventListener('click', closeSearchModal);
searchBtn.addEventListener('click', search);
homeBtn.addEventListener('click', resetPage);


// =================
// FUNCTIONS
// =================

function resetPage() {
  transitionModal.classList.add('slide-on-top');
  body.classList.add('no-scroll');
  setTimeout(function() {
    wikiBtn.style.display = 'inline-block';
    header.style.display = 'none';
    articles.style.display = 'none';
    noResultsMessage.style.display = 'none';
    searchBar.value = '';
    transitionModal.classList.remove('slide-on-top');
    body.classList.remove('no-scroll');
  }, 700);
}

function openSearchModal() {
  searchModal.classList.add('slide-on-top');
  body.classList.add('no-scroll');
  searchInterface.classList.add('fade-in');
  searchBar.focus();
}

function closeSearchModal() {
  searchModal.classList.remove('slide-on-top');
  body.classList.remove('no-scroll');
  searchInterface.classList.remove('fade-in');
}

function search() {
  let query = searchBar.value;
  let url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&origin=*&gsrlimit=50&generator=search&gsrsearch=' + query;

  fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok: " + response.statusText);
    })
    .then(function(data) {
      let results;
      data.query ? results = data.query.pages : results = false;
      displaySearchResults(query, results);
      closeSearchModal();
    })
    .catch(function(error) {
      console.log(error);
    });
}

function displaySearchResults(query, results) {
  wikiBtn.style.display = 'none';
  header.style.display = 'flex';
  searchTerm.textContent = query;
  noResultsMessage.style.display = 'none';

// remove all existing articles from page
  while (articles.lastChild) {
    articles.removeChild(articles.lastChild);
  }

  if (results) {
    articles.style.display = 'flex';
    for (let key in results) {
      if (results.hasOwnProperty(key)) {
        let articleData = results[key];
        createArticle(articleData);
      }
    }
  } else {
    noResultsMessage.style.display = 'block';
  }
}

function createArticle(articleData) {
  let article = document.createElement('article');
  article.classList.add('article');
  if (articleData.thumbnail) {
    let imageUrl = articleData.thumbnail.original;
    article.style.backgroundImage = 'url("' + imageUrl + '")';
  }
  else {
    article.classList.add('no-img');
  }

  let link = document.createElement('a');
  link.classList.add('article-link');
  link.href = 'http://en.wikipedia.org/?curid=' + articleData.pageid;
  link.target = '_blank';

  let linkHeaderContainer = document.createElement('div');
  linkHeaderContainer.classList.add('article-link-header-container');

  let linkHeader = document.createElement('h4');
  linkHeader.classList.add('article-link-header');
  linkHeader.textContent = articleData.title;
  
  link.appendChild(linkHeader);
  article.appendChild(link);
  articles.appendChild(article);
}