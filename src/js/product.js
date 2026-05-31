import { getParam, loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();

function addProductToCart(productItem) {
  // Get existing cart
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  
  // Check if product already exists
  const existingItemIndex = cart.findIndex(item => item.Id === productItem.Id);
  
  if (existingItemIndex !== -1) {
    // Update existing item quantity
    const currentQty = cart[existingItemIndex].quantity || 1;
    cart[existingItemIndex].quantity = currentQty + 1;
    alert("${productItem.Name} quantity updated to ${cart[existingItemIndex].quantity}");
  } else {
    // Add new item
    cart.push({
      ...productItem,
      quantity: 1
    });
    alert("${productItem.Name} added to cart!");
  }
  
  // Save to localStorage
  setLocalStorage("so-cart", cart);
  
  // Optional: Dispatch event to update cart icon
  window.dispatchEvent(new CustomEvent("cart-updated"));
}

async function addToCartHandler(e) {
  const productItem = await dataSource.findProductById(e.target.dataset.id);
  if (productItem) {
    addProductToCart(productItem);
  }
}

// Add event listener with safety check
const addToCartButton = document.getElementById("addToCart");
if (addToCartButton) {
  // Remove existing listener to prevent duplicates
  const newButton = addToCartButton.cloneNode(true);
  addToCartButton.parentNode.replaceChild(newButton, addToCartButton);
  newButton.addEventListener("click", addToCartHandler);
}