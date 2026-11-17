// ==========================================================
// 🟢 SIRF EK JAGAH: apna published Google Sheet CSV link
// ==========================================================
const SHEET_CSV_URL = "YAHAN_APNA_PUBLISHED_CSV_LINK_PASTE_KARO";

let productsData = {};
let categoryMap = {};   // slug -> asli category naam

// Optional: category ka pretty heading. Na do to auto ban jaata hai.
const categoryLabels = {
    festive: "Festive Special Sets",
    stylish: "Stylish Kurti Sets"
};

// ==========================================================
// ⚙️ AUTOMATIC ENGINE
// ==========================================================

document.addEventListener("DOMContentLoaded", fetchProductsFromSheet);

function slugify(text) {
    return String(text).trim().toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function autoTitle(category) {
    return category.charAt(0).toUpperCase() + category.slice(1) + " Collection";
}

function chipLabel(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

function headingFor(category) {
    return categoryLabels[category] || autoTitle(category);
}

// ---------- Data load ----------

function parseRows(rows) {
    const data = {};
    rows.forEach(row => {
        if (!row.id) return;
        data[row.id.trim()] = {
            title: row.title || "",
            price: row.price || "",
            original: row.original || "",
            image: row.image || "",
            badge: row.badge || "",
            category: row.category ? row.category.trim() : "",
            desc: row.desc || "",
            link: row.link || "#"
        };
    });
    return data;
}

function applyData() {
    loadProducts();
    buildCategoryBar();
    route();
}

function fetchProductsFromSheet() {
    // Pehle saved data se turant dikhao (agar hai)
    try {
        const cached = localStorage.getItem("cachedProducts");
        if (cached) {
            productsData = JSON.parse(cached);
            applyData();
        }
    } catch (e) {}

    // Phir fresh data lao
    Papa.parse(SHEET_CSV_URL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            productsData = parseRows(results.data);
            try { localStorage.setItem("cachedProducts", JSON.stringify(productsData)); } catch (e) {}
            applyData();
        },
        error: function (err) {
            console.error("Sheet load error:", err);
        }
    });
}

// ---------- Grouping ----------

function getGrouped() {
    const grouped = {};
    categoryMap = {};
    for (let id in productsData) {
        const p = productsData[id];
        if (!p.category) continue;
        if (!grouped[p.category]) grouped[p.category] = [];
        grouped[p.category].push({ id, ...p });
        categoryMap[slugify(p.category)] = p.category;
    }
    return grouped;
}

// ---------- Home: sections + chips ----------

function loadProducts() {
    const container = document.getElementById("sections-container");
    if (!container) return;
    container.innerHTML = "";

    const grouped = getGrouped();

    Object.keys(grouped).forEach(category => {
        const slug = slugify(category);

        const section = document.createElement("section");
        section.className = "product-set";
        section.innerHTML = `
            <div class="set-header">
                <h2>${headingFor(category)}</h2>
                <span class="see-all">See all &rarr;</span>
            </div>
            <div class="horizontal-slider" id="${slug}-slider"></div>
        `;
        section.querySelector(".see-all").addEventListener("click", () => showCategory(slug));
        container.appendChild(section);

        const slider = section.querySelector(".horizontal-slider");
        grouped[category].forEach(p => slider.appendChild(createCard(p)));
    });
}

function buildCategoryBar() {
    const bar = document.getElementById("category-bar");
    if (!bar) return;
    bar.innerHTML = "";

    Object.keys(categoryMap).forEach(slug => {
        const chip = document.createElement("button");
        chip.className = "category-chip";
        chip.textContent = chipLabel(categoryMap[slug]);
        chip.addEventListener("click", () => showCategory(slug));
        bar.appendChild(chip);
    });
}

// ---------- Card ----------

function createCard(p) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
        <div class="card-img-wrapper">
            <div class="img-bg" style="background-image:url('${p.image}')"></div>
            <span class="badge">${p.badge || ""}</span>
            <img src="${p.image}" alt="${p.title}" loading="lazy">
        </div>
        <div class="card-body">
            <h3>${p.title}</h3>
            <div class="price-row">
                <span class="current-price">${p.price}</span>
                <span class="original-price">${p.original}</span>
            </div>
        </div>
    `;
    card.addEventListener("click", () => showDetail(p.id));
    return card;
}

// ---------- Navigation (home / category / product) ----------
// URL ka hash decide karta hai konsa page dikhe:
//   (khaali)         -> home
//   #cat-summer-wears -> category page
//   #kurti-2          -> product page

function setView(viewId) {
    ["home-view", "category-view", "detail-view"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle("active", id === viewId);
    });
    window.scrollTo(0, 0);
}

function navigate(hash) {
    const base = window.location.pathname + window.location.search;
    window.history.pushState(null, "", hash ? "#" + hash : base);
    route();
}

function route() {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));

    if (hash.startsWith("cat-")) {
        const slug = hash.slice(4);
        if (categoryMap[slug]) {
            renderCategory(slug);
            return;
        }
    } else if (productsData[hash]) {
        renderDetail(hash);
        return;
    }
    setView("home-view");
}

function showHome()          { navigate(""); }
function showCategory(slug)  { navigate("cat-" + slug); }
function showDetail(id)      { navigate(id); }

window.addEventListener("popstate", route);

// ---------- Category page ----------

function renderCategory(slug) {
    const category = categoryMap[slug];
    const grid = document.getElementById("category-grid");
    grid.innerHTML = "";

    let count = 0;
    for (let id in productsData) {
        const p = productsData[id];
        if (p.category !== category) continue;
        grid.appendChild(createCard({ id, ...p }));
        count++;
    }

    document.getElementById("category-title").innerText = headingFor(category);
    document.getElementById("category-count").innerText = count + " products";
    setView("category-view");
}

// ---------- Product page ----------

function renderDetail(productId) {
    const product = productsData[productId];
    if (!product) return;

    const bgEl = document.getElementById("detail-img-bg");
    if (bgEl) bgEl.style.backgroundImage = `url('${product.image}')`;

    document.getElementById("detail-img").src = product.image;
    document.getElementById("detail-title").innerText = product.title;
    document.getElementById("detail-price").innerText = product.price;
    document.getElementById("detail-original").innerText = product.original;
    document.getElementById("detail-badge").innerText = product.badge;
    document.getElementById("detail-desc").innerText = product.desc;
    document.getElementById("buy-now-btn").href = product.link;

    setView("detail-view");
    loadRelatedProducts(productId, product.category);
}

function loadRelatedProducts(currentId, category) {
    const slider = document.getElementById("related-slider");
    if (!slider) return;
    slider.innerHTML = "";

    for (let id in productsData) {
        const p = productsData[id];
        if (id === currentId || p.category !== category) continue;
        slider.appendChild(createCard({ id, ...p }));
    }
}
