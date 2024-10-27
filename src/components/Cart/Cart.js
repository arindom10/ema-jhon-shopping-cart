import React from "react";
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
    <div className="cart w-full p-5 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
      <p className="text-gray-700">
        Selected Items: <span className="font-bold">{quantity}</span>
      </p>
      <p className="text-gray-700">
        Total Price: <span className="font-bold">${total.toFixed(2)}</span>
      </p>
      <p className="text-gray-700">
        Total Shipping Charge:{" "}
        <span className="font-bold">${shipping.toFixed(2)}</span>
      </p>
      <p className="text-gray-700">
        Tax: <span className="font-bold">${tax}</span>
      </p>
      <h4 className="text-lg font-bold mt-2">
        Grand Total:{" "}
        <span className="text-blue-600">${grandTotal.toFixed(2)}</span>
      </h4>

      <div className="cart-items mt-4 space-y-4">
        {cart.map((product) => (
          <div
            key={product.id}
            className="cart-item p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div className="cart-item-details">
              <p className="text-gray-800 font-medium">{product.name}</p>
              <p className="text-gray-600">
                Unit Price:{" "}
                <span className="font-bold">${product.price.toFixed(2)}</span>
              </p>
              <p className="text-gray-600">
                Quantity: <span className="font-bold">{product.quantity}</span>
              </p>
              <p className="text-gray-600">
                Total Item Price:{" "}
                <span className="font-bold">
                  ${(product.price * product.quantity).toFixed(2)}
                </span>
              </p>
            </div>
            <div className="quantity-buttons flex space-x-2">
              <button
                onClick={() => handleIncrement(product.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded transition duration-200"
              >
                +
              </button>
              <button
                onClick={() => handleDecrement(product.id)}
                disabled={product.quantity <= 1}
                className={`bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition duration-200 ${
                  product.quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={clearCart}
        className="mt-5 w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 rounded-lg transition duration-200"
      >
        Clear Cart
      </button>
      {children}
    </div>
  );
};

export default Cart;
