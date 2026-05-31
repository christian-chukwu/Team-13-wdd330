import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const productData = new ProductData("tents");
const listElement = document.querySelector(".product-list");

async function initProductList() {
  await productData.getData(); 
  const productList = new ProductList("Tents", productData, listElement);
  productList.init();
}

initProductList();
