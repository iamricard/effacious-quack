$(document).ready(function() {

	$('#Search').on('submit', function(event) {
		event.preventDefault();
		searchSpotify();
	})

	function searchSpotify () {
		var term = $('input[name=query]').val();
		var requestURL = 'https://api.spotify.com/v1/search?q=' + term + '&type=artist';
		$.get(requestURL).done(function(result) {
			spotifyArtists(result);
		})
		.fail(function(jqXHR, status) {
			console.log(status);
		});
	}

	function spotifyArtists (result) {
		var artistsList = result.artists.items;
		artistsList.forEach(function (artist) {
			console.log(artist);
			var name = '<li><a href="" class="artist-link">' + artist.name + '</a></li>';
			$('#results').append(name);
			$('#results').removeClass('empty');
		});
	}

	$('.artist-link').on('click', function(event) {
		event.preventDefault();
		console.log("clicked"); // <-- THIS SHIT ISN'T WORKING
		var artistId = event.currentTarget.dataset.id;
		var albumsURL = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';
		$.get(albumsURL).done(function (result) {
			spotifyAlbums(result);
		})
	})

	function spotifyAlbums (result) {
		result.items.forEach(function (album) {
			var albumTitles = '<li>' + '<a data-id="' + album.id + '" href="" class="album">' + album.name + '</a>' + '</li>';
			$('.artist-link').append(albumTitles);
		});
	}

})
