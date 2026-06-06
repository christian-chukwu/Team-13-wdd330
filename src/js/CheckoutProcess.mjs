import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, alertMessage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key) {
    this.key = key;
    this.services = new ExternalServices("orders");
  }

  getCartItems() {
    return getLocalStorage(this.key) || [];
  }

  calculateSubtotal(items) {
    return items.reduce((sum, item) => sum + item.FinalPrice, 0);
  }

  async checkout() {
    const items = this.getCartItems();

    const order = {
      items: items,
      orderDate: new Date(),
      subtotal: this.calculateSubtotal(items),
    };

    try {
      const result = await this.services.checkout(order);

      localStorage.removeItem(this.key);

      window.location.href = "/checkout/success.html";

      return result;
    } catch (err) {
      console.log(err);

      alertMessage(
        err.message?.message || "Unable to process checkout. Please try again.",
      );
    }
  }
}
