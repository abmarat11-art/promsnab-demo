// Inject shared header + dashboard + cart + footer into every page
function injectShell({ page = '', title = '' } = {}) {
  document.title = (title ? title + ' — ' : '') + 'PromSnab';

  const header = `
  <header class="header">
    <div class="header-inner">
      <div class="logo" title="${t('dash.title')}">
        <div class="logo-icon">PS</div>
        <div>
          <div class="logo-text">PromSnab</div>
          <div class="logo-sub">${t('logo.sub')}</div>
        </div>
      </div>
      <nav class="nav">
        <a class="nav-link" data-page="index.html" href="index.html" onclick="event.preventDefault();nav('index.html')">${t('nav.home')}</a>
        <a class="nav-link" data-page="catalog.html" href="catalog.html" onclick="event.preventDefault();nav('catalog.html')">${t('nav.catalog')}</a>
        <a class="nav-link" data-page="promo.html" href="promo.html" onclick="event.preventDefault();nav('promo.html')">${t('nav.promo')}</a>
        <a class="nav-link" data-page="delivery.html" href="delivery.html" onclick="event.preventDefault();nav('delivery.html')">${t('nav.delivery')}</a>
        <a class="nav-link" data-page="gallery.html" href="gallery.html" onclick="event.preventDefault();nav('gallery.html')">${t('nav.gallery')}</a>
        <a class="nav-link" data-page="articles.html" href="articles.html" onclick="event.preventDefault();nav('articles.html')">${t('nav.articles')}</a>
        <a class="nav-link" data-page="about.html" href="about.html" onclick="event.preventDefault();nav('about.html')">${t('nav.about')}</a>
        <a class="nav-link" data-page="contacts.html" href="contacts.html" onclick="event.preventDefault();nav('contacts.html')">${t('nav.contacts')}</a>
      </nav>
      <div class="header-search">
        <svg id="header-search-btn" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="cursor:pointer">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input id="header-search" placeholder="${t('search.ph')}" autocomplete="off"/>
      </div>
      <div class="header-actions">
        <button class="lang-toggle" id="lang-toggle-btn" onclick="toggleLang()" title="Язык / Til">${currentLang === 'ru' ? 'UZ' : 'RU'}</button>
        <button class="theme-toggle" id="theme-toggle-btn" title="Theme" onclick="toggleTheme()">🌙</button>
        <button class="icon-btn" onclick="openFavs()" title="${t('favs.title')}">
          ♡<span class="badge fav-badge" style="display:none">0</span>
        </button>
        <button class="icon-btn" onclick="openCart()" title="${t('cart.title')}">
          🛒<span class="badge cart-badge" style="display:none">0</span>
        </button>
        <button class="icon-btn" onclick="openCallback()" title="${t('callback.title')}">📞</button>
      </div>
    </div>
  </header>`;

  const dashboard = `
  <div class="dash-overlay" onclick="closeDash()"></div>
  <aside class="dash-panel">
    <div class="dash-header">
      <div>
        <div class="dash-title">${t('dash.title')}</div>
        <div style="font-size:12px;color:var(--text-2);margin-top:2px">${new Date().toLocaleDateString(currentLang === 'uz' ? 'uz-UZ' : 'ru-RU',{day:'numeric',month:'long'})}</div>
      </div>
      <button class="icon-btn" id="dash-close">✕</button>
    </div>
    <div class="dash-body">
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">${t('dash.orders')}</div>
          <div class="kpi-value">24</div>
          <div class="kpi-delta up">↑ +18%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">${t('dash.revenue')}</div>
          <div class="kpi-value">12.4M</div>
          <div class="kpi-delta up">↑ +7.2%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">${t('dash.visitors')}</div>
          <div class="kpi-value">843</div>
          <div class="kpi-delta down">↓ −3%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">${t('dash.inCart')}</div>
          <div class="kpi-value">31</div>
          <div class="kpi-delta up">↑ +5</div>
        </div>
      </div>

      <div>
        <div class="dash-section-title">${t('dash.lastOrders')}</div>
        ${[
          { id:'#3812', name:'Насос Grundfos CM 5-4 × 2 шт.', status:'paid' },
          { id:'#3811', name:'Компрессор Atlas Copco GA 15',   status:'pending' },
          { id:'#3810', name:'Арматура DN200 × 12 шт.',       status:'paid' },
          { id:'#3809', name:'Двигатель Siemens 7.5 кВт',     status:'new' },
          { id:'#3808', name:'Частотник ABB 22кВт × 3 шт.',   status:'pending' },
        ].map(o=>`<div class="dash-order-row">
          <span class="dash-order-id">${o.id}</span>
          <span class="dash-order-name">${o.name}</span>
          <span class="dash-order-status ${o.status}">${t('status.'+o.status)}</span>
        </div>`).join('')}
      </div>

      <div>
        <div class="dash-section-title">${t('dash.topCats')}</div>
        ${[
          ['pumps', 92],['compressors', 78],['valves', 65],['electric', 54],['machines', 31],
        ].map(([id,pct])=>`<div class="bar-row">
          <span class="bar-label">${catNameById(id)}</span>
          <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
          <span class="bar-val">${pct}%</span>
        </div>`).join('')}
      </div>

      <div>
        <div class="dash-section-title">${t('dash.actions')}</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          <button class="btn btn-outline btn-sm" onclick="nav('catalog.html')">${t('dash.btn.catalog')}</button>
          <button class="btn btn-outline btn-sm" onclick="nav('orders.html')">${t('dash.btn.orders')}</button>
          <button class="btn btn-outline btn-sm" onclick="nav('contacts.html')">${t('dash.btn.contacts')}</button>
          <button class="btn btn-outline btn-sm" onclick="closeDash();openCart()">${t('dash.btn.cart')}</button>
        </div>
      </div>
    </div>
  </aside>`;

  const cart = `
  <div class="cart-overlay" id="cart-overlay" onclick="if(event.target===this)closeCart()">
    <aside class="cart-panel">
      <div class="cart-header">
        <div style="font-size:16px;font-weight:700">${t('cart.title')}</div>
        <button class="icon-btn" id="cart-close">✕</button>
      </div>
      <div class="cart-items" id="cart-items"></div>
      <div class="cart-footer">
        <div class="cart-total">
          <span class="cart-total-label">${t('cart.total')}</span>
          <span class="cart-total-price" id="cart-total-price">0 ${t('currency')}</span>
        </div>
        <button class="btn btn-primary w-full" onclick="openCheckout()">${t('cart.checkout')}</button>
      </div>
    </aside>
  </div>`;

  const checkoutModal = `
  <div class="modal-overlay" id="checkout-modal" onclick="if(event.target===this)closeCheckout()">
    <div class="modal-box">
      <div class="modal-header">
        <div class="modal-title">${t('checkout.title')}</div>
        <button class="modal-close icon-btn" onclick="closeCheckout()">✕</button>
      </div>
      <div class="modal-body">
        <form onsubmit="submitOrder(event)">
          <div class="grid-2">
            <div class="form-group"><label class="form-label">${t('checkout.name')}</label><input class="form-control" required placeholder="${t('ph.name')}"></div>
            <div class="form-group"><label class="form-label">${t('checkout.phone')}</label><input class="form-control" required placeholder="+998 XX XXX-XX-XX"></div>
          </div>
          <div class="form-group"><label class="form-label">${t('checkout.email')}</label><input class="form-control" type="email" placeholder="email@example.com"></div>
          <div class="form-group"><label class="form-label">${t('checkout.company')}</label><input class="form-control" placeholder="${t('ph.company')}"></div>
          <div class="form-group"><label class="form-label">${t('checkout.address')}</label><input class="form-control" required placeholder="${t('ph.address')}"></div>
          <div class="form-group"><label class="form-label">${t('checkout.comment')}</label><textarea class="form-control" placeholder="${t('ph.comment')}"></textarea></div>
          <div style="display:flex;gap:12px;margin-top:8px">
            <button type="button" class="btn btn-outline w-full" onclick="closeCheckout()">${t('btn.cancel')}</button>
            <button type="submit" class="btn btn-primary w-full">${t('checkout.submit')}</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;

  const footer = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">
            <div class="logo" onclick="nav('index.html')" style="display:inline-flex">
              <div class="logo-icon">PS</div>
              <div><div class="logo-text">PromSnab</div><div class="logo-sub">${t('logo.sub')}</div></div>
            </div>
          </div>
          <p class="footer-desc">${t('footer.desc')}</p>
          <div class="footer-socials" style="margin-top:16px">
            <div class="social-btn" title="Telegram">✈</div>
            <div class="social-btn" title="WhatsApp">📲</div>
            <div class="social-btn" title="Instagram">📷</div>
            <div class="social-btn" title="YouTube">▶</div>
          </div>
        </div>
        <div>
          <div class="footer-heading">${t('footer.catalog')}</div>
          <div class="footer-links">
            ${CATEGORIES.slice(0,5).map(c=>`<a class="footer-link" onclick="nav('catalog.html?cat=${c.id}')">${catName(c)}</a>`).join('')}
            <a class="footer-link" onclick="nav('catalog.html')">${t('footer.allCats')}</a>
          </div>
        </div>
        <div>
          <div class="footer-heading">${t('footer.company')}</div>
          <div class="footer-links">
            <a class="footer-link" onclick="nav('about.html')">${t('footer.about')}</a>
            <a class="footer-link" onclick="nav('promo.html')">${t('footer.promo')}</a>
            <a class="footer-link" onclick="nav('gallery.html')">${t('footer.gallery')}</a>
            <a class="footer-link" onclick="nav('articles.html')">${t('footer.articles')}</a>
            <a class="footer-link" onclick="nav('delivery.html')">${t('footer.delivery')}</a>
            <a class="footer-link" onclick="nav('documents.html')">${t('footer.docs')}</a>
            <a class="footer-link" onclick="nav('orders.html')">${t('footer.orders')}</a>
          </div>
        </div>
        <div>
          <div class="footer-heading">${t('footer.contacts')}</div>
          <div class="footer-links">
            <a class="footer-link" href="tel:+998712345678">+998 71 234-56-78</a>
            <a class="footer-link" href="mailto:info@promsnab.uz">info@promsnab.uz</a>
            <span class="footer-link" style="cursor:default">г. Ташкент, ул. Катартал 67</span>
            <span class="footer-link" style="cursor:default">${t('footer.schedule')}</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">${t('footer.copy')}</div>
        <div style="display:flex;gap:16px;font-size:13px;color:var(--text-3)">
          <span style="cursor:pointer">${t('footer.privacy')}</span>
          <span style="cursor:pointer">${t('footer.terms')}</span>
        </div>
      </div>
    </div>
  </footer>`;

  const toastContainer = `<div id="toast-container"></div>`;

  const favsPanel = `
  <div class="cart-overlay" id="favs-overlay" onclick="if(event.target===this)closeFavs()">
    <aside class="cart-panel">
      <div class="cart-header">
        <div style="font-size:16px;font-weight:700">${t('favs.title')}</div>
        <button class="icon-btn" onclick="closeFavs()">✕</button>
      </div>
      <div class="cart-items" id="favs-items"></div>
    </aside>
  </div>`;

  const quickViewModal = `
  <div class="modal-overlay" id="quickview-modal" onclick="if(event.target===this)closeQuickView()">
    <div class="modal-box" style="max-width:640px">
      <div class="modal-header">
        <div class="modal-title" id="qv-name"></div>
        <button class="modal-close icon-btn" onclick="closeQuickView()">✕</button>
      </div>
      <div class="modal-body" id="qv-body"></div>
    </div>
  </div>`;

  const callbackModal = `
  <div class="modal-overlay" id="callback-modal" onclick="if(event.target===this)closeCallback()">
    <div class="modal-box" style="max-width:440px">
      <div class="modal-header">
        <div class="modal-title">${t('callback.title')}</div>
        <button class="modal-close icon-btn" onclick="closeCallback()">✕</button>
      </div>
      <div class="modal-body">
        <p style="font-size:14px;color:var(--text-2);margin-bottom:20px">${t('callback.sub')}</p>
        <form onsubmit="submitCallback(event)">
          <div class="form-group"><label class="form-label">${t('callback.name')}</label><input class="form-control" required placeholder="${t('ph.name')}"></div>
          <div class="form-group"><label class="form-label">${t('callback.phone')}</label><input class="form-control" required placeholder="+998 XX XXX-XX-XX"></div>
          <div class="form-group">
            <label class="form-label">${t('callback.time')}</label>
            <select class="form-control">
              <option>9:00 – 12:00</option><option>12:00 – 15:00</option><option>15:00 – 18:00</option>
            </select>
          </div>
          <div style="display:flex;gap:12px;margin-top:8px">
            <button type="button" class="btn btn-outline w-full" onclick="closeCallback()">${t('btn.cancel')}</button>
            <button type="submit" class="btn btn-primary w-full">${t('callback.submit')}</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('afterbegin', header + dashboard + cart + checkoutModal + favsPanel + quickViewModal + callbackModal);
  document.body.insertAdjacentHTML('beforeend', footer + toastContainer);

  // Init theme
  const saved = localStorage.getItem('ps-theme') || 'dark';
  applyTheme(saved);

  // Set lang button label
  if (typeof applyLang === 'function') applyLang(currentLang);

  // Highlight active nav
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    if (a.dataset && a.dataset.page === path) a.classList.add('active');
    if (!a.dataset.page) {
      const href = a.getAttribute('href') || '';
      if (href.includes(path)) a.classList.add('active');
    }
  });

  // Logo click → dashboard
  document.querySelector('.logo')?.addEventListener('click', openDash);
  document.querySelector('.dash-overlay')?.addEventListener('click', closeDash);
  document.getElementById('dash-close')?.addEventListener('click', closeDash);

  // Cart
  document.getElementById('cart-close')?.addEventListener('click', closeCart);

  // Search
  document.getElementById('header-search')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch(e.target.value);
  });
  document.getElementById('header-search-btn')?.addEventListener('click', () => {
    doSearch(document.getElementById('header-search').value);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ps-theme', theme);
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}
