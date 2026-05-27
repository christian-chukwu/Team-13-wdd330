import { getParam, loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

// Modified addProductToCart function with duplicate checking
function addProductToCart(product) {
  // Get existing cart or initialize empty array
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  
  // Check if product already exists in cart
  const existingItem = cart.find(item => item.Id === product.Id);
  
  if (existingItem) {
    // If exists, increment quantity
    existingItem.quantity = (existingItem.quantity || 1) + 1;
    console.log(`Increased ${product.Name} quantity to ${existingItem.quantity}`);
    
    // Optional: Show user feedback
    alert(`${product.Name} quantity updated to ${existingItem.quantity}`);
  } else {
    // If new item, add it with quantity 1
    const newItem = {
      ...product,
      quantity: 1
    };
    cart.push(newItem);
    console.log(`Added ${product.Name} to cart`);
    
    // Optional: Show user feedback
    alert(`${product.Name} added to cart!`);
  }
  
  // Save updated cart back to localStorage
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);