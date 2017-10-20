const header = document.querySelector('header');
const searchBtn = document.querySelector('.search-icon');
const searchModal = document.querySelector('.search-modal');
const searchBar = document.querySelector('.search-bar');
const closeBtn = document.querySelector('.close-icon');

searchBtn.addEventListener('click', function() {
  searchBtn.classList.add('fade-out');
  searchModal.classList.add('slide-down');
  searchBar.classList.add('fade-in');
  searchBar.focus();
});

closeBtn.addEventListener('click', function() {
  searchModal.classList.remove('slide-down');
  searchBar.classList.remove('fade-in');
  searchBtn.classList.remove('fade-out');
});

searchBar.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    let query = searchBar.value;
    let url = "https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=50&generator=search&origin=*&gsrsearch=" + query;

    fetch(url)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok: " + response.statusText);
      })
      .then(function(data) {
        // do something with data
        let results = data.query.pages;
        console.log(results);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});