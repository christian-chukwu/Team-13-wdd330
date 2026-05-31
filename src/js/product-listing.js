import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Load header and footer
loadHeaderFooter();

// Get the category from the URL parameter
const category = getParam("category");

// If no category is specified, default to "tents"
const activeCategory = category || "tents";

// Create data source (no category parameter needed anymore)
const dataSource = new ProductData();

// Get the container element
const listElement = document.querySelector(".product-list");

// Create and initialize the product list
const productList = new ProductList(activeCategory, dataSource, listElement);
productList.init();