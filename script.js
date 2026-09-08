// ==========================================================
// 🟢 SIRF EK JAGAH — apna Google Sheet CSV link yahan daalo
// ==========================================================
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQPVV5jDysJKU4ZcvoEBHDggB_5eeeGnJLnlFGOFdy5iHDY65KwbCPmZg4FEVk_43JCVuidorw3Fgpg/pub?output=csv";

let productsData = {};

const categoryLabels = {
    festive: "Festive Special Sets",
    stylish: "Stylish Kurti Sets"
};

// ==========================================================
// ⚙️ AUTOMATIC ENGINE — isse touch karne ki zaroorat nahi
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
    fetchProductsFromSheet();
});

function fetchProductsFromSheet() {
    const container = document.getElementById("sections-container");
    if (container) container.innerHTML = "<p style='padding:20px;text-align:center;color:#999;'>Loading products...</p>";

    Papa.parse(SHEET_CSV_URL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            productsData = {};
            results.data.forEach(row => {
                if (!row.id) return;
                productsData[row.id.trim()] = {
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
            loadProducts();
            checkUrlForProduct();
        },
        error: function(err) {
            console.error("Sheet load error:", err);
            if (container) container.innerHTML = "<p style='padding:20px;text-align:center;color:red;'>Products load nahi ho paaye. Sheet link check karo.</p>";
        }
    });
}

function loadProducts() {
    const container = document.getElementById("sections-container");
    if (!container) return;

    container.innerHTML = "";

    const grouped = {};
    for (let id in productsData) {
        const p = productsData[id];
        if (!p.category) continue;
        if (!grouped[p.category]) grouped[p.category] = [];
        grouped[p.category].push({ id, ...p });
    }

    Object.keys(grouped).forEach(category => {
        const sectionTitle = categoryLabels[category] || autoTitle(category);
        const sliderId = `${category}-slider`;

        const section = document.createElement("section");
        section.className = "product-set";
        section.innerHTML = `
            <div class="set-header">
                <h2>${sectionTitle}</h2>
                <span class="see-all">Swipe &rarr;</span>
            </div>
            <div class="horizontal-slider" id="${sliderId}"></div>
        `;
        container.appendChild(section);

        const slider = section.querySelector(`#${sliderId}`);
        grouped[category].forEach(p => {
            slider.appendChild(createCard(p));
        });
    });
}

function autoTitle(category) {
    const formatted = category.charAt(0).toUpperCase() + category.slice(1);
    return `${formatted} Collection`;
}

function createCard(p) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
        <div class="card-img-wrapper">
            <div class="img-bg" style="background-image:url('${p.image}')"></div>
            <span class="badge">${p.badge || ""}</span>
            <img src="${p.image}" alt="${p.title}">
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

function loadRelatedProducts(currentId, category) {
    const relatedSlider = document.getElementById('related-slider');
    if (!relatedSlider) return;

    relatedSlider.innerHTML = '';

    for (let id in productsData) {
        const p = productsData[id];
        if (id === currentId) continue;
        if (p.category !== category) continue;

        const card = createCard({ id, ...p });
        relatedSlider.appendChild(card);
    }
}

function checkUrlForProduct() {
    const hash = window.location.hash.replace('#', '');
    if (hash && productsData[hash]) {
        showDetail(hash);
    }
}

function showDetail(productId) {
    const product = productsData[productId];
    if (!product) return;

    const bgEl = document.getElementById('detail-img-bg');
    if (bgEl) bgEl.style.backgroundImage = `url('${product.image}')`;

    document.getElementById('detail-img').src = product.image;
    document.getElementById('detail-title').innerText = product.title;
    document.getElementById('detail-price').innerText = product.price;
    document.getElementById('detail-original').innerText = product.original;
    document.getElementById('detail-badge').innerText = product.badge;
    document.getElementById('detail-desc').innerText = product.desc;
    document.getElementById('buy-now-btn').href = product.link;

    document.getElementById('home-view').classList.remove('active');
    document.getElementById('detail-view').classList.add('active');

    window.history.pushState({view: 'detail', id: productId}, "", "#" + productId);
    window.scrollTo(0, 0);

    loadRelatedProducts(productId, product.category);
}

function showHome() {
    document.getElementById('detail-view').classList.remove('active');
    document.getElementById('home-view').classList.add('active');
    window.scrollTo(0, 0);
    window.history.pushState({view: 'home'}, "", window.location.pathname);
}

window.addEventListener('popstate', function(event) {
    const hash = window.location.hash.replace('#', '');
    if (hash && productsData[hash]) {
        showDetail(hash);
    } else {
        document.getElementById('detail-view').classList.remove('active');
        document.getElementById('home-view').classList.add('active');
    }
});
