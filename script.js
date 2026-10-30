// ===============================
// 1. MAHSULOTLAR RO'YXATI
// ===============================

const products = [
  {
    id: 1,
    name: "Tandir non",
    category: "milliy",
    price: 5000,
    unit: "dona",
    tag: "Ommabop",
    description: "An'anaviy tandirda pishirilgan xushbo'y non.",
    image:
      "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Obi non",
    category: "milliy",
    price: 4000,
    unit: "dona",
    tag: "Klassik",
    description: "Har kuni dasturxon uchun yumshoq va mazali non.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Patir non",
    category: "patir",
    price: 12000,
    unit: "dona",
    tag: "Maxsus",
    description: "Yog'li, qatlamli va to'yimli milliy patir.",
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Sutli bulochka",
    category: "shirin",
    price: 6000,
    unit: "dona",
    tag: "Yumshoq",
    description: "Nonushta uchun yumshoq va mayin bulochka.",
    image:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Kunjutli non",
    category: "milliy",
    price: 7000,
    unit: "dona",
    tag: "Yangi",
    description: "Ustiga kunjut sepilgan, mazali va xushbo'y non.",
    image:
      "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Qatlama patir",
    category: "patir",
    price: 15000,
    unit: "dona",
    tag: "Sevimli",
    description: "Qarsildoq qatlamlari bilan o'ziga xos ta'm.",
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484a0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Shirin kulcha",
    category: "shirin",
    price: 8000,
    unit: "dona",
    tag: "Shirin",
    description: "Choy bilan iste'mol qilish uchun shirin kulcha.",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Mini nonlar",
    category: "milliy",
    price: 3000,
    unit: "dona",
    tag: "Hamyonbop",
    description: "Kichik hajmdagi, kundalik iste'mol uchun non.",
    image:
      "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=600&q=80",
  },
];

// ===============================
// 2. ELEMENTLARNI TANLAB OLISH
// ===============================

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");
const emptyMessage = document.getElementById("emptyMessage");

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const subtotalElement = document.getElementById("subtotal");
const deliveryPriceElement = document.getElementById("deliveryPrice");
const totalPriceElement = document.getElementById("totalPrice");

const checkoutButton = document.getElementById("checkoutButton");
const clearCartButton = document.getElementById("clearCart");

const orderModal = document.getElementById("orderModal");
const closeModalButton = document.getElementById("closeModal");
const orderForm = document.getElementById("orderForm");
const orderResult = document.getElementById("orderResult");
const modalTotal = document.getElementById("modalTotal");

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

// ===============================
// 3. UMUMIY O'ZGARUVCHILAR
// ===============================

let selectedCategory = "all";
let cart = [];

const FREE_DELIVERY_LIMIT = 100000;
const DELIVERY_PRICE = 10000;

// Pulni so'm ko'rinishida chiqarish
function formatPrice(price) {
  return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
}

// ===============================
// 4. MAHSULOTLARNI CHIQARISH
// ===============================

function renderProducts() {
  const searchText = searchInput.value.trim().toLocaleLowerCase("uz-UZ");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const searchableText = (
      product.name +
      " " +
      product.description
    ).toLocaleLowerCase("uz-UZ");

    const matchesSearch = searchableText.includes(searchText);

    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = filteredProducts
    .map((product) => {
      return `
        <article class="product-card">
          <div class="product-image">
            <img
              src="${product.image}"
              alt="${product.name}"
              loading="lazy"
            />
            <span class="product-tag">${product.tag}</span>
          </div>

          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>

            <div class="product-bottom">
              <div class="product-price">
                ${formatPrice(product.price)}
                <span class="product-unit">1 ${product.unit} uchun</span>
              </div>

              <button
                class="add-button"
                data-add="${product.id}"
                aria-label="${product.name} savatga qo'shish"
                title="Savatga qo'shish"
              >+</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  emptyMessage.hidden = filteredProducts.length !== 0;
}

// Qidiruv
searchInput.addEventListener("input", renderProducts);

// Kategoriyalar
categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");

  if (!button) return;

  selectedCategory = button.dataset.category;

  document.querySelectorAll(".filter").forEach((filter) => {
    filter.classList.remove("active");
  });

  button.classList.add("active");
  renderProducts();
});

// ===============================
// 5. SAVATGA MAHSULOT QO'SHISH
// ===============================

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");

  if (!button) return;

  const productId = Number(button.dataset.add);
  addToCart(productId);
});

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  renderCart();
}

// ===============================
// 6. SAVATDAGI MIQDORNI O'ZGARTIRISH
// ===============================

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) return;

  const productId = Number(button.dataset.id);
  const action = button.dataset.action;

  const item = cart.find((product) => product.id === productId);

  if (!item) return;

  if (action === "increase") {
    item.quantity += 1;
  }

  if (action === "decrease") {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart = cart.filter((product) => product.id !== productId);
    }
  }

  renderCart();
});

// ===============================
// 7. SAVATNI EKRANGA CHIQARISH
// ===============================

function renderCart() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryPrice =
    subtotal === 0 || subtotal >= FREE_DELIVERY_LIMIT ? 0 : DELIVERY_PRICE;

  const total = subtotal + deliveryPrice;

  cartCount.textContent = totalQuantity;

  subtotalElement.textContent = formatPrice(subtotal);

  deliveryPriceElement.textContent =
    deliveryPrice === 0 && subtotal > 0 ? "Bepul" : formatPrice(deliveryPrice);

  totalPriceElement.textContent = formatPrice(total);
  modalTotal.textContent = formatPrice(total);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="cart-empty">
        Savatingiz hozircha bo'sh. Mazali nonlardan tanlang! 🥖
      </p>
    `;

    checkoutButton.disabled = true;
    checkoutButton.style.opacity = "0.5";
  } else {
    cartItems.innerHTML = cart
      .map((item) => {
        return `
          <div class="cart-item">
            <div>
              <h4>${item.name}</h4>
              <small>${formatPrice(item.price)} / dona</small>
            </div>

            <div class="quantity-control">
              <button
                data-action="decrease"
                data-id="${item.id}"
                aria-label="Miqdorni kamaytirish"
              >−</button>

              <span>${item.quantity}</span>

              <button
                data-action="increase"
                data-id="${item.id}"
                aria-label="Miqdorni oshirish"
              >+</button>
            </div>

            <div class="cart-line-price">
              ${formatPrice(item.price * item.quantity)}
            </div>
          </div>
        `;
      })
      .join("");

    checkoutButton.disabled = false;
    checkoutButton.style.opacity = "1";
  }
}

// Savatni tozalash
clearCartButton.addEventListener("click", () => {
  cart = [];
  renderCart();
});

// ===============================
// 8. BUYURTMA OYNASINI OCHISH
// ===============================

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) return;

  orderResult.hidden = true;
  orderForm.hidden = false;
  orderForm.reset();

  modalTotal.textContent = totalPriceElement.textContent;

  orderModal.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("customerName").focus();
});

