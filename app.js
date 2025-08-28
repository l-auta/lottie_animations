var animation = lottie.loadAnimation({
            container: document.getElementById('lottie-animation'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'animation.json' // the path to the animation json
        });

animation.setSpeed(0.3); // set speed to half

let allSongs = [];

// Load Lottie animation for loader
const loader = lottie.loadAnimation({
  container: document.getElementById('loading'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'loading.json'
});

// Fetch songs once on startup
fetch('songs.json')
  .then(response => response.json())
  .then(data => {
    allSongs = data.songs;
    showSongs("All"); // initial load
  });

// Function to show songs (with loader)
function showSongs(genre) {
  const songsContainer = document.getElementById("songs");
  const loadingContainer = document.getElementById("loading");

  // Clear old songs
  songsContainer.innerHTML = "";

  // Show loader
  loadingContainer.style.display = "block";

  // Simulate fetch delay (1 sec)
  setTimeout(() => {
    // Hide loader
    loadingContainer.style.display = "none";

    // Filter songs
    let filtered = genre === "All" ? allSongs : allSongs.filter(song => song.genre === genre);

    if (filtered.length === 0) {
      songsContainer.innerHTML = "<p>No songs found.</p>";
      return;
    }

    // Render songs
    filtered.forEach(song => {
      let p = document.createElement("p");
      p.textContent = `${song.title} (${song.genre})`;
      songsContainer.appendChild(p);
    });
  }, 10000); // change to 500 or 2000 to make loader shorter/longer
}
