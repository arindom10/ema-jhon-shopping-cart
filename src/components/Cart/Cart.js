import React from "react";

const Cart = ({ cart }) => {
    return (
        <div>
            <h3>Order Summery</h3>
            <p>Selected Item: {cart.length}</p>
            <p>Total Price: ${}</p>
            <p>Total Shipping Charge: ${}</p>
            <p>Tax: ${}</p>
            <h3>Grand Total: ${}</h3>
            <button>
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
