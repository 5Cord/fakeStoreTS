import { useParams } from 'react-router-dom';
import cl from './ProductDown.module.css'; // Импортируем стили
import { useProductById } from '../process/useProductById'; // Импортируйте ваш хук

export default function Product({ addProductToCart }) {
    const { id } = useParams();

    const { data, isLoading, isError } = useProductById(id);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (isError) {
        return <div>Ошибка при загрузке данных о продукте</div>;
    }

    const handleAddToCart = () => {
        const product = { id, ...data }; // Предполагая, что данные о продукте содержат нужные поля
        addProductToCart(product);
    };

    return (
        <div className={cl.container}>
            <h2 className={cl.title}>{data.title}</h2>
            <p className={cl.price}>Цена: {data.price}₽</p>
            {data.specs && (
                <div>
                    <h4 className={cl.specsTitle}>Характеристики:</h4>
                    <ul className={cl.specsList}>
                        {Object.entries(data.specs).map(([key, value]) => (
                            <li key={key} className={cl.specsListItem}>
                                {`${key}: ${value}`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button className={cl.addToCartButton} onClick={handleAddToCart}>
                Добавить в корзину
            </button>
        </div>
    );
}
