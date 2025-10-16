// Load image configuration from HTML
const imageConfig = JSON.parse(document.getElementById('imageConfig').textContent);


// Apply hero background immediately
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (hero && imageConfig.hero) {
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${imageConfig.hero}')`;
  }

  // Apply highlight images
  if (imageConfig.highlights) {
    const mushrooms = document.getElementById('highlight-mushrooms');
    const wine = document.getElementById('highlight-wine');
    const dessert = document.getElementById('highlight-dessert');

    if (mushrooms && imageConfig.highlights.mushrooms) {
      mushrooms.style.backgroundImage = `url('${imageConfig.highlights.mushrooms}')`;
    }
    if (wine && imageConfig.highlights.wine) {
      wine.style.backgroundImage = `url('${imageConfig.highlights.wine}')`;
    }
    if (dessert && imageConfig.highlights.dessert) {
      dessert.style.backgroundImage = `url('${imageConfig.highlights.dessert}')`;
    }
  }

  // Set minimum date for reservations (today)
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('resDate').setAttribute('min', today);
});

// Icon-based theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

(function initTheme() {
  const saved = localStorage.getItem('gh-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon();
})();

function updateThemeIcon() {
  const isNight = (document.documentElement.getAttribute('data-theme') || 'day') === 'night';
  themeIcon.textContent = isNight ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', isNight ? 'Switch to day theme' : 'Switch to night theme');
  themeToggle.setAttribute('title', isNight ? 'Day mode' : 'Night mode');
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'day';
  const next = current === 'day' ? 'night' : 'day';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('gh-theme', next);
  updateThemeIcon();
});


// Responsive nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// Back to top & year
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Newsletter demo
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterStatus = document.getElementById('newsletterStatus');
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!newsletterEmail.checkValidity()) return newsletterEmail.reportValidity();
  localStorage.setItem('newsletter-email', newsletterEmail.value.trim());
  newsletterStatus.textContent = 'Subscribed! Check your inbox.';
  newsletterForm.reset();
  setTimeout(() => (newsletterStatus.textContent = ''), 3000);
});

