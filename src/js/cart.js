import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cartElement = document.querySelector(".product-list");
const cart = new ShoppingCart(cartElement);
cart.init();

/*
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  const cartFooter = document.querySelector(".cart-footer");
  if (cartItems.length > 0) {
    cartFooter.classList.remove("hide");
    const total = cartItems.reduce((sum, item) => {
      const price = Number(item.FinalPrice ?? item.price ?? 0);
      return sum + (Number.isFinite(price) ? price : 0);
    }, 0);
    cartFooter.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add("hide");
  }
  addRemoveButtons();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-cart-item cart-card__remove"  id="${item.Id}" aria-label="Remove from cart">✕</button>
</li>`;

  return newItem;
}

function addRemoveButtons() {
  document
    .querySelector(".product-list")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("remove-cart-item")) {
        const idToRemove = e.target.getAttribute("id");
        removeCartItem(idToRemove);
      }
    });
}

function removeCartItem(id) {
  const cartItems = getLocalStorage("so-cart");
  const updatedCart = cartItems.filter((item) => item.Id !== id);
  setLocalStorage("so-cart", updatedCart);
  renderCartContents();
}

renderCartContents();
*/
