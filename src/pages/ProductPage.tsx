import { useProduct } from '../process/useProduct';
import cl from './Product.module.css';
import { Product } from '../interface/AddProduct';
import useAddProductToCart from '../process/useAddProductToCart';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductPage() {
  const { data, isLoading } = useProduct();
  const { addProductToCart } = useAddProductToCart();
  const [selectCategory, setSelectCategory] = useState('');
  const [rangePrice, setRangePrice] = useState<number>(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      const pricesArray = data.map((product: Product) => product.price);
      setMinPrice(Math.min(...pricesArray));
      setMaxPrice(Math.max(...pricesArray));
      setRangePrice(Math.max(...pricesArray));
    }
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(event.target.value);
  };
  const handleChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRangePrice(Number(event.target.value));
  };

  const filterCategoryData = data
    ? data.filter(item =>
      item.price <= rangePrice &&
      (selectCategory ? item.category === selectCategory : true)
    )
    : [];

  return (
    <>
      <span>{rangePrice} руб.</span>
      <input
        step="5000"
        type="range"
        min={minPrice}
        max={maxPrice}
        value={rangePrice}
        onChange={handleChangeRange}
      />
      <select value={selectCategory} onChange={handleChange}>
        <option value="">Все</option>
        <option value="Game PC">Игровой компьютер</option>
        <option value="WorkStation">Рабочая станция</option>
      </select>
      <div className={cl.container}>
        {isLoading ? (
          <div className={cl.loading}>Loading...</div>
        ) : (
          filterCategoryData.map((product: Product, index: number) => (
            <div key={index} className={cl.card}>
              <Link to={`/product/${product.id}`} className={cl.link}>
                <div className={cl.title}>{product.title}</div>
                <div className={cl.price}>{`Цена: ${product.price} руб.`}</div>
                {product.specs && (
                  <div className={cl.specs}>
                    <h4>Характеристики:</h4>
                    <ul>
                      {Object.entries(product.specs).map(([key, value]) => (
                        <li key={key}>{`${key}: ${value}`}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Link>
              <button onClick={() => addProductToCart(product)}>В корзину</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
