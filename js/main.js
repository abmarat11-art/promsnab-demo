// ─── DATA ───────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id:1,  name:'Насос Grundfos CM 5-4', sku:'GF-CM54-001', category:'pumps',    brand:'Grundfos',    price:185000, old:210000, emoji:'💧', rating:4.8, reviews:23, badge:'hit',  desc:'Многоступенчатый центробежный насос для водоснабжения и повышения давления. Производительность 5 м³/ч, напор 40 м.' },
  { id:2,  name:'Компрессор Atlas Copco GA 15', sku:'AC-GA15-002', category:'compressors', brand:'Atlas Copco', price:420000, old:null,   emoji:'🔧', rating:4.9, reviews:15, badge:'new',  desc:'Винтовой воздушный компрессор. Производительность 1800 л/мин, давление 8 бар.' },
  { id:3,  name:'Задвижка DN 200 ALSO', sku:'AL-ZAD200-003', category:'valves',  brand:'ALSO',        price:28500,  old:32000,  emoji:'🔩', rating:4.5, reviews:41, badge:'sale', desc:'Клиновая задвижка фланцевая DN200 PN16. Чугун GG25, ГОСТ 5762.' },
  { id:4,  name:'Двигатель Siemens 1LE1 7.5кВт', sku:'SI-1LE7-004', category:'electric',    brand:'Siemens',     price:95000,  old:null,   emoji:'⚡', rating:4.7, reviews:8,  badge:'new',  desc:'Асинхронный электродвигатель IE3, 7.5 кВт, 1500 об/мин, IP55.' },
  { id:5,  name:'Спринклер TYCO TY315', sku:'TY-315-005', category:'fire',     brand:'Tyco',        price:4200,   old:5000,   emoji:'🚒', rating:4.6, reviews:67, badge:'sale', desc:'Спринклер водяной розеточный, температура срабатывания 68°C, K=80.' },
  { id:6,  name:'Труба стальная 108×4 ГОСТ 8732', sku:'TR-108-006', category:'pipes',    brand:'ЧТПЗ',        price:12500,  old:null,   emoji:'🪝', rating:4.3, reviews:29, badge:null,  desc:'Труба бесшовная горячедеформированная 108×4 мм, сталь 20, ГОСТ 8732-78.' },
  { id:7,  name:'Смазка Mobil Grease XHP 222', sku:'MB-XHP222-007', category:'lubricants', brand:'Mobil',       price:8900,   old:null,   emoji:'🛢️', rating:4.4, reviews:12, badge:null,  desc:'Смазка пластичная для подшипников качения, NLGI 2, -25°C...+120°C.' },
  { id:8,  name:'Станок токарный 16К20', sku:'VT-16K20-008', category:'machines', brand:'ВТЗ',         price:860000, old:950000, emoji:'⚙️', rating:4.9, reviews:5,  badge:'hit',  desc:'Универсальный токарно-винторезный станок. Длина РМЦ 1000 мм, мощность 11 кВт.' },
  { id:9,  name:'Насос погружной Grundfos SP 5-15', sku:'GF-SP515-009', category:'pumps',    brand:'Grundfos',    price:145000, old:165000, emoji:'💧', rating:4.7, reviews:19, badge:'sale', desc:'Скважинный насос для водоснабжения. Подача 5 м³/ч, напор 113 м, Ø98 мм.' },
  { id:10, name:'Частотник ABB ACS550 22кВт', sku:'AB-ACS550-010', category:'electric',    brand:'ABB',         price:185000, old:null,   emoji:'⚡', rating:4.8, reviews:11, badge:'new',  desc:'Преобразователь частоты для управления электродвигателями 22 кВт, 380В.' },
  { id:11, name:'Клапан обратный Danfoss NRV 20', sku:'DF-NRV20-011', category:'valves',  brand:'Danfoss',     price:7800,   old:9200,   emoji:'🔩', rating:4.5, reviews:33, badge:'sale', desc:'Обратный клапан с пружиной DN20, PN25, нержавеющая сталь.' },
  { id:12, name:'Компрессор Boge S15', sku:'BG-S15-012', category:'compressors', brand:'BOGE',        price:290000, old:null,   emoji:'🔧', rating:4.6, reviews:7,  badge:null,  desc:'Винтовой компрессор 15 кВт, производительность 1680 л/мин, 8 бар, ISO 8573-1.' },
];

