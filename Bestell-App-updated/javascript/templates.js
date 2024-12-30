
function getHTMLTemplates() {
  return {
    menuCategoryTemplate: (category) => `
      <div class="menu-category">
        <h3>${category}</h3>
      </div>
    `,
    menuItemTemplate: (item) => `
      <div class="menu-item">
        <p>${item.name} - €${item.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${item.id}">+</button>
      </div>
    `,
    cartItemTemplate: (cartItem) => `
      <div class="cart-item">
        <p>${cartItem.name} (x${cartItem.quantity}) - €${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
        <button class="increase" data-id="${cartItem.id}">+</button>
        <button class="decrease" data-id="${cartItem.id}">-</button>
        <button class="remove" data-id="${cartItem.id}">Remove</button>
      </div>
    `,
    totalDisplayTemplate: (subtotal, deliveryFee, total) => `
      <div>
        <p id="subtotal">€${subtotal.toFixed(2)}</p>
        <p id="delivery-fee">€${deliveryFee.toFixed(2)}</p>
        <p id="total">€${total.toFixed(2)}</p>
        <p id="cart-total">€${total.toFixed(2)}</p>
      </div>
    `,
    cartEmptyMessage: () => `
      <p>Your cart is empty</p>
    `
  };
}
 