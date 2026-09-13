/* ============================================================
   beYon — shared chrome, commerce state and motion engine
   ============================================================ */

const { IMG, SHOT, PRODUCTS, CUTS, COLLECTIONS, CATEGORY_TILES, TESTIMONIALS, FAQS } = window.BEYON;

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const USD_RATE = 83;
const STORE = {
  cart: "beyon:cart",
  wish: "beyon:wishlist",
  cur: "beyon:currency",
};

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};
const write = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage blocked */ }
};

let cart = read(STORE.cart, []);
let wishlist = read(STORE.wish, []);
let currency = read(STORE.cur, "inr");

const byId = (id) => PRODUCTS.find((p) => p.id === id);
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;

function money(inr) {
  if (currency === "usd") {
    return `$${Math.round(inr / USD_RATE).toLocaleString("en-US")}`;
  }
  return `₹${inr.toLocaleString("en-IN")}`;
}

/* ---------- markup ---------------------------------------- */
const ICON = {
  search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>`,
  user: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4.5 20c1.6-3.6 4.2-5.4 7.5-5.4S18.4 16.4 20 20"/></svg>`,
  heart: `<svg viewBox="0 0 24 24"><path d="M12 20S3.8 14.7 3.8 9.4A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.2 2.7C20.2 14.7 12 20 12 20z"/></svg>`,
  bag: `<svg viewBox="0 0 24 24"><path d="M5.5 8h13l1 12h-15z"/><path d="M9 8V6.4a3 3 0 0 1 6 0V8"/></svg>`,
  arrowR: `<svg viewBox="0 0 24 10"><path d="M0 5h22M17 1l5 4-5 4"/></svg>`,
  arrowL: `<svg viewBox="0 0 24 10"><path d="M24 5H2M7 1L2 5l5 4"/></svg>`,
  arrowUp: `<svg viewBox="0 0 24 24"><path d="M12 20V5M6 11l6-6 6 6"/></svg>`,
};

const currencySwitchHTML = `
  <div class="currency-switch" data-cur="${currency}" role="group" aria-label="Currency">
    <button type="button" data-cur-set="inr" class="${currency === "inr" ? "is-active" : ""}">INR</button>
    <button type="button" data-cur-set="usd" class="${currency === "usd" ? "is-active" : ""}">USD</button>
  </div>
`;

const headerHTML = `
  <div class="ticker-bar" aria-hidden="true">
    <div class="ticker-bar__track">
      <span>Next-day delivery in metros</span><span>7-day free returns</span><span>BIS hallmarked gold</span>
      <span>Certified by Titan Company</span><span>Free shipping across India</span>
      <span>Next-day delivery in metros</span><span>7-day free returns</span><span>BIS hallmarked gold</span>
      <span>Certified by Titan Company</span><span>Free shipping across India</span>
    </div>
  </div>
  <div class="nav-wrap">
    <a class="logo" href="index.html" aria-label="beYon home">
      <svg class="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
        <defs><linearGradient id="lm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#c49a6c"/><stop offset=".55" stop-color="#8b5a2b"/><stop offset="1" stop-color="#6b3f1f"/>
        </linearGradient></defs>
        <path d="M20 22h24l-12 24z" fill="url(#lm)"/>
        <path d="M15 22l5-6h24l5 6" fill="none" stroke="url(#lm)" stroke-width="2.2" stroke-linejoin="round"/>
      </svg>
      <span class="logo-text"><b>be</b><i>Yon</i></span>
    </a>
    <nav aria-label="Primary">
      <ul class="nav-links" id="navLinks">
        <li class="has-mega" data-mega>
          <button type="button" aria-expanded="false">Jewellery</button>
          <div class="mega">
            <div class="mega__grid">
              <div>
                <h5>Category</h5>
                <ul>
                  <li><a href="jewellery.html?cat=Rings">Rings</a></li>
                  <li><a href="jewellery.html?cat=Earrings">Earrings</a></li>
                  <li><a href="jewellery.html?cat=Pendants">Pendants</a></li>
                  <li><a href="jewellery.html?cat=Bracelets">Bracelets</a></li>
                  <li><a href="jewellery.html?cat=Bangles">Bangles</a></li>
                  <li><a href="jewellery.html?cat=Mangalsutra">Mangalsutra</a></li>
                </ul>
              </div>
              <div>
                <h5>Shop by cut</h5>
                <ul>
                  <li><a href="jewellery.html?cut=Marquise">Marquise</a></li>
                  <li><a href="jewellery.html?cut=Baguette">Baguette</a></li>
                  <li><a href="jewellery.html?cut=Emerald">Emerald</a></li>
                  <li><a href="jewellery.html?cut=Half Moon">Half Moon</a></li>
                  <li><a href="jewellery.html?cut=Pear">Pear</a></li>
                  <li><a href="jewellery.html?cut=Round">Round</a></li>
                </ul>
              </div>
              <div>
                <h5>Discover</h5>
                <ul>
                  <li><a href="jewellery.html?sort=new">Just dropped</a></li>
                  <li><a href="jewellery.html?cat=Solitaires">Solitaires</a></li>
                  <li><a href="jewellery.html?cat=Silver">Silver under ₹10k</a></li>
                  <li><a href="jewellery.html?sort=price-desc">The atelier edit</a></li>
                  <li><a href="jewellery.html">View all products</a></li>
                </ul>
              </div>
              <a class="mega__promo" href="collections.html">
                <img src="${IMG(SHOT.diamondBracelet, 600)}" alt="beYon Bold collection" loading="lazy">
                <figcaption>beYon Bold</figcaption>
              </a>
            </div>
          </div>
        </li>
        <li class="has-mega" data-mega>
          <button type="button" aria-expanded="false">Collections</button>
          <div class="mega">
            <div class="mega__grid">
              <div>
                <h5>Collection</h5>
                <ul>
                  <li><a href="collections.html#beyon-the-cut">beYon The Cut</a></li>
                  <li><a href="collections.html#beyon-bold">beYon Bold</a></li>
                  <li><a href="collections.html#beyon-limits">beYon Limits</a></li>
                  <li><a href="collections.html#beyon-the-nazar">beYon The Nazar</a></li>
                  <li><a href="collections.html#infinitelove">InfiniteLove</a></li>
                </ul>
              </div>
              <div>
                <h5>Metal</h5>
                <ul>
                  <li><a href="jewellery.html?karat=9 KT">9 KT gold</a></li>
                  <li><a href="jewellery.html?karat=14 KT">14 KT gold</a></li>
                  <li><a href="jewellery.html?karat=18 KT">18 KT gold</a></li>
                  <li><a href="jewellery.html?karat=Silver">Silver</a></li>
                </ul>
              </div>
              <div>
                <h5>Learn</h5>
                <ul>
                  <li><a href="facts.html">beYon facts</a></li>
                  <li><a href="facts.html#compare">Grown vs mined</a></li>
                  <li><a href="facts.html#faq">Help &amp; FAQs</a></li>
                  <li><a href="stores.html">Find a store</a></li>
                </ul>
              </div>
              <a class="mega__promo" href="collections.html#infinitelove">
                <img src="${IMG(SHOT.modelNecklace, 600)}" alt="InfiniteLove collection" loading="lazy">
                <figcaption>InfiniteLove</figcaption>
              </a>
            </div>
          </div>
        </li>
        <li><a href="facts.html">beYon Facts</a></li>
        <li><a href="stores.html">Stores</a></li>
      </ul>
    </nav>
    <div class="nav-actions">
      ${currencySwitchHTML}
      <button class="icon-btn" type="button" data-open-search aria-label="Search">${ICON.search}</button>
      <a class="icon-btn" href="jewellery.html" aria-label="Wishlist">${ICON.heart}</a>
      <button class="icon-btn" type="button" data-open-cart aria-label="Open bag">
        ${ICON.bag}<span class="cart-count" id="cartCount">0</span>
      </button>
      <button class="menu-toggle" id="menuToggle" type="button" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
`;

