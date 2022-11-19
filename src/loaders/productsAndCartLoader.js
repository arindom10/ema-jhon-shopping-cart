import React from "react";
import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    // het Products
    const productsData = await fetch(
        "https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json"
    );
    const products = await productsData.json();

    //  get Cart
    const savedCart = getStoredCart();
    const initialCart = [];
    for (const id in savedCart) {
        const addedProduct = products.find((product) => product.id === id);
        if (addedProduct) {
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }
    }

    return { products, initialCart };
};

export default productsAndCartLoader;
