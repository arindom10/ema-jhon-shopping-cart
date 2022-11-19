import React, { useEffect, useState } from "react";
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
        // console.log("products load before fetch");
        fetch(
            "https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json"
        )
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                // console.log("products loaded");
            });
    }, []);

    useEffect(() => {
        // console.log("Local Storage first line");
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
        // console.log("Local storage finish");
    }, [products]);

    const handleAddToCart = (selectedProduct) => {
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(
            (product) => product.id === selectedProduct.id
        );
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        } else {
            const rest = cart.filter(
                (product) => product.id !== selectedProduct.id
            );
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct.id);
    };

    return (
        <div className="shop-container">
            <div className="products-container">
                {products.map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>
                ))}
            </div>
            <div className="card-container">
                <Cart clearCart={clearCart} cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;
