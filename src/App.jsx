import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import "./App.css";
import products from "./data.js";
import { useState, useEffect } from "react";

// Professional SVG Icons
const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

function App() {
  //BRANDS
  const allBrands = [...new Set(products.map(p => p.brand))];

  //State
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [sortby, setSortBy] = useState("default");

  // New states for cart sidebar and theme
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  // Update quantity in cart
  function updateCartQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  }

  // Remove item from cart
  function removeFromCart(productId) {
    setCartItems(cartItems.filter(item => item.id !== productId));
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price) * (item.quantity), 0);

  function onToggleWishlist(productID) {
    if (wishlist.includes(productID)) {
      setWishlist(wishlist.filter(id => id !== productID));
    } else {
      setWishlist([...wishlist, productID])
    }
  }

  // Filter products
  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "ALL" || product.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  // Sort products
  if (sortby === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortby === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortby === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  } else if (sortby === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        cartTotal={cartTotal}
      />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            <span className="logo-icon">◆</span>
            TechStore
          </a>

          <ul className="nav-links">
            <li><a href="#" className="nav-link">Products</a></li>
            <li><a href="#" className="nav-link">Deals</a></li>
            <li><a href="#" className="nav-link">Support</a></li>
            <li><a href="#" className="nav-link">About</a></li>
          </ul>

          <div className="nav-actions">
            {/* Theme Toggle */}
            <button
              className="theme-toggle-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <span className="theme-icon theme-icon-sun"><SunIcon /></span>
              ) : (
                <span className="theme-icon theme-icon-moon"><MoonIcon /></span>
              )}
            </button>

            {/* Cart Button */}
            <button className="cart-nav-btn" onClick={() => setIsCartOpen(true)}>
              <CartIcon />
              <span>Cart</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            {/* Wishlist Button */}
            <button className="nav-btn wishlist-btn">
              ❤️ {wishlist.length > 0 && <span className="wishlist-count">{wishlist.length}</span>}
            </button>

            <button className="nav-btn">Sign In</button>
            <button className="nav-btn primary">Shop Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Arrivals 2025</p>
          <h1 className="hero-title">
            The Future of Tech
            <br />
            <span className="hero-highlight">Is Here.</span>
          </h1>
          <p className="hero-description">
            Discover the latest in premium technology. From powerful computers
            to cutting-edge smartphones, find everything you need in one place.
          </p>
          <div className="hero-cta">
            <button className="btn-primary">Explore Products</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat">
            <span className="stat-number">200+</span>
            <span className="stat-label">Premium Products</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Customer Support</span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">
            Our most popular products loved by customers
          </p>
        </div>

        {/* Filter Controls */}
        <div className="filter-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="brand-filter">Brand:</label>
            <select
              id="brand-filter"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Brands</option>
              {allBrands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-by">Sort by:</label>
            <select
              id="sort-by"
              value={sortby}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <p>Showing {filteredProducts.length} products</p>
          {cartCount > 0 && (
            <p className="cart-total">
              Cart Total: ₹{cartTotal.toLocaleString()} ({cartCount} items)
            </p>
          )}
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map((data) => (
            <ProductCard
              key={data.id}
              id={data.id}
              image={data.image}
              name={data.name}
              price={data.price}
              originalPrice={data.originalPrice}
              discount={data.discount}
              rating={data.rating}
              isBestSeller={data.isBestSeller}
              isWishlisted={wishlist.includes(data.id)}
              onAddToCart={() => addToCart(data)}
              onToggleWishlist={() => onToggleWishlist(data.id)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 TechStore. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;