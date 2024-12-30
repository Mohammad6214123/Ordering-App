document.getElementById('checkout-btn').addEventListener('click', () => {
    document.getElementById('cart-items').innerHTML = '<p>Your cart is empty</p>';
    document.getElementById('subtotal').textContent = '€0.00';
    document.getElementById('delivery-fee').textContent = '€0.00';
    document.getElementById('total').textContent = '€0.00';
  
    let msg = document.createElement('div');
    msg.innerHTML = '<p>Thank you for your order! We appreciate your visit!!</p>';
    Object.assign(msg.style, {
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      background: '#fff', padding: '20px', border: '1px solid #000', zIndex: 1000
    });
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  });
  document.getElementById('close-cart').onclick = () => document.getElementById('cart').style.display = 'none';
  