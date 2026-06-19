// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function() {
  
  // Watch Now button
  const watchBtn = document.querySelector(".watch-btn");
  watchBtn.addEventListener("click", function(e) {
    e.preventDefault();
    alert("Watch Now clicked! Video player will open here.");
    // Future: redirect to actual video URL or embed player
  });

  // Episode list click
  const episodes = document.querySelectorAll(".episode-card");
  episodes.forEach((ep, index) => {
    ep.addEventListener("click", function() {
      alert("Episode " + (index + 1) + " clicked! Load video here.");
      // Future: redirect to actual episode video URL
    });
  });

});
// 24h ad skip + episode streaming
function playEpisode(videoUrl) {
  const lastUnlock = localStorage.getItem("lastUnlockTime");
  const currentTime = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (lastUnlock && currentTime - lastUnlock < twentyFourHours) {
    // Direct video
    window.location.href = videoUrl;
  } else {
    // Ad first
    alert("Redirecting to ad link. Please skip to continue...");
    localStorage.setItem("pendingVideo", videoUrl);
    window.location.href = "https://cuty.io/3TbK"; // ← replace with your ad link
  }
}

// When user comes back from ad
window.addEventListener("load", () => {
  const pendingVideo = localStorage.getItem("pendingVideo");
  if (pendingVideo) {
    localStorage.setItem("lastUnlockTime", Date.now());
    localStorage.removeItem("pendingVideo");
    window.location.href = pendingVideo;
  }
});

// Bind buttons
document.addEventListener("DOMContentLoaded", () => {
  const watchBtn = document.querySelector(".watch-btn");
  if (watchBtn) watchBtn.addEventListener("click", e => { e.preventDefault(); playEpisode("/videos/naruto_ep1.mp4"); });

  const episodes = document.querySelectorAll(".episode-card");
  episodes.forEach((ep, index) => {
    ep.addEventListener("click", () => {
      playEpisode(`/videos/naruto_ep${index + 1}.mp4`);
    });
  });
});
