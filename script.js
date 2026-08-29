// Product Database with Categories
const productsData = {
    "banner-special": {
        title: "Exclusive Designer Festive Kurti Combo (Special Offer)",
        price: "₹1,099",
        original: "₹2,199",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80",
        badge: "MEGA DEAL",
        desc: "Yeh hamara special featured collection hai jo sirf banner par click karne par milta hai. Premium quality, heavy embroidery, aur limited stock available!",
        link: "https://www.amazon.in/your-affiliate-id"
    },
    "kurti-1": {
        title: "Embroidered Anarkali Kurti Set with Dupatta",
        price: "₹799",
        original: "₹1,299",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80",
        badge: "20% OFF",
        category: "stylish", // <-- Yeh Stylish Kurti wale section me jayega
        desc: "Exquisite embroidered Anarkali kurti set crafted from soft rayon fabric. Comes with matching pants and a lightweight designer dupatta.",
        link: "https://www.amazon.in/your-affiliate-id"
    },
    "kurti-2": {
        title: "Printed Cotton Straight Kurti for Women",
        price: "₹499",
        original: "₹999",
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=500&q=80",
        badge: "SALE",
        category: "stylish", // <-- Yeh bhi Stylish me jayega
        desc: "Breathable pure cotton straight-cut kurti featuring vibrant block prints. Ideal for daily college or office wear.",
        link: "https://www.flipkart.com/your-affiliate-id"
    },
    "kurti-5": {
        title: "Silk Blend Festive Kurta Set with Embroidery",
        price: "₹1,299",
        original: "₹2,499",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=80",
        badge: "TRENDING",
        category: "festive", // <-- Yeh Festive Special Sets me jayega
        desc: "Premium silk blend festive collection. Royal look with intricate golden zari work around the neckline.",
        link: "https://www.flipkart.com/your-affiliate-id"
    },
    "kurti-6": {
        title: "Gota Work Kurti with Designer Palazzo",
        price: "₹899",
        original: "₹1,499",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80",
        badge: "15% OFF",
        category: "festive", // <-- Yeh bhi Festive me jayega
        desc: "Gorgeous set combining a chic short kurti paired with wide-leg comfortable palazzos.",
        link: "https://www.amazon.in/your-affiliate-id"
    }
};

// Automatic Product Loader with Safe Click Events
function loadProducts() {
    const festiveSlider = document.getElementById('festive-slider');
    const stylishSlider = document.getElementById('stylish-slider');
    
    if(!festiveSlider || !stylishSlider) return;

    festiveSlider.innerHTML = '';
    stylishSlider.innerHTML = '';

    for (let id in productsData) {
        if (id === 'banner-special') continue;

        const p = productsData[id];
        
        // Card element create kar rahe hain
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <span class="badge">${p.badge}</span>
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

        // Yahan direct click event laga rahe hain (Yeh kabhi fail nahi hota)
        card.addEventListener('click', function() {
            showDetail(id);
        });

        if (p.category === 'festive') {
            festiveSlider.appendChild(card);
        } else if (p.category === 'stylish') {
            stylishSlider.appendChild(card);
        }
    }
}

// Page load par run karne ke liye
window.onload = loadProducts;

function showDetail(productId) {
    const product = productsData[productId];
    if (!product) return;

    document.getElementById('detail-img').src = product.image;
    document.getElementById('detail-title').innerText = product.title;
    document.getElementById('detail-price').innerText = product.price;
    document.getElementById('detail-original').innerText = product.original;
    document.getElementById('sticky-price').innerText = product.price;
    document.getElementById('detail-badge').innerText = product.badge;
    document.getElementById('buy-now-btn').href = product.link;
    document.getElementById('sticky-buy-btn').href = product.link;

    document.getElementById('home-view').classList.remove('active');
    document.getElementById('detail-view').classList.add('active');
    
    window.history.pushState({view: 'detail', id: productId}, "", "#" + productId);
    window.scrollTo(0, 0);
}

function showHome() {
    document.getElementById('detail-view').classList.remove('active');
    document.getElementById('home-view').classList.add('active');
    window.scrollTo(0, 0);
}

window.addEventListener('popstate', function(event) {
    document.getElementById('detail-view').classList.remove('active');
    document.getElementById('home-view').classList.add('active');
});
