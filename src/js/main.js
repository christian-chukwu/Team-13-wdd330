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
