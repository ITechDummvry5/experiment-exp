
    // === MUSIC PLAYER SCRIPT ===

    let songs = [
      {
        title: "BIRDS OF A FEATHER",
        artist: "Billie Eilish",
        src: "images/BIRDS OF A FEATHER - Billie Eilish.mp3",
        img: "images/Billie_Eilish.webp"
      },
      {
        title: "Lovely",
        artist: "Billie Eilish ft. Khalid",
        src: "images/Billie Ellish, Khaild- Lovely.mp3",
        img: "images/billie_eilish_feat_khalid_lovely.jpg"
      },
      {
        title: "Goo Goo Dolls",
        artist: "Iris",
        src: "images/Goo Goo Dolls - Iris (Lyrics).mp3",
        img: "images/goo goo dolls.jpg"
      }
    ];

    let song = document.getElementById("song");
    let progress = document.getElementById("progress");
    let ctrIcon = document.getElementById("ctrIcon");
    let songImg = document.getElementById("songImg");
    let songTitle = document.getElementById("songTitle");
    let songArtist = document.getElementById("songArtist");

    let currentSong = 0;

    // === LOAD SONG FUNCTION ===
    function loadSong(index) {
      let s = songs[index];
      song.src = s.src;
      songTitle.textContent = s.title;
      songArtist.textContent = s.artist;
      songImg.src = s.img;
      progress.value = 0;
      song.load();
      playSong();
    }

    // === PLAY FUNCTION ===
    function playSong() {
      song.play();
      ctrIcon.classList.remove("fa-play");
      ctrIcon.classList.add("fa-pause");
      songImg.classList.add("spin");
    }

    // === PAUSE FUNCTION ===
    function pauseSong() {
      song.pause();
      ctrIcon.classList.remove("fa-pause");
      ctrIcon.classList.add("fa-play");
      songImg.classList.remove("spin");
    }

    // === PLAY / PAUSE TOGGLE ===
    function playPause() {
      if (song.paused) {
        playSong();
      } else {
        pauseSong();
      }
    }

    // === UPDATE PROGRESS BAR ===
    song.onloadedmetadata = function() {
      progress.max = song.duration;
      progress.value = song.currentTime;
    }

    if (song.play()) {
      setInterval(() => {
        progress.value = song.currentTime;
      }, 500);
    }

    progress.onchange = function() {
      song.currentTime = progress.value;
      playSong();
    }

    // === NEXT / PREVIOUS SONG ===
    document.getElementById("next").onclick = function() {
      currentSong = (currentSong + 1) % songs.length;
      loadSong(currentSong);
    }

    document.getElementById("prev").onclick = function() {
      currentSong = (currentSong - 1 + songs.length) % songs.length;
      loadSong(currentSong);
    }

    // Auto play next song when one ends
    song.addEventListener("ended", function() {
      currentSong = (currentSong + 1) % songs.length;
      loadSong(currentSong);
    });
