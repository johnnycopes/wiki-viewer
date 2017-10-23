// =================
// DOM SELECTORS
// =================

// Home page
const body = document.querySelector('body');
const wikiBtn = document.querySelector('.wiki-btn');
const transitionModal = document.querySelector('.transition-modal');

// Search modal page
const searchModal = document.querySelector('.search-modal');
const searchBar = document.querySelector('.search-bar');
const closeBtn = document.querySelector('.close-btn');

// Results page
const header = document.querySelector('header');
const homeBtn = document.querySelector('.home-btn');
const searchBtn = document.querySelector('.search-btn');
const searchTerm = document.querySelector('.search-term');
const articles = document.querySelector('.articles');
const noResultsMessage = document.querySelector('.no-results-message');

// Multiple selectors
const searchModalOpener = document.querySelectorAll('.search-modal-opener');


// =================
// EVENT LISTENERS
// =================

closeBtn.addEventListener('click', closeSearchModal);

searchModalOpener.forEach(function(element) {
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
  searchBar.classList.add('fade-in');
  searchBar.focus();
}

function closeSearchModal() {
  searchModal.classList.remove('slide-on-top');
  body.classList.remove('no-scroll');
  searchBar.classList.remove('fade-in');
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
      console.log(data);
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

// remove all existing articles from page
  while (articles.lastChild) {
    articles.removeChild(articles.lastChild);
  }

  if (results) {
    console.log(results);
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