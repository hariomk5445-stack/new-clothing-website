// ==========================================================
// 🟢 PRODUCT DATABASE — Naya product add/edit/delete SIRF yahan karo.
// Naya category chahiye? Bas "category" me naya naam likh do
// (jaise "winter", "ethnic") — uska section apne aap ban jaayega.
// Neeche wala code kabhi touch mat karna.
// ==========================================================

const productsData = {
    "banner-special": {
        title: "Exclusive Designer Festive Kurti Combo (Special Offer)",
        price: "₹1,099",
        original: "₹2,199",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80",
        badge: "MEGA DEAL",
        desc: "Yeh hamara special featured collection hai jo sirf banner par click karne par milta hai. Premium quality, heavy embroidery, aur limited stock available!",
        link: "https://www.amazon.in/your-affiliate-id"
        // Note: banner-special ko "category" mat do — ye kisi slider me nahi dikhta
    },
    "kurti-1": {
        title: "v-neck maxi dress For Womens | Party Outfit",
        price: "₹499",
        original: "₹1,199",
        image: "https://i.postimg.cc/nVS6GXTm/Chat-GPT-Image-Sep-4-2026-04-19-45-PM.png",
        badge: "60% OFF",
        category: "stylish",
        desc: "ELEGANT DESIGN: V-neck maxi dress featuring puff sleeves and cinched waist detail",
        link: "https://link.amazon/B09M3TI1v"
    },
       "kurti-189": {
        title: "Square Neck Long Sleeve Women Dress",
        price: "₹599",
        original: "₹1199",
        image: "https://i.postimg.cc/3wwh9Jnb/Chat-GPT-Image-Sep-4-2026-09-17-45-PM.png",
        badge: "SALE",
        category: "stylish",
        desc: "Material type-Polyester
Length-Midium
Occasion typeV-acations, Evening gatherings, Anniversary, Birthday, Festive - celebrations
Sleeve type-Full Sleeve
Style-Square Neck A-Line Dress For Women
Neck style - Square Neck
Country of Origin India",
        link: "https://link.amazon/B036ck1LU"
    },
    "kurti-5": {
        title: "Silk Blend Festive Kurta Set with Embroidery",
        price: "₹1,299",
        original: "₹2,499",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=80",
        badge: "TRENDING",
        category: "festive",
        desc: "Premium silk blend festive collection. Royal look with intricate golden zari work.",
        link: "https://www.flipkart.com/your-affiliate-id"
    },
    "kurti-6": {
        title: "Gota Work Kurti with Designer Palazzo",
        price: "₹899",
        original: "₹1,499",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80",
        badge: "15% OFF",
        category: "festive",
        desc: "Gorgeous set combining a chic short kurti paired with wide-leg comfortable palazzos.",
        link: "https://www.amazon.in/your-affiliate-id"
    },
    "kurti-7": {
    title: "Yahan Product Ka Naam Likho",
    price: "₹XXX",
    original: "₹XXX",
    image: "yahan image ka URL daalo",
    badge: "NEW",
    category: "Casual",
    desc: "Yahan product ka short description likho.",
    link: "yahan affiliate link daalo"
}

    // 👇 Yahan copy-paste karke naya product add karte jao:
    // "unique-id": {
    //     title: "Product Name",
    //     price: "₹XXX",
    //     original: "₹XXX",
    //     image: "image-url",
    //     badge: "SALE",
    //     category: "koi-bhi-naam",   // naya bhi chalega!
    //     desc: "Description",
    //     link: "affiliate-link"
    // }
};

// Optional: category ka pretty display title. Naam nahi doge to
// automatically "Category Collection" jaisa title ban jaayega.
const categoryLabels = {
    festive: "Festive Special Sets",
    stylish: "Stylish Kurti Sets"
};

// ==========================================================
// ⚙️ AUTOMATIC RENDERING ENGINE — isse neeche kuch bhi touch mat karna.
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    checkUrlForProduct();
});

function checkUrlForProduct() {
    const hash = window.location.hash.replace('#', '');
    if (hash && productsData[hash]) {
        showDetail(hash);
    }
}

function loadProducts() {
    const container = document.getElementById("sections-container");
    if (!container) return;

    container.innerHTML = "";

    const grouped = {};
    for (let id in productsData) {
        const p = productsData[id];
        if (!p.category) continue; // banner-special jaise no-category items skip
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
        <span class="badge">${p.badge || ""}</span>
        <div class="card-img-wrapper">
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

function showDetail(productId) {
    const product = productsData[productId];
    if (!product) return;

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
function loadRelatedProducts(currentId, category) {
    const relatedSlider = document.getElementById('related-slider');
    if (!relatedSlider) return;

    relatedSlider.innerHTML = '';

    for (let id in productsData) {
        const p = productsData[id];
        if (id === currentId) continue;       // khud ko skip karo
        if (p.category !== category) continue; // sirf same category

        const card = createCard({ id, ...p });
        relatedSlider.appendChild(card);
    }
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
