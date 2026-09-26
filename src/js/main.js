import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);

async function initQuickLookup() {
  // Load products first
  await productList.init();

  const searchInput = document.querySelector("#quickLookup");
  const clearButton = document.querySelector("#clearLookup");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      const productName = card.textContent.toLowerCase();

      if (productName.includes(searchTerm)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";

    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      card.style.display = "";
    });

    searchInput.focus();
  });
}

initQuickLookup();