// Menu data (6 items per category)
const MENU = {
  starters: [
    { id: 'st1', name: 'Truffle Arancini', desc: 'Crispy risotto, black truffle, parmesan', price: 16 },
    { id: 'st2', name: 'Burrata Caprese', desc: 'Burrata, heirloom tomatoes, basil', price: 18 },
    { id: 'st3', name: 'Beef Carpaccio', desc: 'Wagyu, arugula, capers', price: 20 },
    { id: 'st4', name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter', price: 24 },
    { id: 'st5', name: 'Wild Prawn Cocktail', desc: 'Herb aioli, citrus, dill', price: 17 },
    { id: 'st6', name: 'Roasted Beet Salad', desc: 'Goat cheese, pistachio, orange', price: 14 },
  ],
  mains: [
    { id: 'm1', name: 'Thieboudienne', desc: 'Rice, Fish, Vegetables', price: 65 },
    { id: 'm2', name: 'Attieke, Alloco, braised fish', desc: 'Casava, Banana, Fish', price: 28 },
    { id: 'm3', name: 'Foutou Igname', desc: 'Yam, Tomato sauce, Meat', price: 32 },
    { id: 'm4', name: 'Duck Confit', desc: 'Cherry gastrique, potato rösti', price: 38 },
    { id: 'm5', name: 'Lamb Rack', desc: 'Ratatouille, mint gremolata', price: 42 },
    { id: 'm6', name: 'Porcini Risotto', desc: 'Aged parmesan, thyme', price: 26 },
  ],
  desserts: [
    { id: 'd1', name: 'Chocolate Lava Cake', desc: 'Molten center, vanilla gelato', price: 12 },
    { id: 'd2', name: 'Crème Brûlée', desc: 'Madagascar vanilla custard', price: 11 },
    { id: 'd3', name: 'Lemon Tart', desc: 'Toasted meringue, basil', price: 10 },
    { id: 'd4', name: 'Tiramisu', desc: 'Espresso, mascarpone', price: 10 },
    { id: 'd5', name: 'Pistachio Panna Cotta', desc: 'Citrus compote', price: 11 },
    { id: 'd6', name: 'Cheese Plate', desc: 'Artisanal selection, honey', price: 15 },
  ],
  wine: [
    { id: 'w1', name: 'Chardonnay', desc: 'Burgundy, FR', price: 12 },
    { id: 'w2', name: 'Sauvignon Blanc', desc: 'Marlborough, NZ', price: 11 },
    { id: 'w3', name: 'Pinot Noir', desc: 'Willamette, US', price: 13 },
    { id: 'w4', name: 'Cabernet Sauvignon', desc: 'Napa, US', price: 15 },
    { id: 'w5', name: 'Chianti Classico', desc: 'Tuscany, IT', price: 12 },
    { id: 'w6', name: 'Cava Brut', desc: 'Penedès, ES', price: 10 },
  ],
};

// Tabs and rendering with images from HTML config
const menuGrid = document.getElementById('menuGrid');
const tabs = [...document.querySelectorAll('.tab')];
function renderCategory(cat) {
  const items = MENU[cat] || [];
  menuGrid.innerHTML = items.map(item => {
    const imageUrl = imageConfig.menu && imageConfig.menu[item.id] || '';
    return `
    <article class="card" data-id="${item.id}">
      <div class="menu-image" style="background-image: url('${imageUrl}')"></div>
      <div class="card-body">
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.desc}</p>
        <div class="card-row">
          <span class="price">$${item.price.toFixed(2)}</span>
          <div class="qty" data-id="${item.id}">
            <button class="icon-btn minus" aria-label="Decrease">−</button>
            <span class="qv" data-qv="${item.id}">1</span>
            <button class="icon-btn plus" aria-label="Increase">+</button>
            <button class="btn btn-primary add" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add</button>
          </div>
        </div>
      </div>
    </article>
  `;}).join('');
}

tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.classList.remove('active'));
  t.classList.add('active');
  renderCategory(t.dataset.category);
}));
// Initial render
renderCategory('starters');

// Quantity handlers via delegation
menuGrid.addEventListener('click', (e) => {
  const plus = e.target.closest('.plus');
  const minus = e.target.closest('.minus');
  const add = e.target.closest('.add');

  if (plus || minus) {
    const wrap = e.target.closest('.qty');
    const id = wrap?.dataset.id;
    const v = document.querySelector(`[data-qv="${id}"]`);
    let qty = parseInt(v.textContent, 10) || 1;
    qty = plus ? qty + 1 : Math.max(1, qty - 1);
    v.textContent = qty;
  }

  if (add) {
    const id = add.dataset.id;
    const name = add.dataset.name;
    const price = Number(add.dataset.price);
    const qty = parseInt(document.querySelector(`[data-qv="${id}"]`)?.textContent || '1', 10);
    addToCart({ id, name, price, qty });
  }
});

// Cart state
const cart = [];
const cartEl = document.getElementById('cart');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartOpen = document.getElementById('cartOpen');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const clearCartBtn = document.getElementById('clearCart');

function openCart() {
  cartEl.classList.add('open');
  cartBackdrop.classList.add('show');
}
function closeCart() {
  cartEl.classList.remove('open');
  cartBackdrop.classList.remove('show');
}
cartOpen.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);

function addToCart(item) {
  const existing = cart.find(x => x.id === item.id);
  if (existing) existing.qty += item.qty;
  else cart.push({ ...item });
  renderCart();
}

function updateQty(id, delta) {
  const it = cart.find(x => x.id === id);
  if (!it) return;
  it.qty = Math.max(1, it.qty + delta);
  renderCart();
}

