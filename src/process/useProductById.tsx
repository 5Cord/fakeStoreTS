import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
const getData = async (id) => {
    return await axios.get(`http://localhost:3000/product/${id}`);
};


export function useProductById(id) {
    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['productById', id],
        queryFn: () => getData(id), // Исправляем вызов функции
        select: (data) => data.data
    });

    useEffect(() => {
        if (isSuccess) console.log('Data successes', data);
    }, [isSuccess, data]);

    useEffect(() => {
        if (isError) console.log('Data fetch error');
    }, [isError]);

    return { id, data, isLoading, isSuccess, isError };
}

