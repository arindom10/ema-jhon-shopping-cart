import React from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  clearCart,
  handleIncrement,
  handleDecrement,
  children,
}) => {
  let total = 0;
  let shipping = 0;
  let quantity = 0;

  for (const product of cart) {
    quantity += product.quantity;
    total += product.price * product.quantity;
    shipping += product.shipping;
  }

  const tax = parseFloat((total * 0.1).toFixed(2));
  const grandTotal = total + shipping + tax;

  return (
    <div className="cart">
      <h3>Order Summary</h3>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${total.toFixed(2)}</p>
      <p>Total Shipping Charge: ${shipping.toFixed(2)}</p>
      <p>Tax: ${tax}</p>
      <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>

      <div className="cart-items">
        {cart.map((product) => (
          <div key={product.id} className="cart-item">
            <div className="cart-item-details">
              <p>{product.name}</p>
              <p>Unit Price: ${product.price.toFixed(2)}</p>
              <p>Quantity: {product.quantity}</p>
              <p>
                Total Item Price: $
                {(product.price * product.quantity).toFixed(2)}
              </p>
              <div className="quantity-buttons">
                <button onClick={() => handleIncrement(product.id)}>+</button>
                <button
                  onClick={() => handleDecrement(product.id)}
                  disabled={product.quantity <= 1}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={clearCart}>
        <p>Clear Cart</p>
      </button>
      {children}
    </div>
  );
};

export default Cart;
