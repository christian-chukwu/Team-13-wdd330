import { getLocalStorage, setLocalStorage, renderListWithTemplate, updateCartCount } from './utils.mjs';

function cartItemTemplate(item) {
  const quantity = item.quantity || 1;
  const totalPrice = (item.FinalPrice * quantity).toFixed(2);
  
  return `<li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <div class="cart-card__price">$${item.FinalPrice}</div>
    <div class="cart-card__total">$${totalPrice}</div>
    <button class="remove-cart-item cart-card__remove" data-id="${item.Id}" aria-label="Remove from cart">✕</button>
  </li>`;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.cartItems = [];
  }

  getCartItems() {
    // Get cart from localStorage
    const cart = getLocalStorage('so-cart') || [];
    // Combine duplicate items
    return this.combineDuplicateItems(cart);
  }

  combineDuplicateItems(cartItems) {
    const combinedMap = new Map();
    
    cartItems.forEach(item => {
      const existing = combinedMap.get(item.Id);
      if (existing) {
        // Combine quantities
        existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
      } else {
        // Add new item with quantity
        combinedMap.set(item.Id, {
          ...item,
          quantity: item.quantity || 1
        });
      }
    });
    
    return Array.from(combinedMap.values());
  }

  renderCart() {
    // Get fresh cart items and combine duplicates
    this.cartItems = this.getCartItems();
    
    if (this.cartItems.length === 0) {
      this.listElement.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      const totalElement = document.querySelector('.cart-total');
      if (totalElement) totalElement.innerHTML = '';
      return;
    }
    
    // Render the cart
    this.listElement.innerHTML = '';
    renderListWithTemplate(cartItemTemplate, this.listElement, this.cartItems);
    
    // Add event listeners
    this.addRemoveButtons();
    this.updateCartTotal();
  }

  addRemoveButtons() {
    // Remove existing listener to avoid duplicates
    if (this.removeHandler) {
      this.listElement.removeEventListener('click', this.removeHandler);
    }
    
    this.removeHandler = (e) => {
      const removeButton = e.target.closest('.remove-cart-item');
      if (removeButton) {
        const idToRemove = removeButton.getAttribute('data-id');
        this.removeCartItem(idToRemove);
      }
    };
    
    this.listElement.addEventListener('click', this.removeHandler);
  }

  removeCartItem(id) {
    // Get current cart
    let cart = getLocalStorage('so-cart') || [];
    // Filter out the item to remove
    cart = cart.filter((item) => item.Id !== id);
    // Save back to localStorage
    setLocalStorage('so-cart', cart);
    // Re-render the cart
    this.renderCart();
    updateCartCount();
  }

  updateCartTotal() {
    const total = this.cartItems.reduce((sum, item) => {
      const itemTotal = item.FinalPrice * (item.quantity || 1);
      return sum + itemTotal;
    }, 0);
    
    // Create or update total element
    let totalElement = document.querySelector('.cart-total');
    
    if (!totalElement) {
      // Create total element if it doesn't exist
      totalElement = document.createElement('div');
      totalElement.className = 'cart-total';
      const cartFooter = document.querySelector('.cart-footer') || this.listElement.parentNode;
      cartFooter.appendChild(totalElement);
    }
    
    totalElement.innerHTML = `
      <div class="cart-total-content">
        <h3>Cart Total</h3>
        <p class="total-amount">$${total.toFixed(2)}</p>
      </div>
    `;
  }

  init() {
    this.renderCart();
  }
}