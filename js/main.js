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
    let query = searchBar.value;
    let url = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&gsrlimit=50&generator=search&origin=*&gsrsearch=' + query;

    fetch(url)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok: ' + response.statusText);
      })
      .then(function(data) {
        let results = data.query.pages;
        console.log(results)
        closeSearchModal();
        displaySearchResults(query, results);
      })
      .catch(function(error) {
        console.log(error);
      });
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
  article.textContent = articleData.title;
  if (articleData.thumbnail) {
    let imageUrl = articleData.thumbnail.source;
    article.style.backgroundImage = 'url("' + imageUrl + '")';
  }
  articles.appendChild(article);
}