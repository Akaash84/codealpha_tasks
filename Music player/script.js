const songs = [
  {
    name: "Dosti",
    artist: "Hemachandra",
    path: "audio/song1.mp3"
  },
  {
    name: "Attention",
    artist: "Charlie Puth",
    path: "audio/song2.mp3"
  },
  {
    name: "Bheemla Nayak",
    artist: "S Thaman",
    path: "audio/song3.mp3"
  }
];

let currentSongIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(song) {
  title.textContent = song.name;
  artist.textContent = song.artist;
  audio.src = song.path;
}

function updatePlaylist() {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.name} - ${song.artist}`;
    if (index === currentSongIndex) li.classList.add("active");
    li.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(songs[currentSongIndex]);
      playSong();
      updatePlaylist();
    });
    playlist.appendChild(li);
  });
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
  updatePlaylist();
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
  updatePlaylist();
});

audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  progress.value = (currentTime / duration) * 100;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  nextBtn.click(); // autoplay
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

loadSong(songs[currentSongIndex]);
updatePlaylist();
