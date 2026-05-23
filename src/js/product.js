import { setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productID = getParam('product');
const dataSource = new ProductData("tents");
const productId = getParam("product");

//console.log(productId);
//console.log(dataSource.findProductById(productId));

const product = new ProductDetails(productId, dataSource);
product.init();


/*function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}*/
// individual w01 - add product to cart
/*
Imported getLocalStorage and setLocalStorage functions from utils.mjs. 
Created addProductToCart function that retrieves the current cart from local storage, adds the new product to it, and then saves it back to local storage. Implemented addToCartHandler function that fetches the product details using its ID and calls addProductToCart to update the cart. Finally, added an event listener to the "Add to Cart" button to trigger the handler when clicked.
*/
/*
function addProductToCart(product) {
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  cart.push(product);
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
*/
