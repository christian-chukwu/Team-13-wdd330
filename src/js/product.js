import { getParam, loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData();
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();

function addProductToCart(productItem) {
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  const existingItemIndex = cart.findIndex(item => item.Id === productItem.Id);
  
  if (existingItemIndex !== -1) {
    const currentQty = cart[existingItemIndex].quantity || 1;
    cart[existingItemIndex].quantity = currentQty + 1;
    alert(`${productItem.Name} quantity updated to ${cart[existingItemIndex].quantity}`);
  } else {
    cart.push({
      ...productItem,
      quantity: 1
    });
    alert(`${productItem.Name} added to cart!`);
  }
  
  setLocalStorage("so-cart", cart);
  window.dispatchEvent(new CustomEvent("cart-updated"));
}

async function addToCartHandler(e) {
  const productItem = await dataSource.findProductById(e.target.dataset.id);
  if (productItem) {
    addProductToCart(productItem);
  }
}

const addToCartButton = document.getElementById("addToCart");
if (addToCartButton) {
  const newButton = addToCartButton.cloneNode(true);
  addToCartButton.parentNode.replaceChild(newButton, addToCartButton);
  newButton.addEventListener("click", addToCartHandler);
}