import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
const getData = async () => {
    return await axios.get('http://localhost:3000/product')
}

export function useProduct() {

    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['product'],
        queryFn: getData,
        select: (data) => data.data
    })

    useEffect(() => {
        if (isSuccess) console.log('Data successes', data)
    }, [isSuccess, data]) 

    useEffect(() => {
        if (isError) console.log('Data fetch error')
    }, [isError]) 
    return { data, isLoading, isSuccess, isError };
}
