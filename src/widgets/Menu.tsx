import { useState, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import cl from './Menu.module.css';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import useAddProductToCart from '../process/useAddProductToCart';
import { useGetCart } from '../process/useGetCart';
import Product from '../pages/Product';

export default function Menu() {
    const { data, isLoading } = useGetCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState(data || []);

    const { addProductToCart } = useAddProductToCart();

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const updateCart = (newProduct) => {
        setCartItems(prevItems => [...prevItems, newProduct]);
    };

    useEffect(() => {
        if (data) {
            setCartItems(data);
        }
    }, [data]);

    const handleAddProduct = async (product) => {
        // Локально обновляем корзину
        updateCart(product);

        try {
            // Добавляем товар на сервер
            const addedProduct = await addProductToCart(product);
            // Важно: если продукт с сервера отличается, можно обновить снова
            if (addedProduct) {
                updateCart(addedProduct); // Обновить в случае необходимости
            }
        } catch (error) {
            console.error("Ошибка при добавлении товара в корзину", error);
            // Можно сделать откат обновления корзины в случае ошибки
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <>
            <div className={cl.container_menu}>
                <div className={cl.logo_name}>Logo</div>

                <div className={cl.point_menu}>
                    <NavLink to="/" className={cl.point}>Главная</NavLink>
                    <NavLink to="/products" className={cl.point}>Продукты</NavLink>
                </div>

                <div className={cl.point_cart} onClick={toggleCart}>
                    <ShoppingCartIcon />
                </div>
            </div>

            <div className={`${cl.cart} ${isCartOpen ? cl.cart_open : ''}`}>
                <h2>Ваша корзина</h2>
                <button className={cl.close_button} onClick={toggleCart}>Закрыть</button>

                {isLoading ? (
                    <p>Загрузка...</p>
                ) : (
                    <>
                        <ul>
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <li key={item.id}>
                                        <span>{item.title}</span> - <span>{item.price}₽</span>
                                    </li>
                                ))
                            ) : (
                                <p>Корзина пуста</p>
                            )}
                        </ul>
                        {cartItems.length > 0 && (
                            <div className={cl.cart_total}>
                                <strong>Сумма:</strong> {calculateTotal()}₽
                            </div>
                        )}
                    </>
                )}
            </div>

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='products' element={<ProductPage updateCart={handleAddProduct} />} />
                <Route path='product/:id' element={<Product />} />
            </Routes>
        </>
    );
}
