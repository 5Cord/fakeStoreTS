import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

const getData = async () => {
    return await axios.get('http://localhost:3000/cart');
};

export function useGetCart() {
    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['cartProduct'],
        queryFn: getData,
        select: (data) => data.data,
        refetchInterval: 1000
    });

    useEffect(() => {
        if (isSuccess) console.log('Data successes', data);
    }, [isSuccess, data]);

    useEffect(() => {
        if (isError) console.log('Data fetch error');
    }, [isError]);

    return { data, isLoading, isSuccess, isError };
}
