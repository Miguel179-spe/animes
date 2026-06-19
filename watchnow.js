// Function to open episode / watch now link
function openEpisode(episodeURL) {
    const lastSkipped = localStorage.getItem("adSkipped");
    const now = new Date().getTime();

    if(lastSkipped && now - lastSkipped < 24*60*60*1000){
        // 24h ke andar → direct link
        window.location.href = episodeURL;
    } else {
        // 24h ho gaye ya first time → ad page
        localStorage.setItem("nextEpisode", episodeURL);
        window.location.href = "ad_page.html";
    }
}

// Watch Now button
document.querySelector(".watch-btn").addEventListener("click", function(e){
    e.preventDefault();
    openEpisode("https://cuty.io/3TbK"); // 🔹 Example link
});

// Episode cards
document.querySelectorAll(".episode-card").forEach((ep, index) => {
    ep.addEventListener("click", function(){
        openEpisode("https://cuty.io/3TbK"); // 🔹 Example link
    });
});