/* Kept out of the header: the header's backdrop-filter would become the
   containing block for this fixed panel. */
const mobileNavHTML = `
  <nav class="mobile-nav" id="mobileNav" aria-label="Mobile">
    <a href="index.html">Home</a>
    <a href="jewellery.html">Jewellery</a>
    <a href="collections.html">Collections</a>
    <a href="facts.html">beYon Facts</a>
    <a href="stores.html">Stores</a>
    <a href="jewellery.html?sort=new">Just dropped</a>
    <div class="mobile-nav__foot">
      <span>Show prices in</span>
      ${currencySwitchHTML}
    </div>
  </nav>
`;

const footerHTML = `
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4>beYon</h4>
        <p>Laboratory-grown diamond jewellery from the House of Titan. Created with human ingenuity, designed for everyday desire and worn without rules.</p>
        <div class="footer-socials">
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/></svg></a>
          <a href="#" aria-label="Pinterest"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M10 20l2.4-8M9.4 11.2c0-2 1.5-3.4 3.4-3.4 1.8 0 3 1.2 3 3 0 2.4-1.4 4.2-3.2 4.2-.9 0-1.6-.6-1.4-1.4"/></svg></a>
          <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="4"/><path d="M11 9.8l4 2.2-4 2.2z"/></svg></a>
          <a href="#" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12z"/><path d="M9 9.8c0 3 2.2 5.2 5.2 5.2.6 0 1-.5 1-1l-1.4-.8-1 .8c-1-.4-1.9-1.3-2.3-2.3l.8-1L10.5 9c-.8 0-1.5.2-1.5.8z"/></svg></a>
        </div>
      </div>
      <div>
        <h4>Jewellery</h4>
        <ul>
          <li><a href="jewellery.html?cat=Earrings">Earrings</a></li>
          <li><a href="jewellery.html?cat=Rings">Rings</a></li>
          <li><a href="jewellery.html?cat=Pendants">Pendants</a></li>
          <li><a href="jewellery.html?cat=Bracelets">Bracelets</a></li>
          <li><a href="jewellery.html?cat=Mangalsutra">Mangalsutra</a></li>
          <li><a href="jewellery.html">All jewellery</a></li>
        </ul>
      </div>
      <div>
        <h4>Information</h4>
        <ul>
          <li><a href="facts.html">beYon facts (about LGD)</a></li>
          <li><a href="collections.html">Collections</a></li>
          <li><a href="facts.html#faq">Help &amp; FAQs</a></li>
          <li><a href="facts.html#care">Care &amp; cleaning</a></li>
          <li><a href="stores.html#contact">Contact us</a></li>
        </ul>
      </div>
      <div>
        <h4>Customer service</h4>
        <ul>
          <li><a href="stores.html">Find a store</a></li>
          <li><a href="facts.html#faq">Delivery information</a></li>
          <li><a href="facts.html#faq">Returns</a></li>
          <li><a href="tel:18002660123">1800 · 266 · 0123</a></li>
          <li><a href="mailto:care@beyon.co.in">care@beyon.co.in</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-wordmark" aria-hidden="true">beYon</div>
    <div class="copyright">
      <span>© ${new Date().getFullYear()} Titan Company Limited. All rights reserved.</span>
      <span>No exchange on laboratory-grown diamonds · 100%* exchange on gold at prevailing rate</span>
    </div>
  </div>
`;

const overlaysHTML = `
  <div class="scroll-progress" id="scrollProgress"></div>
  ${mobileNavHTML}
  <div class="scrim" id="scrim"></div>

  <aside class="drawer" id="cartDrawer" aria-label="Shopping bag" aria-hidden="true">
    <div class="drawer__head">
      <div>
        <h3>Your bag</h3>
        <small id="cartSummary">0 pieces</small>
      </div>
      <button class="icon-btn" type="button" data-close-cart aria-label="Close bag">
        <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <div class="drawer__body" id="cartBody"></div>
    <div class="drawer__foot">
      <div class="drawer__total"><span>Total</span><span id="cartTotal">₹0</span></div>
      <button class="btn btn-primary" type="button" data-checkout><span>Proceed to checkout</span></button>
      <small>Taxes included · Insured next-day delivery in metros</small>
    </div>
  </aside>

  <div class="search-overlay" id="searchOverlay" aria-hidden="true">
    <div class="search-overlay__inner">
      <div style="display:flex;align-items:center;gap:1rem">
        <input id="searchInput" type="search" placeholder="Search cuts, collections, pieces…" aria-label="Search products">
        <button class="icon-btn" type="button" data-close-search aria-label="Close search">
          <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
      <div class="search-hints">
        <button class="chip" type="button" data-search-hint="marquise"><span>Marquise</span></button>
        <button class="chip" type="button" data-search-hint="mangalsutra"><span>Mangalsutra</span></button>
        <button class="chip" type="button" data-search-hint="nazar"><span>Nazar</span></button>
        <button class="chip" type="button" data-search-hint="solitaire"><span>Solitaires</span></button>
        <button class="chip" type="button" data-search-hint="silver"><span>Silver</span></button>
      </div>
      <div class="search-results" id="searchResults"></div>
    </div>
  </div>

  <div class="toast-stack" id="toastStack" aria-live="polite"></div>
  <button class="to-top" id="toTop" type="button" aria-label="Back to top">${ICON.arrowUp}</button>
  <div class="cursor" id="cursorDot" aria-hidden="true"></div>
  <div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>
`;

