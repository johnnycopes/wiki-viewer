// =================
// DOM SELECTORS
// =================

// Home page
const body = document.querySelector('body');
const searchBtn = document.querySelector('.search-btn');

// Search modal page
const searchModal = document.querySelector('.search-modal');
const searchBar = document.querySelector('.search-bar');
const closeBtn = document.querySelector('.close-btn');

// Results page
const header = document.querySelector('header');
const searchTerm = document.querySelector('.search-term');
const articles = document.querySelector('.articles');


// =================
// EVENT LISTENERS
// =================

searchBtn.addEventListener('click', function() {
  openSearchModal();
});

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
  searchBtn.classList.add('fade-out');
  searchModal.classList.add('slide-down');
  searchBar.classList.add('fade-in');
  searchBar.focus();
}

function closeSearchModal() {
  searchModal.classList.remove('slide-down');
  searchBar.classList.remove('fade-in');
  searchBtn.classList.remove('fade-out');
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
  searchBtn.style.display = 'none';
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

  let link = document.createElement('a');
  link.classList.add('article-link');
  link.href = 'http://en.wikipedia.org/?curid=' + articleData.pageid;
  link.target = '_blank';

  let linkHeader = document.createElement('h4');
  linkHeader.classList.add('article-link-header');
  linkHeader.textContent = articleData.title;
  
  link.appendChild(linkHeader);
  article.appendChild(link);
  articles.appendChild(article);
}