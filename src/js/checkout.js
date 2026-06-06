import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart");

document
  .querySelector("#checkoutSubmit")
  .addEventListener("click", (e) => {
    e.preventDefault();

    const form = document.querySelector("#checkoutForm");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    checkout.checkout();
  });