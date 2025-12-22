document.addEventListener("DOMContentLoaded", () => {
    
  // 1. Jahr aktualisieren
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Scroll Animation (Reveal)
  const reveals = document.querySelectorAll(".reveal");
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Einmal beim Laden feuern

  // 3. FAQ Logic
  const faqCards = Array.from(document.querySelectorAll(".faq-card"));
  
  document.querySelectorAll(".faq-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".faq-card");
      const content = card.querySelector(".faq-content");
      const isOpen = card.classList.contains("open");

      // Schließe alle anderen (Accordion-Style für cleaneren Look)
      faqCards.forEach(c => {
          if(c !== card) {
              c.classList.remove("open");
              c.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
              c.querySelector(".faq-content").hidden = true;
          }
      });

      if (isOpen) {
        card.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        content.hidden = true;
      } else {
        card.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        content.hidden = false;
      }
    });
  });

  // 4. Filter & Suche
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-pill");

  const filterContent = () => {
      const activeBtn = document.querySelector(".filter-pill.active");
      const category = activeBtn ? activeBtn.getAttribute("data-filter") : "all";
      const term = searchInput.value.toLowerCase().trim();

      faqCards.forEach((card) => {
          const cardCats = card.getAttribute("data-category") || "";
          const text = card.textContent.toLowerCase();
          
          const matchesCat = category === "all" || cardCats.includes(category);
          const matchesSearch = !term || text.includes(term);

          if(matchesCat && matchesSearch) {
              card.classList.remove("hidden");
          } else {
              card.classList.add("hidden");
          }
      });
  };

  filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
          filterButtons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          filterContent();
      });
  });

  if(searchInput) {
      searchInput.addEventListener("input", filterContent);
  }
});