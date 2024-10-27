import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addToDb,
  deleteShoppingCart,
  getStoredCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find((product) => product.id === selectedProduct.id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      exists.quantity += 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
    addToDb(selectedProduct.id);
  };

  const handleIncrement = (id) => {
    const updatedCart = cart.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCart(updatedCart);
  };

  const handleDecrement = (id) => {
    const updatedCart = cart.map((product) =>
      product.id === id && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setCart(updatedCart);
  };

  return (
    <div className="flex">
      {/* Product List Section */}
      <div className="w-3/4 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Order Summary Section */}
      <div className="w-full lg:w-1/4 p-5 bg-white shadow-lg rounded-lg lg:sticky top-0 h-screen flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h2>

        <div
          className="overflow-y-auto w-full px-4"
          style={{ maxHeight: "65vh" }}
        >
          <Cart
            clearCart={clearCart}
            cart={cart}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </div>

        <Link to="/orders" className="w-full px-4">
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg shadow-md transition duration-200">
            Review Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Shop;
