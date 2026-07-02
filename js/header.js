// Inject shared header + dashboard + cart + footer into every page
function injectShell({ page = '', title = '' } = {}) {
  document.title = (title ? title + ' — ' : '') + 'PromSnab | Промышленное оборудование';

  const header = `
  <header class="header">
    <div class="header-inner">
      <div class="logo" title="Открыть панель управления">
        <div class="logo-icon">PS</div>
        <div>
          <div class="logo-text">PromSnab</div>
          <div class="logo-sub">Ташкент · с 2008</div>
        </div>
      </div>
      <nav class="nav">
        <a class="nav-link" data-page="index.html" href="index.html" onclick="event.preventDefault();nav('index.html')" data-i18n="nav.home">Главная</a>
        <a class="nav-link" data-page="catalog.html" href="catalog.html" onclick="event.preventDefault();nav('catalog.html')" data-i18n="nav.catalog">Каталог</a>
        <a class="nav-link" data-page="promo.html" href="promo.html" onclick="event.preventDefault();nav('promo.html')" data-i18n="nav.promo">Акции</a>
        <a class="nav-link" data-page="delivery.html" href="delivery.html" onclick="event.preventDefault();nav('delivery.html')" data-i18n="nav.delivery">Доставка</a>
        <a class="nav-link" data-page="gallery.html" href="gallery.html" onclick="event.preventDefault();nav('gallery.html')" data-i18n="nav.gallery">Галерея</a>
        <a class="nav-link" data-page="articles.html" href="articles.html" onclick="event.preventDefault();nav('articles.html')" data-i18n="nav.articles">Статьи</a>
        <a class="nav-link" data-page="about.html" href="about.html" onclick="event.preventDefault();nav('about.html')" data-i18n="nav.about">О компании</a>
        <a class="nav-link" data-page="contacts.html" href="contacts.html" onclick="event.preventDefault();nav('contacts.html')" data-i18n="nav.contacts">Контакты</a>
      </nav>
      <div class="header-search">
        <svg id="header-search-btn" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="cursor:pointer">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input id="header-search" placeholder="Поиск товаров..." autocomplete="off"/>
      </div>
      <div class="header-actions">
        <button class="lang-toggle" id="lang-toggle-btn" onclick="toggleLang()" title="Язык / Til">RU</button>
        <button class="theme-toggle" id="theme-toggle-btn" title="Переключить тему" onclick="toggleTheme()">🌙</button>
        <button class="icon-btn" onclick="openFavs()" title="Избранное">
          ♡<span class="badge fav-badge" style="display:none">0</span>
        </button>
        <button class="icon-btn" onclick="openCart()" title="Корзина">
          🛒<span class="badge cart-badge" style="display:none">0</span>
        </button>
        <button class="icon-btn" onclick="openCallback()" title="Обратный звонок">📞</button>
      </div>
    </div>
  </header>`;

  const dashboard = `
  <div class="dash-overlay" onclick="closeDash()"></div>
  <aside class="dash-panel">
    <div class="dash-header">
      <div>
        <div class="dash-title">Панель управления</div>
        <div style="font-size:12px;color:var(--text-2);margin-top:2px">Сегодня, ${new Date().toLocaleDateString('ru-RU',{day:'numeric',month:'long'})}</div>
      </div>
      <button class="icon-btn" id="dash-close">✕</button>
    </div>
    <div class="dash-body">
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Заказов сегодня</div>
          <div class="kpi-value">24</div>
          <div class="kpi-delta up">↑ +18% к вчера</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Выручка (сум)</div>
          <div class="kpi-value">12.4M</div>
          <div class="kpi-delta up">↑ +7.2%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Посетителей</div>
          <div class="kpi-value">843</div>
          <div class="kpi-delta down">↓ −3% к вчера</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">В корзинах</div>
          <div class="kpi-value">31</div>
          <div class="kpi-delta up">↑ +5</div>
        </div>
      </div>

      <div>
        <div class="dash-section-title">Последние заказы</div>
        ${[
          { id:'#3812', name:'Насос Grundfos CM 5-4 × 2 шт.', status:'paid', label:'Оплачен' },
          { id:'#3811', name:'Компрессор Atlas Copco GA 15',   status:'pending', label:'В обработке' },
          { id:'#3810', name:'Арматура DN200 × 12 шт.',       status:'paid', label:'Оплачен' },
          { id:'#3809', name:'Двигатель Siemens 7.5 кВт',     status:'new', label:'Новый' },
          { id:'#3808', name:'Частотник ABB 22кВт × 3 шт.',   status:'pending', label:'В обработке' },
        ].map(o=>`<div class="dash-order-row">
          <span class="dash-order-id">${o.id}</span>
          <span class="dash-order-name">${o.name}</span>
          <span class="dash-order-status ${o.status}">${o.label}</span>
        </div>`).join('')}
      </div>

      <div>
        <div class="dash-section-title">Популярные категории</div>
        ${[
          ['Насосы', 92],['Компрессоры', 78],['Арматура', 65],
          ['Электрооборудование', 54],['Станки', 31],
        ].map(([label,pct])=>`<div class="bar-row">
          <span class="bar-label">${label}</span>
          <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
          <span class="bar-val">${pct}%</span>
        </div>`).join('')}
      </div>

      <div>
        <div class="dash-section-title">Быстрые действия</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          <button class="btn btn-outline btn-sm" onclick="nav('catalog.html')">📦 Каталог</button>
          <button class="btn btn-outline btn-sm" onclick="nav('orders.html')">📋 Заказы</button>
          <button class="btn btn-outline btn-sm" onclick="nav('contacts.html')">📞 Контакты</button>
          <button class="btn btn-outline btn-sm" onclick="closeDash();openCart()">🛒 Корзина</button>
        </div>
      </div>
    </div>
  </aside>`;

  const cart = `
  <div class="cart-overlay" id="cart-overlay" onclick="if(event.target===this)closeCart()">
    <aside class="cart-panel">
      <div class="cart-header">
        <div style="font-size:16px;font-weight:700">Корзина</div>
        <button class="icon-btn" id="cart-close">✕</button>
      </div>
      <div class="cart-items" id="cart-items"></div>
      <div class="cart-footer">
        <div class="cart-total">
          <span class="cart-total-label">Итого:</span>
          <span class="cart-total-price" id="cart-total-price">0 сум</span>
        </div>
        <button class="btn btn-primary w-full" onclick="openCheckout()">Оформить заказ →</button>
      </div>
    </aside>
  </div>`;

  const checkoutModal = `
  <div class="modal-overlay" id="checkout-modal" onclick="if(event.target===this)closeCheckout()">
    <div class="modal-box">
      <div class="modal-header">
        <div class="modal-title">Оформление заказа</div>
        <button class="modal-close icon-btn" onclick="closeCheckout()">✕</button>
      </div>
      <div class="modal-body">
        <form onsubmit="submitOrder(event)">
          <div class="grid-2">
            <div class="form-group"><label class="form-label">Имя *</label><input class="form-control" required placeholder="Ваше имя"></div>
            <div class="form-group"><label class="form-label">Телефон *</label><input class="form-control" required placeholder="+998 XX XXX-XX-XX"></div>
          </div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-control" type="email" placeholder="email@example.com"></div>
          <div class="form-group"><label class="form-label">Компания</label><input class="form-control" placeholder="Название организации"></div>
          <div class="form-group"><label class="form-label">Адрес доставки *</label><input class="form-control" required placeholder="г. Ташкент, ул. ..."></div>
          <div class="form-group"><label class="form-label">Комментарий</label><textarea class="form-control" placeholder="Дополнительные пожелания..."></textarea></div>
          <div style="display:flex;gap:12px;margin-top:8px">
            <button type="button" class="btn btn-outline w-full" onclick="closeCheckout()">Отмена</button>
            <button type="submit" class="btn btn-primary w-full">Подтвердить заказ →</button>
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
              <div><div class="logo-text">PromSnab</div><div class="logo-sub">Ташкент · с 2008</div></div>
            </div>
          </div>
          <p class="footer-desc">Надёжный поставщик промышленного оборудования в Узбекистане. Более 5000 позиций в наличии, официальные дистрибьюторы Grundfos, Atlas Copco, Siemens, ABB, Danfoss.</p>
          <div class="footer-socials" style="margin-top:16px">
            <div class="social-btn" title="Telegram">✈</div>
            <div class="social-btn" title="WhatsApp">📲</div>
            <div class="social-btn" title="Instagram">📷</div>
            <div class="social-btn" title="YouTube">▶</div>
          </div>
        </div>
        <div>
          <div class="footer-heading">Каталог</div>
          <div class="footer-links">
            ${CATEGORIES.slice(0,5).map(c=>`<a class="footer-link" onclick="nav('catalog.html?cat=${c.id}')">${c.name}</a>`).join('')}
            <a class="footer-link" onclick="nav('catalog.html')">Все разделы →</a>
          </div>
        </div>
        <div>
          <div class="footer-heading">Компания</div>
          <div class="footer-links">
            <a class="footer-link" onclick="nav('about.html')">О компании</a>
            <a class="footer-link" onclick="nav('promo.html')">Акции</a>
            <a class="footer-link" onclick="nav('gallery.html')">Фотогалерея</a>
            <a class="footer-link" onclick="nav('articles.html')">Статьи</a>
            <a class="footer-link" onclick="nav('delivery.html')">Оплата и доставка</a>
            <a class="footer-link" onclick="nav('documents.html')">Документы</a>
            <a class="footer-link" onclick="nav('orders.html')">Отслеживание заказа</a>
          </div>
        </div>
        <div>
          <div class="footer-heading">Контакты</div>
          <div class="footer-links">
            <a class="footer-link" href="tel:+998712345678">+998 71 234-56-78</a>
            <a class="footer-link" href="mailto:info@promsnab.uz">info@promsnab.uz</a>
            <span class="footer-link" style="cursor:default">г. Ташкент, ул. Катартал 67</span>
            <span class="footer-link" style="cursor:default">Пн–Пт: 9:00 – 18:00</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">© 2008–2026 PromSnab. Все права защищены.</div>
        <div style="display:flex;gap:16px;font-size:13px;color:var(--text-3)">
          <span style="cursor:pointer;hover:color:var(--text-2)">Политика конфиденциальности</span>
          <span style="cursor:pointer">Условия использования</span>
        </div>
      </div>
    </div>
  </footer>`;

  const toastContainer = `<div id="toast-container"></div>`;

  const favsPanel = `
  <div class="cart-overlay" id="favs-overlay" onclick="if(event.target===this)closeFavs()">
    <aside class="cart-panel">
      <div class="cart-header">
        <div style="font-size:16px;font-weight:700" data-i18n="favs.title">Избранное</div>
        <button class="icon-btn" onclick="closeFavs()">✕</button>
      </div>
      <div class="cart-items" id="favs-items"></div>
    </aside>
  </div>`;

  const quickViewModal = `
  <div class="modal-overlay" id="quickview-modal" onclick="if(event.target===this)closeQuickView()">
    <div class="modal-box" style="max-width:640px">
      <div class="modal-header">
        <div class="modal-title" id="qv-name">Товар</div>
        <button class="modal-close icon-btn" onclick="closeQuickView()">✕</button>
      </div>
      <div class="modal-body" id="qv-body"></div>
    </div>
  </div>`;

  const callbackModal = `
  <div class="modal-overlay" id="callback-modal" onclick="if(event.target===this)closeCallback()">
    <div class="modal-box" style="max-width:440px">
      <div class="modal-header">
        <div class="modal-title" data-i18n="callback.title">Обратный звонок</div>
        <button class="modal-close icon-btn" onclick="closeCallback()">✕</button>
      </div>
      <div class="modal-body">
        <p style="font-size:14px;color:var(--text-2);margin-bottom:20px" data-i18n="callback.sub">Оставьте номер — менеджер перезвонит в течение 15 минут</p>
        <form onsubmit="submitCallback(event)">
          <div class="form-group"><label class="form-label" data-i18n="callback.name">Имя</label><input class="form-control" required placeholder="Ваше имя"></div>
          <div class="form-group"><label class="form-label" data-i18n="callback.phone">Телефон *</label><input class="form-control" required placeholder="+998 XX XXX-XX-XX"></div>
          <div class="form-group">
            <label class="form-label" data-i18n="callback.time">Удобное время</label>
            <select class="form-control">
              <option>9:00 – 12:00</option><option>12:00 – 15:00</option><option>15:00 – 18:00</option>
            </select>
          </div>
          <div style="display:flex;gap:12px;margin-top:8px">
            <button type="button" class="btn btn-outline w-full" onclick="closeCallback()" data-i18n="btn.cancel">Отмена</button>
            <button type="submit" class="btn btn-primary w-full" data-i18n="callback.submit">Перезвоните мне →</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;

  // Inject before body close
  document.body.insertAdjacentHTML('afterbegin', header + dashboard + cart + checkoutModal + favsPanel + quickViewModal + callbackModal);
  document.body.insertAdjacentHTML('beforeend', footer + toastContainer);

  // Init theme from saved preference
  const saved = localStorage.getItem('ps-theme') || 'dark';
  applyTheme(saved);

  // Init language
  const savedLang = localStorage.getItem('ps-lang') || 'ru';
  if (typeof applyLang === 'function') applyLang(savedLang);
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
