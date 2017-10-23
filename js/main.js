// =================
// DOM SELECTORS
// =================

// Home page
const body = document.querySelector('body');
const wikiBtn = document.querySelector('.wiki-btn');

// Search modal page
const searchModal = document.querySelector('.search-modal');
const searchBar = document.querySelector('.search-bar');
const closeBtn = document.querySelector('.close-btn');

// Results page
const header = document.querySelector('header');
const searchBtn = document.querySelector('.search-btn');
const searchTerm = document.querySelector('.search-term');
const articles = document.querySelector('.articles');

// Multiple selectors
const modalOpener = document.querySelectorAll('.modal-opener');


// =================
// EVENT LISTENERS
// =================

modalOpener.forEach(function(element) {
  element.addEventListener('click', function() {
    openSearchModal();
  });
});

document.addEventListener('keydown', function() {
  if (event.keyCode === 27) {
    closeSearchModal();
  }
})

closeBtn.addEventListener('click', function() {
  closeSearchModal();
});

searchBar.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    search();
  }
});

// =================
// FUNCTIONS
// =================

function openSearchModal() {
  wikiBtn.classList.add('fade-out');
  searchModal.classList.add('slide-down');
  searchBar.classList.add('fade-in');
  searchBar.focus();
}

function closeSearchModal() {
  searchModal.classList.remove('slide-down');
  searchBar.classList.remove('fade-in');
  wikiBtn.classList.remove('fade-out');
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
      let results = data.query.pages;
      closeSearchModal();
      displaySearchResults(query, results);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function displaySearchResults(query, results) {
  wikiBtn.style.display = 'none';
  header.style.display = 'flex';
  articles.style.display = 'flex';
  searchTerm.textContent = query;

  for (let key in results) {
    if (results.hasOwnProperty(key)) {
      let articleData = results[key];
      createArticle(articleData);
    }
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
  
  // link.appendChild(linkHeaderContainer);
  // linkHeaderContainer.appendChild(linkHeader);
  link.appendChild(linkHeader);
  article.appendChild(link);
  articles.appendChild(article);
}