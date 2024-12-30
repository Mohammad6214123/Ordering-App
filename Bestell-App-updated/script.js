const menu = {
  "Small Dishes": [
    { id: 1, name: "Bruschetta", price: 5.5 },
    { id: 2, name: "Garlic Bread", price: 4.0 },
  ],
  "Main Dishes": [
    { id: 3, name: "Margherita Pizza", price: 9.0 },
    { id: 4, name: "Pepperoni Pizza", price: 10.0 },
  ],
  "Desserts": [
    { id: 5, name: "Tiramisu", price: 6.0 },
    { id: 6, name: "Panna Cotta", price: 5.5 },
  ],
};

let cart = [];

const { 
  menuCategoryTemplate, 
  menuItemTemplate, 
  cartItemTemplate, 
  totalDisplayTemplate, 
  cartEmptyMessage 
} = getHTMLTemplates();

function renderMenu() {
  const menuItemsContainer = document.getElementById("menu-items");
  menuItemsContainer.innerHTML = "";
  Object.keys(menu).forEach((category) => {
    renderCategory(menuItemsContainer, category);
  });
  addEventListenersForCartButtons();
}

function renderCategory(menuItemsContainer, category) {
  const categoryDiv = document.createElement("div");
  categoryDiv.className = "menu-category";
  categoryDiv.innerHTML = menuCategoryTemplate(category); 
  menu[category].forEach((item) => {
    renderMenuItem(categoryDiv, item);
  });
  menuItemsContainer.insertAdjacentElement('beforeend', categoryDiv);
}

function renderMenuItem(categoryDiv, item) {
  const menuItem = document.createElement("div");
  menuItem.className = "menu-item";
  menuItem.innerHTML = menuItemTemplate(item); 
  categoryDiv.insertAdjacentElement('beforeend', menuItem);
}

function addEventListenersForCartButtons() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemId = parseInt(event.target.dataset.id);
      addToCart(itemId);
    });
  });
}

function addToCart(itemId) {
  const item = findItemById(itemId);
  if (!item) return;
  const existingCartItem = cart.find((cartItem) => cartItem.id === item.id);
  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  renderCart();
}

function findItemById(itemId) {
  const allItems = Object.values(menu).flat();
  return allItems.find((menuItem) => menuItem.id === itemId);
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = cartEmptyMessage(); 
  } else {
    cart.forEach((cartItem) => {
      renderCartItem(cartItemsContainer, cartItem);
    });
  }
  calculateTotals();
  addCartItemEventListeners();
}

function renderCartItem(cartItemsContainer, cartItem) {
  const cartItemDiv = document.createElement("div");
  cartItemDiv.className = "cart-item";
  cartItemDiv.innerHTML = cartItemTemplate(cartItem); 
  cartItemsContainer.appendChild(cartItemDiv);
}

function addCartItemEventListeners() {
  const handleClick = (selector, action) => {
    document.querySelectorAll(selector).forEach((button) => {
      button.addEventListener("click", (event) => {
        const itemId = parseInt(event.target.dataset.id);
        action(itemId);
      });
    });
  };

  handleClick(".increase", (id) => updateCartItem(id, 1));
  handleClick(".decrease", (id) => updateCartItem(id, -1));
  handleClick(".remove", removeFromCart);
}

function updateCartItem(itemId, change) {
  const cartItem = cart.find((item) => item.id === itemId);
  if (cartItem) {
    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
      removeFromCart(itemId);
    } else {
      renderCart();
    }
  }
}

function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  renderCart();
}

function calculateTotals() {
  const subtotal = calculateSubtotal();
  let deliveryFee = 0;
  if (subtotal > 0) {
    deliveryFee = 5.0;
  }
  const total = subtotal + deliveryFee;
  updateTotalDisplay(subtotal, deliveryFee, total);
}

function calculateSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateTotalDisplay(subtotal, deliveryFee, total) {
  document.getElementById("subtotal").innerText = `€${subtotal.toFixed(2)}`;
  document.getElementById("delivery-fee").innerText = `€${deliveryFee.toFixed(2)}`;
  document.getElementById("total").innerText = `€${total.toFixed(2)}`;
  document.getElementById("cart-total").innerText = `€${total.toFixed(2)}`;
}

function openCart() {
  const cartElement = document.getElementById('cart');
  cartElement.classList.add('open');
}

function closeCart() {
  const cartElement = document.getElementById('cart');
  cartElement.classList.remove('open');
}

function toggleCart() {
  const cartElement = document.getElementById('cart');
  cartElement.classList.toggle('open');
  document.querySelector('.opencart').addEventListener('click', openCart);
}

renderMenu();
renderCart();

function openCart() {
  const cartContainer = document.getElementById('cart');
  if (cartContainer.style.display === 'none') {
    cartContainer.style.display = 'block';
  } else {
    cartContainer.style.display = 'none';
  }
}

function closeCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = 'none';
  }
