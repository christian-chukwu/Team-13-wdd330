import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const productData = new ProductData("tents");
const listElement = document.querySelector(".product-list");

async function initProductList() {
  const productList = new ProductList("tents", productData, listElement);
  await productList.init();
}

initProductList();

// Handle newsletter form submit
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".newsletter-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      if (email) {
        alert(`Thanks for subscribing, ${email}!`);
        form.reset();
      }
    });
  }
});
