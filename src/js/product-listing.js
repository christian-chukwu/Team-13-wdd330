import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const productData = new ExternalServices("tents");
const listElement = document.querySelector(".product-list");

async function initProductList() {
  const productList = new ProductList("tents", productData, listElement);
  await productList.init();
}

initProductList();
