document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  
    const faqItems = Array.from(document.querySelectorAll(".faq-item"));
    const questions = Array.from(document.querySelectorAll(".faq-question"));
    const searchInput = document.getElementById("searchInput");
    const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
  
    // Accordion-Logic
    questions.forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const answer = item.querySelector(".faq-answer");
        const isOpen = item.classList.contains("open");
  
        if (isOpen) {
          item.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
          answer.hidden = true;
        } else {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
          answer.hidden = false;
        }
      });
    });
  
    // Filter by Category
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
  
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
  
        applyFilters(filter, searchInput?.value || "");
      });
    });
  
    // Live-Search
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const activeFilterBtn = filterButtons.find((btn) => btn.classList.contains("active"));
        const filter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
        applyFilters(filter, searchInput.value);
      });
    }
  
    /**
     * Kombinierter Filter (Kategorie + Textsuche)
     */
    function applyFilters(categoryFilter, searchTermRaw) {
      const term = (searchTermRaw || "").trim().toLowerCase();
  
      faqItems.forEach((item) => {
        const categories = (item.getAttribute("data-category") || "").split(/\s+/);
        const inCategory = categoryFilter === "all" || categories.includes(categoryFilter);
  
        const textContent = item.textContent.toLowerCase();
        const matchesSearch = !term || textContent.includes(term);
  
        const visible = inCategory && matchesSearch;
        item.classList.toggle("hidden", !visible);
      });
    }
  });
  