/* ---------- reusable card ---------------------------------- */
function productCard(p) {
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  const wished = wishlist.includes(p.id);
  return `
    <article class="card" data-cat="${p.cat}" data-cut="${p.cut}" data-coll="${p.coll}" data-karat="${p.karat}" data-price="${p.price}" data-id="${p.id}">
      <div class="card__media">
        ${p.badge ? `<span class="card__badge">${p.badge}</span>` : ""}
        <button class="card__wish ${wished ? "is-on" : ""}" type="button" data-wish="${p.id}" aria-label="Save ${p.name}">${ICON.heart}</button>
        <div class="media">
          <img src="${IMG(p.shots[0], 640)}" alt="${p.name}" loading="lazy">
          <img class="alt" src="${IMG(p.shots[1], 640)}" alt="" loading="lazy" aria-hidden="true">
        </div>
        <div class="card__quick">
          <button class="btn btn-primary btn-sm" type="button" data-add="${p.id}"><span>Add to bag</span></button>
        </div>
      </div>
      <div class="card__body">
        <p class="card__meta">${p.cut} cut · ${p.karat}</p>
        <h3 class="card__name">${p.name}</h3>
        <p class="card__price">
          <ins data-inr="${p.price}">${money(p.price)}</ins>
          <del data-inr="${p.mrp}">${money(p.mrp)}</del>
          <span style="color:var(--gold);font-size:.72rem">${off}% off</span>
        </p>
        <p class="card__rating"><b>★ ${p.rating.toFixed(1)}</b> <span>(${p.reviews})</span></p>
      </div>
    </article>
  `;
}

function cutStoneHTML(cut, i) {
  const amp = ["Princess", "Marquise", "Emerald"].includes(cut.name) ? " cuts-stone--amp" : "";
  return `
    <button class="cuts-stone${amp}" type="button" data-cut-index="${i}" aria-label="${cut.name} cut">
      <img src="${cut.image}" alt="" draggable="false">
    </button>
  `;
}

/* ---------- commerce -------------------------------------- */
function cartQty() {
  return cart.reduce((n, l) => n + l.qty, 0);
}

function cartTotal() {
  return cart.reduce((sum, l) => sum + (byId(l.id)?.price ?? 0) * l.qty, 0);
}

function paintCart({ bump = false } = {}) {
  write(STORE.cart, cart);
  const count = document.getElementById("cartCount");
  const qty = cartQty();
  if (count) {
    count.textContent = qty;
    count.classList.toggle("is-on", qty > 0);
    if (bump) {
      count.classList.remove("is-bump");
      void count.offsetWidth;
      count.classList.add("is-bump");
    }
  }

  const body = document.getElementById("cartBody");
  const summary = document.getElementById("cartSummary");
  const total = document.getElementById("cartTotal");
  if (summary) summary.textContent = `${qty} ${qty === 1 ? "piece" : "pieces"}`;
  if (total) total.textContent = money(cartTotal());
  if (!body) return;

  if (!cart.length) {
    body.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 64 64"><path d="M18 24h28l-14 26z"/><path d="M12 24l6-8h28l6 8"/></svg>
        <p>Your bag is waiting for something brilliant.</p>
        <a class="btn btn-ghost btn-sm" href="jewellery.html"><span>Start with the cuts</span></a>
      </div>`;
    return;
  }

  body.innerHTML = cart
    .map((line, i) => {
      const p = byId(line.id);
      if (!p) return "";
      return `
        <div class="cart-line" style="animation-delay:${i * 60}ms">
          <div class="media"><img src="${IMG(p.shots[0], 240)}" alt="${p.name}" loading="lazy"></div>
          <div>
            <p class="cart-line__meta">${p.cut} cut · ${p.karat}</p>
            <h4>${p.name}</h4>
            <div class="cart-line__row">
              <div class="stepper">
                <button type="button" data-qty="-1" data-id="${p.id}" aria-label="Decrease quantity">−</button>
                <span>${line.qty}</span>
                <button type="button" data-qty="1" data-id="${p.id}" aria-label="Increase quantity">+</button>
              </div>
              <strong data-inr="${p.price * line.qty}">${money(p.price * line.qty)}</strong>
            </div>
            <div class="cart-line__row">
              <button class="cart-remove" type="button" data-remove="${p.id}">Remove</button>
            </div>
          </div>
        </div>`;
    })
    .join("");
}

function addToCart(id) {
  const line = cart.find((l) => l.id === id);
  if (line) line.qty += 1;
  else cart.push({ id, qty: 1 });
  paintCart({ bump: true });
  toast(`${byId(id)?.name ?? "Piece"} added to bag`);
}

function paintPrices() {
  document.querySelectorAll("[data-inr]").forEach((el) => {
    el.textContent = money(Number(el.dataset.inr));
  });
  const total = document.getElementById("cartTotal");
  if (total) total.textContent = money(cartTotal());
}

function setCurrency(next) {
  currency = next;
  write(STORE.cur, currency);
  document.querySelectorAll(".currency-switch").forEach((sw) => {
    sw.dataset.cur = currency;
    sw.querySelectorAll("[data-cur-set]").forEach((b) =>
      b.classList.toggle("is-active", b.dataset.curSet === currency)
    );
  });
  paintPrices();
  toast(currency === "usd" ? "Prices shown in USD" : "Prices shown in INR");
}

function toast(message) {
  const stack = document.getElementById("toastStack");
  if (!stack) return;
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  stack.appendChild(el);
  setTimeout(() => {
    el.classList.add("is-out");
    setTimeout(() => el.remove(), 400);
  }, 2600);
}

/* ---------- overlays -------------------------------------- */
// Locking the root rather than the body keeps the sticky header pinned.
function lockScroll(on) {
  document.documentElement.classList.toggle("is-locked", on);
}

function openCart(on) {
  document.getElementById("cartDrawer")?.classList.toggle("is-open", on);
  document.getElementById("cartDrawer")?.setAttribute("aria-hidden", String(!on));
  document.getElementById("scrim")?.classList.toggle("is-open", on);
  lockScroll(on);
}

function openSearch(on) {
  const overlay = document.getElementById("searchOverlay");
  overlay?.classList.toggle("is-open", on);
  overlay?.setAttribute("aria-hidden", String(!on));
  lockScroll(on);
  if (on) setTimeout(() => document.getElementById("searchInput")?.focus(), 120);
}

function renderSearch(query) {
  const box = document.getElementById("searchResults");
  if (!box) return;
  const q = query.trim().toLowerCase();
  if (!q) { box.innerHTML = ""; return; }
  const hits = PRODUCTS.filter((p) =>
    [p.name, p.cat, p.cut, p.coll, p.karat].join(" ").toLowerCase().includes(q)
  ).slice(0, 7);

  box.innerHTML = hits.length
    ? hits
        .map(
          (p, i) => `
        <a href="jewellery.html?cat=${encodeURIComponent(p.cat)}" style="animation-delay:${i * 50}ms">
          <span class="media"><img src="${IMG(p.shots[0], 160)}" alt="" loading="lazy"></span>
          <span><b>${p.name}</b><small>${p.cut} cut · ${p.coll}</small></span>
          <i data-inr="${p.price}">${money(p.price)}</i>
        </a>`
        )
        .join("")
    : `<p class="empty-state">Nothing matched “${query}”. Try a cut — marquise, baguette, pear.</p>`;
}

/* ---------- motion engine --------------------------------- */
function splitText(el) {
  const state = { i: 0 };
  // Script headings must stay whole words — splitting into characters
  // breaks the connecting strokes of Tempting.
  const keepWords = /^H[1-4]$/.test(el.tagName);
  const build = (node) => {
    const frag = document.createDocumentFragment();
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        child.textContent.split(/(\s+)/).forEach((chunk) => {
          if (!chunk) return;
          if (!chunk.trim()) {
            frag.appendChild(document.createTextNode(chunk));
            return;
          }
          const word = document.createElement("span");
          word.className = "word";
          if (keepWords) {
            word.style.setProperty("--i", state.i++);
            word.textContent = chunk;
          } else {
            Array.from(chunk).forEach((ch) => {
              const c = document.createElement("span");
              c.className = "char";
              c.style.setProperty("--i", state.i++);
              c.textContent = ch;
              word.appendChild(c);
            });
          }
          frag.appendChild(word);
        });
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const clone = child.cloneNode(false);
        clone.appendChild(build(child));
        frag.appendChild(clone);
      }
    });
    return frag;
  };
  const built = build(el);
  el.innerHTML = "";
  el.appendChild(built);
  el.classList.add("split");
  if (keepWords) el.classList.add("split--words");
}

function wrapWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span>${w}</span>`).join(" ");
}