const CATEGORIES = [
  { id:'pumps',      name:'Насосы',              nameUz:'Nasoslar',          emoji:'💧', color:'#3B82F6', count:48 },
  { id:'compressors',name:'Компрессоры',         nameUz:'Kompressorlar',     emoji:'🔧', color:'#8B5CF6', count:32 },
  { id:'valves',     name:'Арматура',            nameUz:'Armatura',          emoji:'🔩', color:'#EC4899', count:127 },
  { id:'electric',   name:'Электрооборудование', nameUz:'Elektr jihozlar',   emoji:'⚡', color:'#F59E0B', count:89 },
  { id:'fire',       name:'Пожарное',            nameUz:'Yong\'in',          emoji:'🚒', color:'#EF4444', count:64 },
  { id:'pipes',      name:'Трубопроводы',        nameUz:'Quvurlar',          emoji:'🪝', color:'#10B981', count:215 },
  { id:'lubricants', name:'Смазочные',           nameUz:'Moylash',           emoji:'🛢️', color:'#06B6D4', count:43 },
  { id:'machines',   name:'Станки',              nameUz:'Dastgohlar',        emoji:'⚙️', color:'#6366F1', count:17 },
];

const CAT_NAMES = Object.fromEntries(CATEGORIES.map(c => [c.id, c.name]));
function catName(c) { return currentLang === 'uz' && c.nameUz ? c.nameUz : c.name; }
function catNameById(id) { const c = CATEGORIES.find(x => x.id === id); return c ? catName(c) : id; }

// ─── STATE ───────────────────────────────────────────────────────────────────
const state = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  favs: new Set(JSON.parse(localStorage.getItem('favs') || '[]')),
  cartOpen: false,
  dashOpen: false,
};

function saveCart() { localStorage.setItem('cart', JSON.stringify(state.cart)); }
function saveFavs() { localStorage.setItem('favs', JSON.stringify([...state.favs])); }

// ─── CART ─────────────────────────────────────────────────────────────────────
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const item = state.cart.find(x => x.id === id);
  if (item) item.qty++;
  else state.cart.push({ id, qty: 1 });
  saveCart();
  renderCartBadge();
  renderCart();
  toast('success', `${p.name} → ${t('cart.title')}`);
}

function removeFromCart(id) {
  state.cart = state.cart.filter(x => x.id !== id);
  saveCart(); renderCartBadge(); renderCart();
}

function changeQty(id, delta) {
  const item = state.cart.find(x => x.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(); renderCart(); renderCartBadge();
}

function renderCartBadge() {
  const total = state.cart.reduce((s, x) => s + x.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total;
    el.style.display = total ? '' : 'none';
  });
}

