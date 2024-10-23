import { useState } from 'react';
import { Product } from '../interface/AddProduct';
import axios from 'axios';

export default function useAddProductToCart() {
    const [productInCart, setProductInCart] = useState<Product[]>([]);

    const addProductToCart = (product: Product) => {
        setProductInCart((prevProducts) => {
            const updatedProducts = [...prevProducts, product];
            axios.post('http://localhost:3000/cart', product)
                .then(() => {
                    alert(`${product.title} добавлен в корзину!`);
                })
                .catch((error) => {
                    console.error('Ошибка при добавлении в корзину:', error);
                });
            return updatedProducts;
        });
    };
    return { addProductToCart, productInCart };
}