function docTop(el) {
  let y = 0;
  let node = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return y;
}

let revealTargets = [];
let revealIO = null;

function initReveals() {
  document.querySelectorAll("[data-split]").forEach(splitText);
  revealTargets = Array.from(document.querySelectorAll("[data-reveal], [data-split], .stagger"));
  revealTargets.forEach((el) => {
    if (el.dataset.delay) el.style.setProperty("--d", `${el.dataset.delay}ms`);
  });

  if (REDUCED || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-in"));
    return;
  }

  revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealIO.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: "0px 0px -12% 0px" }
  );
  revealTargets.forEach((el) => revealIO.observe(el));
}

// Anything already on the first screen plays as an entrance animation — the
// observer's bottom margin would otherwise leave it stranded with no scroll left.
function revealFirstScreen() {
  if (!revealIO) return;
  const vh = window.innerHeight;
  revealTargets.forEach((el) => {
    if (el.classList.contains("is-in")) return;
    if (el.getBoundingClientRect().top < vh) {
      el.classList.add("is-in");
      revealIO.unobserve(el);
    }
  });
}

function initCounters() {
  const nodes = document.querySelectorAll("[data-count]");
  if (!nodes.length) return;
  const run = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? "";
    const decimals = Number(el.dataset.decimals ?? 0);
    if (REDUCED) {
      el.textContent = target.toLocaleString("en-IN", { minimumFractionDigits: decimals }) + suffix;
      return;
    }
    const dur = 1800;
    const start = performance.now();
    const tick = (now) => {
      const t = clamp((now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      el.textContent =
        value.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        run(e.target);
        io.unobserve(e.target);
      }),
    { threshold: 0.5 }
  );
  nodes.forEach((n) => io.observe(n));
}

function initCursor() {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring || REDUCED || window.matchMedia("(hover: none)").matches) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.translate = `${mx - 3}px ${my - 3}px`;
  }, { passive: true });

  const loop = () => {
    rx = lerp(rx, mx, 0.16);
    ry = lerp(ry, my, 0.16);
    ring.style.translate = `${rx - 18}px ${ry - 18}px`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  const hot = "a, button, .card, .cuts-stone, input, select, textarea, [data-magnetic]";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(".tile, .bento")) {
      document.body.classList.add("cursor-off");
      document.body.classList.remove("cursor-hot");
      return;
    }
    if (e.target.closest(hot)) document.body.classList.add("cursor-hot");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(".tile, .bento")) document.body.classList.remove("cursor-off");
    if (e.target.closest(hot)) document.body.classList.remove("cursor-hot");
  });
}

function initMagnetic() {
  if (REDUCED) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.24;
      const y = (e.clientY - r.top - r.height / 2) * 0.32;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
}

function initTilt() {
  if (REDUCED) return;
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    const strength = Number(el.dataset.tilt) || 8;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
}

