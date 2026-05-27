function convertToJson(res) {
  if (res.ok) return res.json();
  throw new Error("Bad Response");
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${category}.json`;
  }

  async getData() {
    const res = await fetch(this.path);
    return convertToJson(res);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}