const productsData = {
    "banner-special": {
        title: "Exclusive Designer Festive Kurti Combo (Special Offer)",
        price: "₹1,099",
        original: "₹2,199",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80",
        badge: "MEGA DEAL",
        desc: "Yeh hamara special featured collection hai jo sirf banner par click karne par milta hai.",
        link: "https://www.amazon.in/your-affiliate-id"
    },
    "kurti-1": {
        title: "Embroidered Anarkali Kurti Set with Dupatta",
        price: "₹799",
        original: "₹1,299",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80",
        badge: "20% OFF",
        desc: "Exquisite embroidered Anarkali kurti set crafted from soft rayon fabric.",
        link: "https://www.amazon.in/your-affiliate-id"
    },
    "kurti-5": {
        title: "Silk Blend Festive Kurta Set with Embroidery",
        price: "₹1,299",
        original: "₹2,499",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=80",
        badge: "TRENDING",
        desc: "Premium silk blend festive collection. Royal look with intricate golden zari work.",
        link: "https://www.flipkart.com/your-affiliate-id"
    }
};

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