function renderCart() {
  const list = document.getElementById('cart-items');
  if (!list) return;
  if (!state.cart.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🛒</div><h3>${t('cart.empty')}</h3><p>${t('cart.emptySub')}</p></div>`;
    document.getElementById('cart-total-price').textContent = `0 ${t('currency')}`;
    return;
  }
  list.innerHTML = state.cart.map(({ id, qty }) => {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return '';
    return `<div class="cart-item">
      <div class="cart-item-img">${p.emoji}</div>
      <div style="flex:1;min-width:0">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-price">${fmt(p.price)} ${t('currency')}</div>
        <div class="cart-qty">
          <button class="qty-btn" onclick="changeQty(${id},-1)">−</button>
          <span class="qty-val">${qty}</span>
          <button class="qty-btn" onclick="changeQty(${id},1)">+</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
        <span style="font-weight:700;font-size:14px">${fmt(p.price * qty)}</span>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${id})">✕</button>
      </div>
    </div>`;
  }).join('');
  const total = state.cart.reduce((s, { id, qty }) => {
    const p = PRODUCTS.find(x => x.id === id);
    return s + (p ? p.price * qty : 0);
  }, 0);
  const el = document.getElementById('cart-total-price');
  if (el) el.textContent = fmt(total) + ' ' + t('currency');
}

function openCart() {
  state.cartOpen = true;
  document.querySelector('.cart-overlay')?.classList.add('open');
  renderCart();
}
function closeCart() {
  state.cartOpen = false;
  document.querySelector('.cart-overlay')?.classList.remove('open');
}

// ─── FAVORITES ───────────────────────────────────────────────────────────────
function toggleFav(id, btn) {
  if (state.favs.has(id)) { state.favs.delete(id); if(btn) btn.classList.remove('active'); toast('info', t('fav.removed')); }
  else { state.favs.add(id); if(btn) btn.classList.add('active'); toast('info', t('fav.added')); }
  saveFavs();
  renderFavBadge();
  document.querySelectorAll(`.fav-btn[data-id="${id}"]`).forEach(b => b.classList.toggle('active', state.favs.has(id)));
}
function isFav(id) { return state.favs.has(id); }

function renderFavBadge() {
  const count = state.favs.size;
  document.querySelectorAll('.fav-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count ? '' : 'none';
  });
}

function renderFavs() {
  const list = document.getElementById('favs-items');
  if (!list) return;
  const items = [...state.favs].map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  if (!items.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-state-icon">♡</div><h3>${t('fav.empty')}</h3><p>${t('fav.emptySub')}</p></div>`;
    return;
  }
  list.innerHTML = items.map(p => `<div class="cart-item">
    <div class="cart-item-img">${p.emoji}</div>
    <div style="flex:1;min-width:0">
      <div class="cart-item-name">${p.name}</div>
      <div class="cart-item-price">${fmt(p.price)} ${t('currency')}</div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
      <button class="btn btn-sm btn-primary" onclick="addToCart(${p.id});closeFavs()">${t('btn.toCart')}</button>
      <button class="btn btn-sm btn-danger" onclick="toggleFav(${p.id})">✕</button>
    </div>
  </div>`).join('');
}

function openFavs() {
  renderFavs();
  document.getElementById('favs-overlay')?.classList.add('open');
}
function closeFavs() {
  document.getElementById('favs-overlay')?.classList.remove('open');
}