function initHeroScrolly() {
  const section = document.getElementById("heroScrolly");
  const video = document.getElementById("heroVideo");
  const lines = [...document.querySelectorAll(".hero-line")];
  if (!section || !video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.loop = false;
  video.preload = "auto";
  video.disablePictureInPicture = true;
  video.controls = false;

  if (REDUCED) {
    lines.forEach((line) => line.classList.add("is-in"));
    video.loop = true;
    video.play().catch(() => {});
    return;
  }

  let duration = 0;
  let unlocked = false;
  let lastLineMask = -1;
  let raf = 0;
  const lineAt = lines.map((line) => Number(line.dataset.at || 0));

  const readDuration = () => {
    const d = video.duration;
    if (Number.isFinite(d) && d > 0) duration = d;
  };

  const progressFromScroll = () => {
    const start = section.getBoundingClientRect().top + window.scrollY;
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    return clamp((window.scrollY - start) / scrollable);
  };

  const unlock = () => {
    if (unlocked) return;
    const play = video.play();
    if (play && typeof play.then === "function") {
      play.then(() => {
        unlocked = true;
        video.pause();
      }).catch(() => {});
    } else {
      unlocked = true;
      video.pause();
    }
  };

  const seek = (time) => {
    const t = clamp(time, 0, Math.max(0, duration - 0.04));
    try {
      if (typeof video.fastSeek === "function") video.fastSeek(t);
      else video.currentTime = t;
    } catch {
      try { video.currentTime = t; } catch { /* not ready */ }
    }
  };

  const playForward = (rate) => {
    video.playbackRate = clamp(rate, 0.4, 12);
    if (video.paused) {
      const play = video.play();
      if (play && typeof play.then === "function") play.catch(unlock);
    }
  };

  const syncVideo = (progress) => {
    if (duration <= 0) return;
    const target = progress * duration;
    const now = video.currentTime || 0;
    const drift = target - now;

    section.style.setProperty("--hero-scale", (1.08 - progress * 0.08).toFixed(4));

    // Pin the last frames: keep playing until the file actually ends.
    if (progress >= 0.985) {
      if (now < duration - 0.08) playForward(Math.min(8, Math.max(2.2, (duration - now) * 2)));
      else if (!video.paused) video.pause();
      return;
    }

    if (drift < -0.12) {
      seek(target);
      if (!video.paused) video.pause();
      return;
    }

    if (drift > 0.03) {
      playForward(1 + drift * 4);
      return;
    }

    if (!video.paused) video.pause();
    video.playbackRate = 1;
  };

  const paintLines = (progress) => {
    let mask = 0;
    for (let i = 0; i < lineAt.length; i += 1) {
      if (progress >= lineAt[i]) mask |= 1 << i;
    }
    if (mask === lastLineMask) return;
    lastLineMask = mask;
    lines.forEach((line, i) => {
      line.classList.toggle("is-in", Boolean(mask & (1 << i)));
    });
  };

  const tick = () => {
    const progress = progressFromScroll();
    section.classList.toggle("is-scrolled", progress > 0.03);
    paintLines(progress);
    syncVideo(progress);
    raf = requestAnimationFrame(tick);
  };

  video.addEventListener("loadedmetadata", readDuration);
  video.addEventListener("durationchange", readDuration);
  video.addEventListener("canplay", readDuration);
  if (video.readyState >= 1) readDuration();

  window.addEventListener("pointerdown", unlock, { once: true, passive: true });
  window.addEventListener("touchstart", unlock, { once: true, passive: true });
  window.addEventListener("wheel", unlock, { once: true, passive: true });
  window.addEventListener("keydown", unlock, { once: true });
  video.addEventListener("loadeddata", unlock, { once: true });

  raf = requestAnimationFrame(tick);
}

function initSparks() {
  const canvas = document.getElementById("heroSparks");
  if (!canvas || REDUCED) return;
  const ctx = canvas.getContext("2d");
  let w = 0;
  let h = 0;
  let stars = [];

  const size = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: Math.round((w * h) / 14000) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      p: Math.random() * Math.PI * 2,
      s: Math.random() * 0.02 + 0.006,
      drift: Math.random() * 0.12 - 0.06,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    stars.forEach((st) => {
      st.p += st.s;
      st.y -= st.drift;
      if (st.y < -4) st.y = h + 4;
      const a = (Math.sin(st.p) + 1) / 2;
      ctx.globalAlpha = 0.12 + a * 0.72;
      ctx.fillStyle = a > 0.72 ? "#fff8ee" : "#c49a6c";
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r * (0.6 + a * 0.7), 0, Math.PI * 2);
      ctx.fill();
      if (a > 0.9) {
        ctx.globalAlpha = (a - 0.9) * 3;
        ctx.strokeStyle = "#fff8ee";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(st.x - st.r * 4, st.y);
        ctx.lineTo(st.x + st.r * 4, st.y);
        ctx.moveTo(st.x, st.y - st.r * 4);
        ctx.lineTo(st.x, st.y + st.r * 4);
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  };

  size();
  window.addEventListener("resize", size);
  requestAnimationFrame(draw);
}

function initCutsDial() {
  const stage = document.getElementById("cutsStage");
  const dial = document.getElementById("cutsDial");
  if (!stage || !dial || !CUTS.length) return;

  const nameEl = document.getElementById("cutsActive");
  const noteEl = document.getElementById("cutsNote");
  const shopEl = document.getElementById("cutsShop");
  const count = CUTS.length;
  const step = 360 / count;
  const slot = 180;

  dial.insertAdjacentHTML("beforeend", CUTS.map(cutStoneHTML).join(""));
  const stones = [...dial.querySelectorAll(".cuts-stone")];

  let index = 0;
  let angle = slot;
  let target = slot;
  let holding = false;
  let timer = 0;

  const radius = () => {
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;width:var(--r);visibility:hidden;pointer-events:none";
    stage.appendChild(probe);
    const n = probe.getBoundingClientRect().width;
    probe.remove();
    return n * 0.93;
  };
  let r = radius();
  let dragging = false;

  const paintCaption = () => {
    const cut = CUTS[index];
    if (nameEl) nameEl.textContent = cut.name;
    if (noteEl) noteEl.textContent = cut.note;
    if (shopEl) shopEl.href = `jewellery.html?cut=${encodeURIComponent(cut.name)}`;
  };

  const setIndex = (next, snap = false) => {
    index = ((next % count) + count) % count;
    target = slot - index * step;
    if (snap) angle = target;
    paintCaption();
  };

  const place = () => {
    stones.forEach((stone, i) => {
      const theta = ((i * step + angle) * Math.PI) / 180;
      const nx = Math.cos(theta);
      const x = nx * r;
      const y = Math.sin(theta) * r;
      const onArc = nx <= 0.04;
      stone.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
      stone.style.display = onArc ? "" : "none";
      stone.style.opacity = "1";
      stone.style.visibility = "visible";
      stone.style.pointerEvents = onArc && i !== index ? "auto" : "none";
      stone.classList.toggle("is-active", i === index);
    });
  };

  const tick = () => {
    if (!dragging) {
      angle += (target - angle) * (REDUCED ? 1 : 0.08);
      if (Math.abs(target - angle) < 0.02) angle = target;
    }
    place();
    requestAnimationFrame(tick);
  };

  const advance = () => setIndex(index + 1);
  const startAuto = () => {
    if (REDUCED || holding) return;
    clearInterval(timer);
    timer = window.setInterval(advance, 1200);
  };
  const stopAuto = () => {
    clearInterval(timer);
    timer = 0;
  };

  stones.forEach((stone) => {
    stone.addEventListener("click", () => {
      setIndex(Number(stone.dataset.cutIndex));
      stopAuto();
      startAuto();
    });
  });

  stage.addEventListener("pointerenter", () => { holding = true; stopAuto(); });
  stage.addEventListener("pointerleave", () => { holding = false; startAuto(); });
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); setIndex(index + 1); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); setIndex(index - 1); }
  });

  let drag = null;
  stage.addEventListener("pointerdown", (e) => {
    if (e.target.closest("a")) return;
    drag = { x: e.clientX, start: angle };
    dragging = true;
    holding = true;
    stopAuto();
    stage.setPointerCapture?.(e.pointerId);
  });
  stage.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const delta = (e.clientX - drag.x) / 4;
    const next = drag.start + delta;
    const i = Math.round((slot - next) / step);
    setIndex(i);
    angle = next;
  });
  const endDrag = () => {
    if (!drag) return;
    drag = null;
    dragging = false;
    setIndex(index);
    holding = false;
    startAuto();
  };
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  window.addEventListener("resize", () => { r = radius(); place(); });

  const io = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) startAuto();
    else stopAuto();
  }, { threshold: 0.25 });
  io.observe(stage);

  setIndex(0, true);
  place();
  requestAnimationFrame(tick);
}

