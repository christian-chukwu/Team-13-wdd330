import {
  getLocalStorage,
  setLocalStorage,
  updateCartCount
} from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let cartItems = getLocalStorage("so-cart") || [];

    const existingIndex = cartItems.findIndex(
      item => item.Id === this.product.Id
    );

    if (existingIndex !== -1) {
      // Update quantity for existing item
      const currentQty = cartItems[existingIndex].quantity || 1;
      const newQuantity = currentQty + 1;
      cartItems[existingIndex].quantity = newQuantity;
      
      setLocalStorage("so-cart", cartItems);
      
      // Native browser alert for quantity update
      alert(`${this.product.Name} quantity updated to ${newQuantity}`);
    } else {
      // Add new item
      this.product.quantity = 1;
      cartItems.push(this.product);
      
      setLocalStorage("so-cart", cartItems);
      
      // Native browser alert for new item
      alert(`${this.product.Name} added to cart!`);
    }

    updateCartCount();
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("productColor").textContent =
    product.Colors[0].ColorName;

  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}