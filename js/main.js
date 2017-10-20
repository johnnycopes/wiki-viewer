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




let url = "https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=butt";

fetch(url)
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Network response was not ok: " + response.statusText);
  })
  .then(function(data) {
		// do something with data
		console.log('got it', data);
	})
	.catch(function(error) {
		console.log(error);
	});