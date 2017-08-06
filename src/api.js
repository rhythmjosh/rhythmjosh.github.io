(function() {
    function getSpotifyTracks(accessToken, tracks) {
        if(!tracks || tracks.length === 0) {
            throw 'Must provide at least one track!'
        }

        var tracksUrl = 'https://api.spotify.com/v1/tracks?market=ES&ids=' + tracks.join(',');
        return $.ajax({
            type: 'GET',
            url: tracksUrl,
            headers: {
               'Authorization': 'Bearer ' + accessToken
            }
        })
    }

    window.SpotifyApi = {
        getSpotifyTracks: getSpotifyTracks
    }
})();