function initScrollScene() {
  const progress = document.getElementById("scrollProgress");
  const header = document.getElementById("site-header");
  const toTop = document.getElementById("toTop");
  const floats = Array.from(document.querySelectorAll("[data-depth]"));
  const parallaxImgs = Array.from(document.querySelectorAll("[data-parallax]"));
  const stackItems = Array.from(document.querySelectorAll(".stack__item"));
  const litBlocks = Array.from(document.querySelectorAll(".reveal-words"));
  litBlocks.forEach(wrapWords);

  let pointer = { x: 0, y: 0 };
  let smooth = { x: 0, y: 0 };

  if (!REDUCED) {
    window.addEventListener("mousemove", (e) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  const frame = () => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const docH = document.documentElement.scrollHeight - vh;

    if (progress) progress.style.transform = `scaleX(${docH > 0 ? clamp(y / docH) : 0})`;
    header?.classList.toggle("scrolled", y > 14);
    toTop?.classList.toggle("is-on", y > vh * 0.8);

    smooth.x = lerp(smooth.x, pointer.x, 0.07);
    smooth.y = lerp(smooth.y, pointer.y, 0.07);

    floats.forEach((el) => {
      const depth = Number(el.dataset.depth) || 0.1;
      const ty = -y * depth;
      const mx = smooth.x * depth * 90;
      const my = smooth.y * depth * 60;
      el.style.transform = `translate3d(${mx}px, ${ty + my}px, 0)`;
    });

    parallaxImgs.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const t = (r.top + r.height / 2 - vh / 2) / vh;
      const amount = Number(el.dataset.parallax) || 40;
      el.style.transform = `translate3d(0, ${(-t * amount).toFixed(2)}px, 0) scale(1.1)`;
    });

    if (!REDUCED && window.innerWidth > 880) {
      stackItems.forEach((item, i) => {
        const next = stackItems[i + 1];
        if (!next) { item.style.transform = ""; item.style.filter = ""; return; }
        const start = docTop(item);
        const end = docTop(next);
        const t = clamp((y - start + vh * 0.1) / Math.max(1, end - start));
        item.style.transform = `scale(${(1 - t * 0.07).toFixed(4)}) translateY(${(-t * 18).toFixed(2)}px)`;
        item.style.filter = `brightness(${(1 - t * 0.35).toFixed(3)})`;
      });
    }

    litBlocks.forEach((block) => {
      const r = block.getBoundingClientRect();
      const t = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.28));
      const words = block.querySelectorAll("span");
      const lit = Math.round(t * words.length);
      words.forEach((w, i) => w.classList.toggle("lit", i < lit));
    });

    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function initRails() {
  document.querySelectorAll("[data-rail]").forEach((rail) => {
    const step = () => rail.querySelector(":scope > *")?.getBoundingClientRect().width ?? 300;
    const wrap = rail.closest(".rail-wrap");
    wrap?.querySelector("[data-rail-prev]")?.addEventListener("click", () =>
      rail.scrollBy({ left: -step() * 1.2, behavior: "smooth" })
    );
    wrap?.querySelector("[data-rail-next]")?.addEventListener("click", () =>
      rail.scrollBy({ left: step() * 1.2, behavior: "smooth" })
    );

    let down = false;
    let startX = 0;
    let startScroll = 0;
    rail.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      startX = e.clientX;
      startScroll = rail.scrollLeft;
    });
    rail.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) rail.classList.add("is-dragging");
      rail.scrollLeft = startScroll - dx;
    });
    const release = () => {
      down = false;
      setTimeout(() => rail.classList.remove("is-dragging"), 60);
    };
    rail.addEventListener("pointerup", release);
    rail.addEventListener("pointerleave", release);
    rail.addEventListener("click", (e) => {
      if (rail.classList.contains("is-dragging")) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  });
}

function initFaq(container) {
  const list = container ?? document.getElementById("faqList");
  if (!list) return;
  if (!list.children.length) {
    list.innerHTML = FAQS.map(
      (f, i) => `
      <div class="faq__item" data-reveal data-delay="${i * 60}">
        <button class="faq__q" type="button" aria-expanded="false">
          <em>${f.tag}</em>
          <span>${f.q}</span>
          <span class="faq__icon" aria-hidden="true"></span>
        </button>
        <div class="faq__a"><div>${f.a}</div></div>
      </div>`
    ).join("");
  }

  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".faq__q");
    if (!btn) return;
    const item = btn.parentElement;
    const panel = item.querySelector(".faq__a");
    const open = item.classList.contains("is-open");

    list.querySelectorAll(".faq__item.is-open").forEach((other) => {
      other.classList.remove("is-open");
      other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
      other.querySelector(".faq__a").style.height = "0px";
    });

    if (!open) {
      item.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      panel.style.height = `${panel.firstElementChild.offsetHeight}px`;
    }
  });
}

function initQuotes() {
  const box = document.getElementById("quotes");
  const dots = document.getElementById("quoteDots");
  if (!box) return;

  box.innerHTML = TESTIMONIALS.map(
    (t, i) => `
    <blockquote class="quote ${i === 0 ? "is-active" : ""}">
      <span class="quote__stars">★★★★★</span>
      <p>“${t.text}”</p>
      <footer>${t.who}</footer>
    </blockquote>`
  ).join("");

  if (dots) {
    dots.innerHTML = TESTIMONIALS.map(
      (_, i) => `<button type="button" class="${i === 0 ? "is-active" : ""}" aria-label="Review ${i + 1}"></button>`
    ).join("");
  }

  const quotes = Array.from(box.children);
  const buttons = dots ? Array.from(dots.children) : [];
  let index = 0;
  let timer;

  const show = (next) => {
    index = (next + quotes.length) % quotes.length;
    quotes.forEach((q, i) => q.classList.toggle("is-active", i === index));
    buttons.forEach((b, i) => {
      b.classList.remove("is-active");
      if (i === index) {
        void b.offsetWidth;
        b.classList.add("is-active");
      }
    });
  };

  const play = () => {
    clearInterval(timer);
    if (REDUCED) return;
    timer = setInterval(() => show(index + 1), 7000);
  };

  buttons.forEach((b, i) => b.addEventListener("click", () => { show(i); play(); }));
  play();
}

