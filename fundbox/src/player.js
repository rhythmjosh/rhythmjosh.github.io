
function Player(spotifyTracks, playerMarkupTargetEl) {

    var tracksArray = spotifyTracks;
    var currentTrackIndex = 0;
    var markupReferences = {};

    var DEFAULT_PREVIEW_TIME = 30;
    var isPaused = false;
    var totalTime = 0;

    function init() {
        if(!playerMarkupTargetEl) {
            throw 'Missing player html target reference.';
        }

        // gather all the references here to manipulate DOM
        // this would not be needed if we use angular / react framework

        $playerEl = $(playerMarkupTargetEl);
        markupReferences.playerWrapper = $playerEl;
        markupReferences.backButton = $playerEl.find('.back__button');
        markupReferences.playButton = $playerEl.find('.play__button');
        markupReferences.pauseButton = $playerEl.find('.pause__button');
        markupReferences.forwardButton = $playerEl.find('.forward__button');
        markupReferences.audioPlayer = $playerEl.find('.audio__player');

        markupReferences.videoImage = $playerEl.find('.video__image');
        markupReferences.artistName = $playerEl.find('.artist__name');
        markupReferences.trackName = $playerEl.find('.track__name');
        markupReferences.progressBarPlaying = $playerEl.find('.progress__bar--playing');
        markupReferences.startTime = $playerEl.find('.player__start--timer');
        markupReferences.endTime = $playerEl.find('.player__stop--timer');

        bindEvents();
        renderFirstTrack();
    }

    function renderFirstTrack() {
        play();
    }


    function pause() {
        isPaused = true;
        markupReferences.audioPlayer[0].pause();
        markupReferences.playerWrapper.addClass('paused').removeClass('playing');
    }

    function resume() {
        markupReferences.playerWrapper.addClass('playing').removeClass('paused');
        markupReferences.audioPlayer[0].play();
        isPaused = false;
    }

    function play() {

        if(isPaused) {
            resume();
            return;
        }

        var track = tracksArray[currentTrackIndex];
        resetPlayState();
        loadTrack(track);
        markupReferences.playerWrapper.addClass('playing').removeClass('paused');
        markupReferences.audioPlayer[0].play();
        isPaused = false;

    }

    function updatePlayState() {
        var currentTime = getCurrentTime();
        var percentage = currentTime * 100 / totalTime;

        markupReferences.startTime.html(formatPlayTime(currentTime));
        markupReferences.progressBarPlaying.css('width', percentage + '%');
    }

    function resetPlayState() {
        markupReferences.audioPlayer[0].currentTime = 0;
        markupReferences.startTime.html(formatPlayTime(0));
        markupReferences.progressBarPlaying.css('width', '0%');
    }


    function back() {
        // on 0 it will loop to last track
        if(currentTrackIndex === 0) {
            currentTrackIndex = tracksArray.length - 1;
        } else {
            currentTrackIndex--;
        }

        play();
    }

    function forward() {
        // on end of tracks it will loop to 0
        if(currentTrackIndex === tracksArray.length - 1) {
            currentTrackIndex = 0;
        } else {
            currentTrackIndex++;
        }

        play();
    }

    function loadTrack(track) {
        markupReferences.audioPlayer[0].src = track.preview_url;
        markupReferences.trackName.html(track.name);
        // only using the first artist name
        markupReferences.artistName.html(track.artists[0].name);
        markupReferences.videoImage.css("background-image", "url('"+ track.album.images[0].url +"')");
        totalTime = track.duration_ms/1000;
        markupReferences.endTime.html(formatPlayTime(totalTime));
    }

    function formatPlayTime(timeInSeconds) {
        var min = parseInt(timeInSeconds / 60);
        var sec = parseInt(timeInSeconds - (min * 60));

        if(min < 10) {
            min = '0'+ min;
        }
        if(sec < 10) {
            sec = '0'+ sec;
        }
        return min + ':' + sec;
    }

    function getCurrentTime() {
        return markupReferences.audioPlayer[0].currentTime;
    }

    function bindEvents() {
        markupReferences.backButton.on('click', back);
        markupReferences.playButton.on('click', play);
        markupReferences.pauseButton.on('click', pause);
        markupReferences.forwardButton.on('click', forward);
        markupReferences.audioPlayer[0].ontimeupdate = updatePlayState;
    }

    init();
}

