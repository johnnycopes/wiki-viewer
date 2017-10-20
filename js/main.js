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