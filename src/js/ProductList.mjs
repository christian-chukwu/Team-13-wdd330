import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const image =
    product?.Images?.PrimaryMedium ||
    product?.Image ||
    product?.image ||
    "/images/nophoto.png";
  const brand = product?.Brand?.Name || "";
  const name = product?.NameWithoutBrand || "Unnamed product";

  const finalPrice = product?.FinalPrice ?? 0;
  const retailPrice = product?.SuggestedRetailPrice ?? finalPrice;

  const isDiscounted = retailPrice > finalPrice;

  const discountPercent = isDiscounted
    ? Math.round(((retailPrice - finalPrice) / retailPrice) * 100)
    : 0;

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">

      ${
        isDiscounted
          ? `<p class="discount-badge">${discountPercent}% OFF</p>`
          : ""
      }

      <img src="${image}" alt="Image of ${name}">

      <h2 class="card__brand">${brand}</h2>

      <h3 class="card__name">${name}</h3>

      <p class="product-card__price">$${finalPrice}</p>

      ${isDiscounted ? `<p class="original-price">$${retailPrice}</p>` : ""}

    </a>
  </li>`;
}

renderTitle() {
  const titleElement = document.querySelector(".products__title");
  if (titleElement) {
    const formattedCategory = this.category
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    titleElement.textContent = `Top Products: ${formattedCategory}`;
  }
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

async init() {
  const productList = await this.dataSource.getData(this.category);
  this.renderTitle();
  this.renderProductList(productList);
}

  renderList(list) {
    return renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}


