function convertToJson(res) {
  return res.json().then((jsonResponse) => {
    if (res.ok) {
      return jsonResponse;
    } else {
      throw {
        name: "servicesError",
        message: jsonResponse,
      };
    }
  });
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.baseURL = "/json/";
  }

  async getData() {
    const res = await fetch(this.baseURL + this.category + ".json");
    return convertToJson(res);
  }

  async findProductById(id) {
    const data = await this.getData();
    return data.find((item) => item.Id === id);
  }

  async checkout(payload) {
    const res = await fetch(
      "https://wdd330-backend.onrender.com/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    return convertToJson(res);
  }
}