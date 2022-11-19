import React from "react";
import "./Cart.css";

const Cart = ({ cart, clearCart }) => {
    let total = 0;
    let shipping = 0;
    let quantity = 0;

    for (const product of cart) {
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
    }

    const tax = parseFloat((total * 0.1).toFixed(2));

    const grandTotal = total + shipping + tax;

    return (
        <div className="cart">
            <h3>Order Summery</h3>
            <p>Selected Item: {quantity}</p>
            <p>Total Price: ${total}</p>
            <p>Total Shipping Charge: ${shipping}</p>
            <p>Tax: ${tax}</p>
            <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
            <button onClick={clearCart}>
                <p>Clear Cart</p>
            </button>
            <br />
            <button>
                <p>Review Order</p>
            </button>
        </div>
    );
};

export default Cart;