// Oynani yopish
function closeOrderModal() {
  orderModal.hidden = true;
  document.body.style.overflow = "";
}

closeModalButton.addEventListener("click", closeOrderModal);

orderModal.addEventListener("click", (event) => {
  if (event.target === orderModal) {
    closeOrderModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !orderModal.hidden) {
    closeOrderModal();
  }
});

// ===============================
// 9. BUYURTMANI TASDIQLASH
// ===============================

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (cart.length === 0) {
    closeOrderModal();
    return;
  }

  const formData = new FormData(orderForm);

  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const comment = String(formData.get("comment") || "").trim();

  if (name.length < 2 || address.length < 5) {
    alert("Ism va manzilni to'g'ri kiriting.");
    return;
  }

  // O'zbekiston telefon raqami uchun sodda tekshiruv.
  const normalizedPhone = phone.replace(/[\s()-]/g, "");

  if (!/^(?:\+?998)?\d{9}$/.test(normalizedPhone)) {
    alert("Telefon raqamini to'g'ri kiriting. Masalan: +998901234567");
    return;
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryPrice =
    subtotal === 0 || subtotal >= FREE_DELIVERY_LIMIT ? 0 : DELIVERY_PRICE;

  const total = subtotal + deliveryPrice;

  const orderItems = cart
    .map((item) => {
      return `${item.name} — ${item.quantity} dona`;
    })
    .join(", ");

  // Hozircha buyurtma serverga yuborilmaydi.
  // Bu faqat frontend demo.

  orderForm.hidden = true;
  orderResult.hidden = false;

  orderResult.innerHTML = `
    <h3>✅ Buyurtma ma'lumotlari tayyor!</h3>
    <p><strong>Mijoz:</strong> ${escapeHTML(name)}</p>
    <p><strong>Telefon:</strong> ${escapeHTML(phone)}</p>
    <p><strong>Manzil:</strong> ${escapeHTML(address)}</p>
    <p><strong>Mahsulotlar:</strong> ${escapeHTML(orderItems)}</p>
    <p><strong>Yetkazib berish:</strong> ${formatPrice(deliveryPrice)}</p>
    <p><strong>Jami:</strong> ${formatPrice(total)}</p>
    ${comment ? `<p><strong>Izoh:</strong> ${escapeHTML(comment)}</p>` : ""}
    <p style="margin-top:12px">
      Bu demo versiya. Buyurtma nonvoyxonaga hali yuborilmadi.
      Haqiqiy buyurtma uchun backend kerak.
    </p>
    <button type="button" class="btn btn-primary full-width"
      id="finishOrder" style="margin-top:15px">
      Yopish
    </button>
  `;

  document.getElementById("finishOrder").addEventListener("click", () => {
    cart = [];
    renderCart();
    closeOrderModal();
  });
});

// HTML ichiga kiritiladigan matnni xavfsizlashtirish
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

// ===============================
// 10. MOBIL MENYU
// ===============================

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Menyuni yopish" : "Menyuni ochish",
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Menyudagi havola bosilganda menyuni yopish
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ===============================
// 11. FOOTER YILI
// ===============================

document.getElementById("currentYear").textContent = new Date().getFullYear();

// ===============================
// 12. SAYTNI ISHGA TUSHIRISH
// ===============================

renderProducts();
renderCart();