// ─── QUICK VIEW ──────────────────────────────────────────────────────────────
function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  document.getElementById('qv-name').textContent = p.name;
  document.getElementById('qv-body').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start">
      <div style="background:var(--bg-3);border-radius:var(--r-lg);aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:72px">${p.emoji}</div>
      <div>
        <div style="font-size:11px;color:var(--text-3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">${catNameById(p.category)} · ${p.brand}</div>
        <div style="font-size:13px;color:var(--text-2);margin-bottom:4px">${t('product.art')} ${p.sku}</div>
        <div style="margin-bottom:12px"><span style="color:#F59E0B">${stars(p.rating)}</span> <span style="color:var(--text-2);font-size:13px">${p.rating} (${p.reviews} ${t('reviews')})</span></div>
        <p style="font-size:14px;color:var(--text-2);line-height:1.7;margin-bottom:20px">${p.desc}</p>
        <div style="margin-bottom:20px">
          <div style="font-size:26px;font-weight:900;color:var(--primary)">${fmt(p.price)} <small style="font-size:14px;font-weight:500">${t('currency')}</small></div>
          ${p.old?`<div style="color:var(--text-3);text-decoration:line-through;font-size:14px">${fmt(p.old)} ${t('currency')}</div>`:''}
        </div>
        <div style="display:flex;gap:10px">
          <button class="btn btn-primary w-full" onclick="addToCart(${p.id});closeQuickView()">${t('btn.toCart')}</button>
          <button class="btn btn-outline fav-btn${isFav(p.id)?' active':''}" data-id="${p.id}" onclick="toggleFav(${p.id},this)" style="flex-shrink:0;width:44px">♡</button>
        </div>
        <button class="btn btn-outline w-full" style="margin-top:10px" onclick="closeQuickView();nav('product.html?id=${p.id}')">${t('btn.details')}</button>

      </div>
    </div>`;
  document.getElementById('quickview-modal')?.classList.add('open');
}
function closeQuickView() { document.getElementById('quickview-modal')?.classList.remove('open'); }

// ─── CALLBACK ────────────────────────────────────────────────────────────────
function openCallback() { document.getElementById('callback-modal')?.classList.add('open'); }
function closeCallback() { document.getElementById('callback-modal')?.classList.remove('open'); }
function submitCallback(e) {
  e.preventDefault();
  closeCallback();
  toast('success', t('callback.sent'));
}

// ─── LANGUAGE ─────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  ru: {
    // Nav
    'nav.home':'Главная','nav.catalog':'Каталог','nav.promo':'Акции','nav.delivery':'Доставка',
    'nav.gallery':'Галерея','nav.articles':'Статьи','nav.about':'О компании','nav.contacts':'Контакты',
    // Logo & search
    'logo.sub':'Ташкент · с 2008','search.ph':'Поиск товаров...',
    // Dashboard
    'dash.title':'Панель управления','dash.orders':'Заказов сегодня','dash.revenue':'Выручка (сум)',
    'dash.visitors':'Посетителей','dash.inCart':'В корзинах','dash.lastOrders':'Последние заказы',
    'dash.topCats':'Популярные категории','dash.actions':'Быстрые действия',
    'status.paid':'Оплачен','status.pending':'В обработке','status.new':'Новый',
    'dash.btn.catalog':'📦 Каталог','dash.btn.orders':'📋 Заказы',
    'dash.btn.contacts':'📞 Контакты','dash.btn.cart':'🛒 Корзина',
    // Cart
    'cart.title':'Корзина','cart.total':'Итого:','cart.checkout':'Оформить заказ →',
    'cart.empty':'Корзина пуста','cart.emptySub':'Добавьте товары из каталога',
    // Checkout
    'checkout.title':'Оформление заказа','checkout.name':'Имя *','checkout.phone':'Телефон *',
    'checkout.email':'Email','checkout.company':'Компания','checkout.address':'Адрес доставки *',
    'checkout.comment':'Комментарий','checkout.submit':'Подтвердить заказ →',
    'ph.name':'Ваше имя','ph.company':'Название организации',
    'ph.address':'г. Ташкент, ул. ...','ph.comment':'Дополнительные пожелания...',
    // Favorites
    'favs.title':'Избранное','fav.added':'Добавлено в избранное','fav.removed':'Удалено из избранного',
    'fav.empty':'Избранное пусто','fav.emptySub':'Добавляйте товары кнопкой ♡',
    // Callback
    'callback.title':'Обратный звонок',
    'callback.sub':'Оставьте номер — менеджер перезвонит в течение 15 минут',
    'callback.name':'Имя','callback.phone':'Телефон *','callback.time':'Удобное время',
    'callback.submit':'Перезвоните мне →','callback.sent':'Заявка принята! Перезвоним скоро.',
    // Buttons
    'btn.toCart':'+ В корзину','btn.cancel':'Отмена','btn.details':'Подробнее →',
    'btn.allCats':'Все разделы →','btn.allProducts':'Все товары →',
    'btn.catalog':'Открыть каталог →','btn.quote':'Получить КП',
    // Product
    'product.art':'Арт:',
    // Footer
    'footer.desc':'Надёжный поставщик промышленного оборудования в Узбекистане. Более 5000 позиций в наличии.',
    'footer.catalog':'Каталог','footer.company':'Компания','footer.contacts':'Контакты',
    'footer.about':'О компании','footer.promo':'Акции','footer.gallery':'Фотогалерея',
    'footer.articles':'Статьи','footer.delivery':'Оплата и доставка','footer.docs':'Документы',
    'footer.orders':'Отслеживание заказа','footer.allCats':'Все разделы →',
    'footer.schedule':'Пн–Пт: 9:00 – 18:00',
    'footer.copy':'© 2008–2026 PromSnab. Все права защищены.',
    'footer.privacy':'Политика конфиденциальности','footer.terms':'Условия использования',
    'official.dist':'Официальный дистрибьютор',
    // General
    'currency':'сум','reviews':'отзывов',
  },
  uz: {
    // Nav
    'nav.home':'Bosh sahifa','nav.catalog':'Katalog','nav.promo':'Aksiyalar',
    'nav.delivery':'Yetkazib berish','nav.gallery':'Fotogalereya','nav.articles':'Maqolalar',
    'nav.about':'Biz haqimizda','nav.contacts':'Bog\'lanish',
    // Logo & search
    'logo.sub':'Toshkent · 2008 yildan','search.ph':'Mahsulot qidirish...',
    // Dashboard
    'dash.title':'Boshqaruv paneli','dash.orders':'Bugungi buyurtmalar','dash.revenue':'Tushum (so\'m)',
    'dash.visitors':'Tashrif buyuruvchilar','dash.inCart':'Savatlarda',
    'dash.lastOrders':'So\'nggi buyurtmalar','dash.topCats':'Mashhur kategoriyalar',
    'dash.actions':'Tezkor amallar',
    'status.paid':'To\'langan','status.pending':'Jarayonda','status.new':'Yangi',
    'dash.btn.catalog':'📦 Katalog','dash.btn.orders':'📋 Buyurtmalar',
    'dash.btn.contacts':'📞 Bog\'lanish','dash.btn.cart':'🛒 Savat',
    // Cart
    'cart.title':'Savat','cart.total':'Jami:','cart.checkout':'Buyurtma berish →',
    'cart.empty':'Savat bo\'sh','cart.emptySub':'Katalogdan mahsulot qo\'shing',
    // Checkout
    'checkout.title':'Buyurtmani rasmiylashtirish','checkout.name':'Ism *','checkout.phone':'Telefon *',
    'checkout.email':'Email','checkout.company':'Kompaniya','checkout.address':'Yetkazib berish manzili *',
    'checkout.comment':'Izoh','checkout.submit':'Buyurtmani tasdiqlash →',
    'ph.name':'Ismingiz','ph.company':'Tashkilot nomi',
    'ph.address':'Toshkent sh., ko\'cha ...','ph.comment':'Qo\'shimcha takliflar...',
    // Favorites
    'favs.title':'Tanlanganlar','fav.added':'Tanlanganlarga qo\'shildi','fav.removed':'O\'chirildi',
    'fav.empty':'Tanlanganlar bo\'sh','fav.emptySub':'♡ tugmasi orqali mahsulot qo\'shing',
    // Callback
    'callback.title':'Qayta qo\'ng\'iroq',
    'callback.sub':'Raqamingizni qoldiring — menejer 15 daqiqada qo\'ng\'iroq qiladi',
    'callback.name':'Ism','callback.phone':'Telefon *','callback.time':'Qulay vaqt',
    'callback.submit':'Menga qo\'ng\'iroq qiling →','callback.sent':'Ariza qabul qilindi!',
    // Buttons
    'btn.toCart':'+ Savatga','btn.cancel':'Bekor qilish','btn.details':'Batafsil →',
    'btn.allCats':'Barcha bo\'limlar →','btn.allProducts':'Barcha mahsulotlar →',
    'btn.catalog':'Katalogni ochish →','btn.quote':'Taklif olish',
    // Product
    'product.art':'Art:',
    // Footer
    'footer.desc':'O\'zbekistondagi sanoat uskunalari ishonchli ta\'minotchisi. 5000 dan ortiq mahsulot mavjud.',
    'footer.catalog':'Katalog','footer.company':'Kompaniya','footer.contacts':'Bog\'lanish',
    'footer.about':'Biz haqimizda','footer.promo':'Aksiyalar','footer.gallery':'Fotogalereya',
    'footer.articles':'Maqolalar','footer.delivery':'To\'lov va yetkazib berish','footer.docs':'Hujjatlar',
    'footer.orders':'Buyurtmani kuzatish','footer.allCats':'Barcha bo\'limlar →',
    'footer.schedule':'Du–Ju: 9:00 – 18:00',
    'footer.copy':'© 2008–2026 PromSnab. Barcha huquqlar himoyalangan.',
    'footer.privacy':'Maxfiylik siyosati','footer.terms':'Foydalanish shartlari',
    'official.dist':'Rasmiy distribyutor',
    // General
    'currency':'so\'m','reviews':'sharh',
  },
};

let currentLang = localStorage.getItem('ps-lang') || 'ru';

function t(key) { return (TRANSLATIONS[currentLang]||TRANSLATIONS.ru)[key] || key; }

function applyLang(lang) {
  currentLang = lang;
  const btn = document.getElementById('lang-toggle-btn');
  if (btn) btn.textContent = lang === 'ru' ? 'UZ' : 'RU';
}

function toggleLang() {
  const next = currentLang === 'ru' ? 'uz' : 'ru';
  localStorage.setItem('ps-lang', next);
  window.location.reload();
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function openDash() {
  state.dashOpen = true;
  document.querySelector('.dash-panel')?.classList.add('open');
  document.querySelector('.dash-overlay')?.classList.add('open');
}
function closeDash() {
  state.dashOpen = false;
  document.querySelector('.dash-panel')?.classList.remove('open');
  document.querySelector('.dash-overlay')?.classList.remove('open');
}

// ─── TOAST ───────────────────────────────────────────────────────────────────
function toast(type, msg) {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const icons = { success:'✅', error:'❌', info:'💡' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(20px)'; t.style.transition='.3s'; setTimeout(()=>t.remove(),300); }, 3000);
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function fmt(n) { return n.toLocaleString('ru-RU'); }
function stars(r) { return '★'.repeat(Math.round(r)) + '☆'.repeat(5-Math.round(r)); }
function badgeHtml(b) {
  if(!b) return '';
  const map = { new:'Новинка', hot:'Хит', sale:'−15%', hit:'Популярный' };
  return `<span class="badge-tag badge-${b}">${map[b]||b}</span>`;
}

// ─── PRODUCT CARD RENDERER ───────────────────────────────────────────────────
function renderProductCard(p, link=true) {
  const url = `product.html?id=${p.id}`;
  return `<div class="product-card" onclick="${link?`nav('${url}')`:''}">
    <div class="product-img" style="background:linear-gradient(135deg,var(--bg-3),var(--bg-2))">
      <div class="product-img-inner">${p.emoji}</div>
      <div class="product-badges">${badgeHtml(p.badge)}</div>
      <div class="product-actions-hover">
        <button class="p-action-btn fav-btn${isFav(p.id)?' active':''}" data-id="${p.id}" onclick="event.stopPropagation();toggleFav(${p.id},this)" title="♡">♡</button>
        <button class="p-action-btn" onclick="event.stopPropagation();openQuickView(${p.id})" title="👁">👁</button>
        <button class="p-action-btn" onclick="event.stopPropagation();addToCart(${p.id})" title="🛒">🛒</button>
      </div>
    </div>
    <div class="product-info">
      <div class="product-category">${catNameById(p.category)}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-sku">${t('product.art')} ${p.sku}</div>
      <div class="product-rating"><span class="stars">${stars(p.rating)}</span>${p.rating} (${p.reviews})</div>
      <div class="product-footer">
        <div>
          <div class="product-price">${fmt(p.price)} <small style="font-size:12px;font-weight:500">${t('currency')}</small></div>
          ${p.old?`<div class="product-price-old">${fmt(p.old)} ${t('currency')}</div>`:''}
        </div>
        <button class="btn btn-sm btn-primary" onclick="event.stopPropagation();addToCart(${p.id})">${t('btn.toCart')}</button>
      </div>
    </div>
  </div>`;
}

// ─── NAVIGATION WITH TRANSITION ──────────────────────────────────────────────
function nav(url) {
  if (!url) return;
  window.location.href = url;
}

// ─── SEARCH ──────────────────────────────────────────────────────────────────
function doSearch(q) {
  if (q.trim()) nav(`catalog.html?q=${encodeURIComponent(q)}`);
}

// ─── CHECKOUT MODAL ──────────────────────────────────────────────────────────
function openCheckout() {
  if (!state.cart.length) { toast('error', t('cart.empty')); return; }
  const o = document.getElementById('checkout-modal');
  if (o) { o.classList.add('open'); closeCart(); }
}
function closeCheckout() {
  const o = document.getElementById('checkout-modal');
  if (o) o.classList.remove('open');
}
function submitOrder(e) {
  e.preventDefault();
  closeCheckout();
  state.cart = []; saveCart(); renderCartBadge(); renderCart();
  toast('success', t('callback.sent'));
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCartBadge();
  renderFavBadge();
});