/* ---------- page: jewellery listing ----------------------- */
function initListing() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const params = new URLSearchParams(location.search);
  const state = {
    cat: params.get("cat") ?? "all",
    cut: params.get("cut") ?? "all",
    coll: params.get("coll") ?? "all",
    karat: params.get("karat") ?? "all",
    sort: params.get("sort") ?? "featured",
  };

  const buildChips = (group, values) => {
    const host = document.querySelector(`[data-chips="${group}"]`);
    if (!host) return;
    host.innerHTML = ["all", ...values]
      .map(
        (v) =>
          `<button class="chip ${state[group] === v ? "is-active" : ""}" type="button" data-group="${group}" data-value="${v}"><span>${v === "all" ? "All" : v}</span></button>`
      )
      .join("");
  };

  const uniq = (key) => [...new Set(PRODUCTS.map((p) => p[key]))].sort();
  buildChips("cat", uniq("cat"));
  buildChips("cut", uniq("cut"));
  buildChips("karat", ["9 KT", "14 KT", "18 KT", "Silver"]);

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) sortSelect.value = state.sort;

  const count = document.getElementById("resultCount");

  const render = () => {
    let list = PRODUCTS.filter(
      (p) =>
        (state.cat === "all" || p.cat === state.cat) &&
        (state.cut === "all" || p.cut === state.cut) &&
        (state.coll === "all" || p.coll === state.coll) &&
        (state.karat === "all" || p.karat === state.karat)
    );

    if (state.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (state.sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (state.sort === "new") list = [...list].reverse();

    if (count) count.textContent = `${list.length} ${list.length === 1 ? "piece" : "pieces"}`;

    grid.innerHTML = list.length
      ? list.map(productCard).join("")
      : `<p class="empty-state" style="grid-column:1/-1">No pieces match that combination yet. Loosen a filter and the sparkle comes back.</p>`;

    grid.querySelectorAll(".card").forEach((card, i) => {
      card.classList.add("is-filtering");
      requestAnimationFrame(() => {
        card.style.transition = `opacity .6s var(--ease) ${i * 35}ms, transform .7s var(--ease) ${i * 35}ms, border-color .5s var(--ease)`;
        card.classList.remove("is-filtering");
      });
    });

    const url = new URL(location.href);
    Object.entries(state).forEach(([k, v]) => {
      if (v === "all" || (k === "sort" && v === "featured")) url.searchParams.delete(k);
      else url.searchParams.set(k, v);
    });
    history.replaceState(null, "", url);
  };

  document.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip[data-group]");
    if (!chip) return;
    const { group, value } = chip.dataset;
    state[group] = value;
    document
      .querySelectorAll(`.chip[data-group="${group}"]`)
      .forEach((c) => c.classList.toggle("is-active", c.dataset.value === value));
    render();
  });

  sortSelect?.addEventListener("change", () => {
    state.sort = sortSelect.value;
    render();
  });

  document.getElementById("clearFilters")?.addEventListener("click", () => {
    Object.assign(state, { cat: "all", cut: "all", coll: "all", karat: "all", sort: "featured" });
    document.querySelectorAll(".chip[data-group]").forEach((c) =>
      c.classList.toggle("is-active", c.dataset.value === "all")
    );
    if (sortSelect) sortSelect.value = "featured";
    render();
  });

  render();
}

/* ---------- home page composition ------------------------- */
function initHome() {
  const tiles = document.getElementById("selectionGrid");
  if (tiles) {
    tiles.innerHTML = CATEGORY_TILES.map(
      (t, i) => `
      <a class="tile ${t.size}" href="jewellery.html?cat=${encodeURIComponent(t.name.split(" ")[0])}" data-reveal="scale" data-delay="${i * 70}" data-tilt="5">
        <span class="media"><img src="${IMG(t.shot, 900)}" alt="${t.name}" loading="lazy"></span>
        <span class="tile__scrim"></span>
        <span class="tile__corner"></span>
        <span class="tile__body">
          <span class="tile__count">${t.count}</span>
          <h3>${t.name}</h3>
          <span class="tile__cta">Shop now ${ICON.arrowR}</span>
        </span>
      </a>`
    ).join("");
  }

  const best = document.getElementById("bestRail");
  if (best) {
    best.innerHTML = PRODUCTS.filter((p) => p.rating >= 4.8)
      .slice(0, 10)
      .map(productCard)
      .join("");
  }

  const stack = document.getElementById("collectionStack");
  if (stack) {
    stack.innerHTML = COLLECTIONS.map(
      (c, i) => `
      <article class="stack__item">
        <div class="stack__media"><span class="media"><img src="${IMG(c.shot, 1000)}" alt="${c.name}" loading="lazy"></span></div>
        <div class="stack__body">
          <span class="stack__index">Collection ${String(i + 1).padStart(2, "0")} / ${String(COLLECTIONS.length).padStart(2, "0")}</span>
          <h3>${c.name}</h3>
          <p>${c.copy}</p>
          <a class="link-arrow" href="collections.html#${c.name.toLowerCase().replace(/\s+/g, "-")}">View the edit ${ICON.arrowR}</a>
        </div>
      </article>`
    ).join("");
  }

  const social = document.getElementById("socialGrid");
  if (social) {
    const shots = [
      SHOT.modelNeckwear, SHOT.hoopEarrings, SHOT.ringStack, SHOT.diamondBracelet, SHOT.modelNecklace,
      SHOT.gemRing, SHOT.pendantChain, SHOT.banglesHands, SHOT.dropEarrings,
    ];
    social.innerHTML = shots
      .map((s, i) => `<a href="#" aria-label="Instagram post ${i + 1}"><span class="media"><img src="${IMG(s, 500)}" alt="" loading="lazy"></span></a>`)
      .join("");
  }
}

/* ---------- page: collections ----------------------------- */
const slug = (name) => name.toLowerCase().replace(/\s+/g, "-");

function initCollectionsPage() {
  const host = document.getElementById("collectionSections");
  if (!host) return;

  const jump = document.getElementById("collectionJump");
  if (jump) {
    jump.innerHTML = COLLECTIONS.map(
      (c) => `<a class="chip" href="#${slug(c.name)}"><span>${c.name}</span></a>`
    ).join("");
  }

  host.innerHTML = COLLECTIONS.map((c, i) => {
    const picks = PRODUCTS.filter((p) => p.coll === c.name).slice(0, 4);
    return `
      <section class="section${i % 2 ? " section--light" : ""}" id="${slug(c.name)}">
        <div class="container">
          <div class="split-2" style="margin-bottom:clamp(2rem,4vw,3.5rem)">
            <div>
              <p class="kicker" data-reveal>Collection ${String(i + 1).padStart(2, "0")}</p>
              <h2 data-split>${c.name.replace("beYon ", "beYon<br>")}</h2>
              <p class="lede" data-reveal data-delay="140" style="margin-top:1.3rem">${c.copy}</p>
              <a class="link-arrow" href="jewellery.html?coll=${encodeURIComponent(c.name)}" style="margin-top:2rem" data-reveal>
                Shop ${c.name} ${ICON.arrowR}
              </a>
            </div>
            <div class="media" style="aspect-ratio:4/3" data-reveal="scale">
              <img src="${IMG(c.shot, 1000)}" alt="${c.name}" loading="lazy" data-parallax="24">
            </div>
          </div>
          <div class="product-grid">${picks.map(productCard).join("")}</div>
        </div>
      </section>`;
  }).join("");
}

/* ---------- page: stores ---------------------------------- */
function initStoresPage() {
  const grid = document.getElementById("storeGrid");
  if (!grid) return;
  const { STORES } = window.BEYON;

  grid.innerHTML = STORES.map(
    (s, i) => `
    <article class="store-card" data-reveal data-delay="${i * 70}" data-city="${s.city} ${s.area}">
      <span class="media"><img src="${IMG(s.shot, 700)}" alt="beYon ${s.city}" loading="lazy"></span>
      <div class="store-card__body">
        <p class="store-card__tag">${s.note}</p>
        <h3>${s.city}</h3>
        <p>${s.area}</p>
        <p style="display:flex;align-items:center;gap:.55rem;font-size:.8rem;color:var(--muted)">
          <span class="pin" aria-hidden="true"></span> Open ${s.hours}
        </p>
        <a class="link-arrow" href="#contact" style="margin-top:.5rem">Book a visit ${ICON.arrowR}</a>
      </div>
    </article>`
  ).join("");

  const search = document.getElementById("storeSearch");
  const empty = document.getElementById("storeEmpty");
  search?.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    grid.querySelectorAll("[data-city]").forEach((card) => {
      const hit = !q || card.dataset.city.toLowerCase().includes(q);
      card.hidden = !hit;
      if (hit) shown += 1;
    });
    if (empty) empty.hidden = shown > 0;
  });
}

