// 🔹 Sidebar toggle
function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

// 🔹 Open anime page (placeholder)
function openAnime(page) {
  alert("Anime page would open: " + page);
}

// 🔹 Search bar filter
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const animeGrid = document.getElementById("animeGrid");
  const cards = animeGrid.querySelectorAll(".anime-card");

  searchInput.addEventListener("input", function() {
    const query = this.value.toLowerCase();
    cards.forEach(card => {
      const name = card.querySelector("p").textContent.toLowerCase();
      card.style.display = name.includes(query) ? "block" : "none";
    });
  });
});0