function removeItem(id) {
  const i = cart.findIndex(x => x.id === id);
  if (i >= 0) cart.splice(i, 1);
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = cart.map(it => `
    <div class="cart-item">
      <div>
        <div><strong>${it.name}</strong></div>
        <div style="color: var(--muted); font-size: 14px;">$${it.price.toFixed(2)} × ${it.qty} = $${(it.price * it.qty).toFixed(2)}</div>
      </div>
      <div style="display: flex; gap: 4px;">
        <button class="icon-btn" data-action="dec" data-id="${it.id}">−</button>
        <button class="icon-btn" data-action="inc" data-id="${it.id}">+</button>
        <button class="icon-btn" data-action="rem" data-id="${it.id}">✕</button>
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
  cartCount.textContent = cart.reduce((s, it) => s + it.qty, 0);
}

cartItems.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const id = btn.dataset.id;
  const action = btn.dataset.action;
  if (action === 'inc') updateQty(id, +1);
  if (action === 'dec') updateQty(id, -1);
  if (action === 'rem') removeItem(id);
});

clearCartBtn.addEventListener('click', () => { 
  cart.length = 0; 
  renderCart(); 
});

// Checkout / Receipt
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutClose = document.getElementById('checkoutClose');
const checkoutForm = document.getElementById('checkoutForm');

const receiptModal = document.getElementById('receiptModal');
const receiptClose = document.getElementById('receiptClose');
const receiptBody = document.getElementById('receiptBody');
const printReceiptBtn = document.getElementById('printReceipt');
const newOrderBtn = document.getElementById('newOrder');

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) { 
    alert('Your cart is empty.'); 
    return; 
  }
  checkoutModal.showModal();
});

checkoutClose.addEventListener('click', (e) => { 
  e.preventDefault(); 
  checkoutModal.close(); 
});

checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('coName').value.trim();
  const email = document.getElementById('coEmail').value.trim();
  const phone = document.getElementById('coPhone').value.trim();

  if (!name || !email || !phone) return;

  const orderNo = 'GH-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const lines = cart.map(it => 
    `<li>${it.qty} × ${it.name} — $${(it.price * it.qty).toFixed(2)}</li>`
  ).join('');

  receiptBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 16px;">
      <h4 style="margin: 0; color: var(--primary);">Gourmet Haven</h4>
      <p style="margin: 4px 0 0; font-size: 14px; color: var(--muted);">123 Culinary Street, Food City</p>
    </div>
    <hr style="border: none; border-top: 1px dashed var(--outline); margin: 16px 0;">
    <p><strong>Order #</strong> ${orderNo}</p>
    <p><strong>Name:</strong> ${name}<br/>
    <strong>Email:</strong> ${email}<br/>
    <strong>Phone:</strong> ${phone}</p>
    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
    <hr style="border: none; border-top: 1px dashed var(--outline); margin: 16px 0;">
    <ul style="list-style: none; padding: 0;">${lines}</ul>
    <hr style="border: none; border-top: 1px dashed var(--outline); margin: 16px 0;">
    <div style="text-align: right;">
      <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
      <p><strong>Tax (8%):</strong> $${tax.toFixed(2)}</p>
      <p style="font-size: 18px; color: var(--primary);"><strong>Total: $${total.toFixed(2)}</strong></p>
    </div>
    <hr style="border: none; border-top: 1px dashed var(--outline); margin: 16px 0;">
    <p style="text-align: center; color: var(--muted); font-size: 14px;">
      Thank you for your order!<br/>
      We'll prepare it with care.
    </p>
  `;

  checkoutModal.close();
  receiptModal.showModal();
});

receiptClose.addEventListener('click', () => receiptModal.close());
printReceiptBtn.addEventListener('click', () => window.print());
newOrderBtn.addEventListener('click', () => {
  cart.length = 0; 
  renderCart(); 
  receiptModal.close();
});

// Reservations
const reservationForm = document.getElementById('reservationForm');
const reservationStatus = document.getElementById('reservationStatus');
reservationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!reservationForm.checkValidity()) return reservationForm.reportValidity();

  const ref = 'RSV-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  reservationStatus.textContent = `✅ Reservation confirmed! Reference: ${ref}`;
  reservationStatus.style.color = 'var(--success)';
  setTimeout(() => {
    reservationStatus.textContent = '';
    reservationStatus.style.color = '';
  }, 5000);
  reservationForm.reset();
});

// Smooth internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('open');
    }
  });
});

