import { getLocalStorage, setLocalStorage, renderListWithTemplate } from './utils.mjs';

function cartItemTemplate(item) {
  const quantity = item.quantity || 1;
  const subtotal = (item.FinalPrice * quantity).toFixed(2);
  
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <div class="cart-card_price">$${item.FinalPrice}</div>
    <div class="cart-card_subtotal">$${subtotal}</div>
    <button class="remove-cart-item cart-card__remove" id="${item.Id}" aria-label="Remove from cart">✕</button>
  </li>`;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.cartItems = this.getCartItems();
  }

  getCartItems() {
    return getLocalStorage('so-cart') || [];
  }

  renderCart() {
    this.listElement.innerHTML = '';
    renderListWithTemplate(cartItemTemplate, this.listElement, this.cartItems);
    this.addRemoveButtons();
    this.updateCartTotal(); // Optional: Show total price
  }

  addRemoveButtons() {
    this.listElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-cart-item')) {
        const idToRemove = e.target.getAttribute('id');
        this.removeCartItem(idToRemove);
      }
    });
  }

  removeCartItem(id) {
    // Find the item in cart
    const existingItem = this.cartItems.find((item) => item.Id === id);
    
    if (existingItem && existingItem.quantity > 1) {
      // If quantity > 1, just decrement it
      existingItem.quantity -= 1;
      setLocalStorage('so-cart', this.cartItems);
    } else {
      // If quantity is 1 or undefined, remove the item completely
      this.cartItems = this.cartItems.filter((item) => item.Id !== id);
      setLocalStorage('so-cart', this.cartItems);
    }
    
    // Re-render the cart
    this.renderCart();
  }

  // Optional: Calculate and display cart total
  updateCartTotal() {
    const total = this.cartItems.reduce((sum, item) => {
      const quantity = item.quantity || 1;
      return sum + (item.FinalPrice * quantity);
    }, 0);
    
    const totalElement = document.querySelector('.cart-total');
    if (totalElement) {
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  }

  // Optional: Update cart count badge in header
  updateCartBadge() {
    const totalItems = this.cartItems.reduce((sum, item) => {
      return sum + (item.quantity || 1);
    }, 0);
    
    const badge = document.querySelector('.cart-count');
    if (badge) {
      badge.textContent = totalItems;
    }
  }

  init() {
    this.renderCart();
  }
}