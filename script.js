// Product Database with Affiliate Links
const productsData = {
    "banner-special": {
        title: "Exclusive Designer Festive Kurti Combo (Special Offer)",
        price: "₹1,099",
        original: "₹2,199",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80", // Yahan aap banner ke liye koi bhi doosri image ka link daal sakte hain
        badge: "MEGA DEAL",
        desc: "Yeh hamara special featured collection hai jo sirf banner par click karne par milta hai. Premium quality, heavy embroidery, aur limited stock available!",
        link: "https://www.amazon.in/your-affiliate-id" // <-- Yahan apna special affiliate link daalein
    },
    "kurti-1": {
        title: "Embroidered Anarkali Kurti Set with Dupatta",
        price: "₹799",
        original: "₹1,299",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80",
        badge: "20% OFF",
        desc: "Exquisite embroidered Anarkali kurti set crafted from soft rayon fabric. Comes with matching pants and a lightweight designer dupatta. Perfect for ethnic wear lovers.",
        link: "https://www.amazon.in/your-affiliate-id" // <-- Yahan apna Amazon/Flipkart ka Affiliate Link daalein
    },
    "kurti-2": {
        title: "Printed Cotton Straight Kurti for Women",
        price: "₹499",
        original: "₹999",
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=500&q=80",
        badge: "SALE",
        desc: "Breathable pure cotton straight-cut kurti featuring vibrant block prints. Ideal for daily college or office wear during summer seasons.",
        link: "https://www.flipkart.com/your-affiliate-id" // <-- Yahan apna Affiliate Link daalein
    },
    "kurti-3": {
        title: "Designer Party Wear Georgette Kurti",
        price: "₹999",
        original: "₹1,599",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=500&q=80",
        badge: "NEW",
        desc: "Glamorous party wear georgette kurti with subtle sequence detailing. Lightweight, elegant, and designed to stand out at any family gathering.",
        link: "https://www.amazon.in/your-affiliate-id" // <-- Yahan apna Affiliate Link daalein
    },
    "kurti-4": {
        title: "Jaipuri Cotton Block Print Kurta Set",
        price: "₹649",
        original: "₹1,199",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=80",
        badge: "HOT",
        desc: "Authentic Jaipuri print outfit featuring rich traditional motifs. Fabric ensures long-lasting comfort and rich color retention.",
        link: "https://www.amazon.in/your-affiliate-id" // <-- Yahan apna Affiliate Link daalein
    },
    "kurti-5": {
        title: "Silk Blend Festive Kurta Set with Embroidery",
        price: "₹1,299",
        original: "₹2,499",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=80",
        badge: "TRENDING",
        desc: "Premium silk blend festive collection. Royal look with intricate golden zari work around the neckline. Best choice for weddings and festivals.",
        link: "https://www.flipkart.com/your-affiliate-id" // <-- Yahan apna Affiliate Link daalein
    },
    "kurti-6": {
        title: "Gota Work Kurti with Designer Palazzo",
        price: "₹899",
        original: "₹1,499",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80",
        badge: "15% OFF",
        desc: "Gorgeous set combining a chic short kurti paired with wide-leg comfortable palazzos highlighted with delicate Gota Patti borders.",
        link: "https://www.amazon.in/your-affiliate-id" // <-- Yahan apna Affiliate Link daalein
    }
};

function showDetail(productId) {
    const product = productsData[productId];
    if (!product) return;

    // Populate data
    document.getElementById('detail-img').src = product.image;
    document.getElementById('detail-title').innerText = product.title;
    document.getElementById('detail-price').innerText = product.price;
    document.getElementById('detail-original').innerText = product.original;
    document.getElementById('sticky-price').innerText = product.price;
    document.getElementById('detail-badge').innerText = product.badge;
    document.getElementById('buy-now-btn').href = product.link;

    // Switch views
    document.getElementById('home-view').classList.remove('active');
    document.getElementById('detail-view').classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function showHome() {
    document.getElementById('detail-view').classList.remove('active');
    document.getElementById('home-view').classList.add('active');
    window.scrollTo(0, 0);
}
```[cite: 1]

### Aapko kya karna hai:
1. Apni repository me `script.js` naam se file banakar yeh code paste kar dein[cite: 1].
2. Code ke andar jahan `"[https://www.amazon.in/your-affiliate-id](https://www.amazon.in/your-affiliate-id)"` likha hai, wahan apne product ka actual affiliate link daal dein[cite: 1].
3. Iske baad aapki website puri tarah ready ho jayegi aur mobile par chalne lagegi!
