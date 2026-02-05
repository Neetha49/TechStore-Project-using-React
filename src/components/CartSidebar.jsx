import "./CartSidebar.css";

// SVG Icons for professional look
const CartIcon = () => (
    <svg className="cart-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const TrashIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

export default function CartSidebar({
    isOpen,
    onClose,
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
    cartTotal
}) {
    return (
        <>
            {/* Overlay */}
            <div
                className={`cart-sidebar-overlay ${isOpen ? "open" : ""}`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
                {/* Header */}
                <div className="cart-sidebar-header">
                    <h2>
                        <CartIcon />
                        Your Cart
                    </h2>
                    <button className="close-sidebar-btn" onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="cart-items-container">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <div className="empty-cart-icon">🛒</div>
                            <p>Your cart is empty</p>
                            <span>Add some products to get started!</span>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h4 className="cart-item-name">{item.name}</h4>
                                    <span className="cart-item-price">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </span>
                                    <div className="cart-item-controls">
                                        <div className="quantity-controls">
                                            <button
                                                className="qty-btn"
                                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                −
                                            </button>
                                            <span className="quantity-display">{item.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="remove-item-btn"
                                            onClick={() => onRemoveItem(item.id)}
                                            title="Remove item"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="cart-sidebar-footer">
                    <div className="cart-subtotal">
                        <span>Subtotal ({cartItems.reduce((t, i) => t + i.quantity, 0)} items)</span>
                        <span className="cart-subtotal-amount">₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <button
                        className="checkout-btn"
                        disabled={cartItems.length === 0}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </>
    );
}
