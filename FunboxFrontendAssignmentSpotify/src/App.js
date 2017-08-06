(function() {

function onTracksReceivedSuccess(data) {
    initPlayer(data);
}

function onTracksReceivedFailed(error) {
    alert('AuthToken seems to be expired! Please provide new AuthToken to proceed!');
}

function initPlayer(response) {
    var $playerEl = $('.player__wrapper');
    var playerInstance = new Player(response.tracks, $playerEl);
}
// BQBeCsGS_HhhvdkcX9XcqYJTkRBINVuKr65IoIffYGA2jB7KtUidrLL3Y3YlAWzzFwnS0cOsgubWhgu2k2UDmOrWO1aR4_M2tJP8lWgLu_pO1_vAtrLi9CUcg7XIbTMU6fVANSpgJRiC7HDNHZA22OAVvjkl4FY
function initApp() {
    $('.player__wrapper').hide();

    $('#init__app').on('click', function() {
        var authToken = $('#auth__token').val();
        if(!authToken) {
            alert('Must provide the Spotify AuthToken to initialize this app!');
            return;
        }

        $('.auth__wrapper').hide();
        $('.player__wrapper').show();

        var tracksIwant2Play = ['7ouMYWpwJ422jRcDASZB7P', '4VqPOruhp5EdPBeR92t6lQ', '2takcwOaAZWiXQijPHIx7B'];
        SpotifyApi.getSpotifyTracks(authToken, tracksIwant2Play).then(onTracksReceivedSuccess, onTracksReceivedFailed);

    });
}

$(initApp);

})();




function login() {
    var clientid = 'a80307fff6da4a0a9379cee24374cfad';
}