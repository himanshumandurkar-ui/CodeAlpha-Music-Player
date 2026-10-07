const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");

const songs = [
    {
        title: "My Song",
        artist: "Himanshu",
        file: "music/song1.mp3"
    }
];

let currentSong = 0;

function loadSong(index) {
    const song = songs[index];

    songTitle.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.file;
    audio.load();

    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
}

function formatTime(time) {
    if (!Number.isFinite(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

loadSong(currentSong);

playButton.addEventListener("click", async function () {
    try {
        if (audio.paused) {
            await audio.play();
            playButton.textContent = "⏸";
        } else {
            audio.pause();
            playButton.textContent = "▶";
        }
    } catch (error) {
        console.error("Audio error:", error);
        alert("Audio could not be played. Check that music/song1.mp3 exists.");
    }
});

nextButton.addEventListener("click", function () {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);

    audio.play().then(() => {
        playButton.textContent = "⏸";
    }).catch(console.error);
});

prevButton.addEventListener("click", function () {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);

    audio.play().then(() => {
        playButton.textContent = "⏸";
    }).catch(console.error);
});

audio.addEventListener("loadedmetadata", function () {
    progress.max = audio.duration;
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", function () {
    progress.value = audio.currentTime;
    currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", function () {
    audio.currentTime = Number(progress.value);
});

volume.addEventListener("input", function () {
    audio.volume = Number(volume.value);
});

audio.addEventListener("ended", function () {
    nextButton.click();
});

audio.addEventListener("error", function () {
    console.error("Audio source error:", audio.error);
});
