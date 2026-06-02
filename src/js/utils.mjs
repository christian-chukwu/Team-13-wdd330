// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem(key));
  if (key === 'so-cart') {
    return Array.isArray(data) ? data : [];
  }
  return data;
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('product');
  return product;
}


export function renderListWithTemplate( templateFn,  parentElement,  list,  position = 'afterbegin', clear = false) {
  const htmlString = list.map(templateFn);
  if (clear) parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML(position, htmlString.join(''));
  return parentElement;
}



export function renderWithTemplate( template,  parentElement,  data,  callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  updateCartCount();

}

export function alertMessage(
  message,
  scroll = true,
  duration = 3000,
  type = "success"
) {
  const existing = document.querySelector(".alert-message");

  if (existing) {
    existing.remove();
  }

  const alert = document.createElement("div");
  alert.className = `alert-message ${type}`;
  alert.textContent = message;

  document.body.prepend(alert);

  if (scroll) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  setTimeout(() => {
    alert.remove();
  }, duration);
}

// superscript for the cart count logic
export function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];

  const badge = document.querySelector(".cart-count");

  if (!badge) return;

  if (cart.length > 0) {
    badge.textContent = cart.length;
    badge.style.display = "inline-block";
  } else {
    badge.style.display = "none";
  }
}