function syncHeaderOffset() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const h = Math.ceil(header.getBoundingClientRect().height);
  if (h > 0) document.documentElement.style.setProperty("--header-offset", `${h}px`);
}

/* ---------- boot ------------------------------------------ */
function bootChrome() {
  const header = document.getElementById("site-header");
  if (header) {
    header.classList.add("site-header");
    header.innerHTML = headerHTML;
  }
  syncHeaderOffset();
  requestAnimationFrame(syncHeaderOffset);
  document.fonts?.ready?.then(syncHeaderOffset);
  window.addEventListener("resize", syncHeaderOffset);
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.classList.add("site-footer");
    footer.innerHTML = footerHTML;
  }
  const overlays = document.getElementById("site-overlays");
  if (overlays) overlays.innerHTML = overlaysHTML;

  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach((a) => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  // mega menus on hover (desktop) and click (keyboard)
  document.querySelectorAll("[data-mega]").forEach((item) => {
    const btn = item.querySelector("button");
    const set = (on) => {
      item.dataset.open = String(on);
      btn?.setAttribute("aria-expanded", String(on));
    };
    item.addEventListener("mouseenter", () => set(true));
    item.addEventListener("mouseleave", () => set(false));
    btn?.addEventListener("click", () => set(item.dataset.open !== "true"));
    item.addEventListener("focusout", (e) => {
      if (!item.contains(e.relatedTarget)) set(false);
    });
  });

  // No scroll lock here: the panel sits under the sticky header so its close
  // button stays reachable, and locking the root unsticks that header.
  const toggle = document.getElementById("menuToggle");
  toggle?.addEventListener("click", () => {
    const on = !document.body.classList.contains("nav-open");
    document.body.classList.toggle("nav-open", on);
    toggle.setAttribute("aria-expanded", String(on));
  });
  document.querySelectorAll(".mobile-nav a").forEach((a) =>
    a.addEventListener("click", () => document.body.classList.remove("nav-open"))
  );
}

function bootEvents() {
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) {
      addToCart(add.dataset.add);
      return;
    }

    const wish = e.target.closest("[data-wish]");
    if (wish) {
      const id = wish.dataset.wish;
      const on = !wishlist.includes(id);
      wishlist = on ? [...wishlist, id] : wishlist.filter((w) => w !== id);
      write(STORE.wish, wishlist);
      document.querySelectorAll(`[data-wish="${id}"]`).forEach((el) => el.classList.toggle("is-on", on));
      toast(on ? "Saved to wishlist" : "Removed from wishlist");
      return;
    }

    const qty = e.target.closest("[data-qty]");
    if (qty) {
      const line = cart.find((l) => l.id === qty.dataset.id);
      if (line) {
        line.qty += Number(qty.dataset.qty);
        if (line.qty < 1) cart = cart.filter((l) => l.id !== line.id);
        paintCart();
      }
      return;
    }

    const remove = e.target.closest("[data-remove]");
    if (remove) {
      cart = cart.filter((l) => l.id !== remove.dataset.remove);
      paintCart();
      toast("Removed from bag");
      return;
    }

    if (e.target.closest("[data-open-cart]")) return openCart(true);
    if (e.target.closest("[data-close-cart]") || e.target.id === "scrim") return openCart(false);
    if (e.target.closest("[data-open-search]")) return openSearch(true);
    if (e.target.closest("[data-close-search]")) return openSearch(false);

    const hint = e.target.closest("[data-search-hint]");
    if (hint) {
      const input = document.getElementById("searchInput");
      if (input) {
        input.value = hint.dataset.searchHint;
        renderSearch(input.value);
      }
      return;
    }

    if (e.target.closest("[data-checkout]")) {
      if (!cart.length) return toast("Add a piece first");
      toast("Checkout is a demo on this build");
      return;
    }

    if (e.target.closest("#toTop")) window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
  });

  document.addEventListener("input", (e) => {
    if (e.target.id === "searchInput") renderSearch(e.target.value);
  });

  document.addEventListener("click", (e) => {
    const set = e.target.closest("[data-cur-set]");
    if (set) setCurrency(set.dataset.curSet);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      openCart(false);
      openSearch(false);
      document.body.classList.remove("nav-open");
    }
    if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      openSearch(true);
    }
  });

  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.querySelector(".form-success")?.classList.add("is-on");
      form.reset();
      toast("Thank you — we will be in touch");
    });
  });

  // graceful image fallback so a blocked CDN never shows broken icons
  window.addEventListener(
    "error",
    (e) => {
      const el = e.target;
      if (el?.tagName !== "IMG") return;
      const holder = el.closest(".media") ?? el.parentElement;
      holder?.classList.add("media--fallback");
    },
    true
  );
}

function bootPreloader() {
  const pre = document.getElementById("preloader");
  const curtain = document.getElementById("curtain");
  const bar = pre?.querySelector(".preloader__bar span");
  const count = pre?.querySelector(".preloader__count");

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    pre?.classList.add("is-done");
    curtain?.classList.add("is-open");
    lockScroll(false);
    revealFirstScreen();
  };

  window.addEventListener("load", revealFirstScreen);

  if (!pre) {
    curtain?.classList.add("is-open");
    requestAnimationFrame(revealFirstScreen);
    return;
  }
  if (REDUCED) return finish();

  lockScroll(true);
  let value = 0;
  const timer = setInterval(() => {
    value = Math.min(100, value + Math.random() * 16 + 6);
    if (bar) bar.style.width = `${value}%`;
    if (count) count.textContent = `${Math.round(value)}%`;
    if (value >= 100) {
      clearInterval(timer);
      setTimeout(finish, 320);
    }
  }, 120);

  // never let a throttled timer keep the page behind the curtain
  setTimeout(() => {
    clearInterval(timer);
    finish();
  }, 2600);
}

document.addEventListener("DOMContentLoaded", () => {
  bootChrome();
  initHome();
  initListing();
  initCollectionsPage();
  initStoresPage();
  initFaq();
  initQuotes();
  bootEvents();
  paintCart();
  paintPrices();
  initReveals();
  initCounters();
  initCursor();
  initMagnetic();
  initTilt();
  initHeroScrolly();
  initSparks();
  initCutsDial();
  initScrollScene();
  initRails();
  bootPreloader();
});
