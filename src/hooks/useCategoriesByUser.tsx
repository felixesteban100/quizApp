import { useQuery } from 'react-query';
import axios from 'axios';
import { Category } from '../types';
import { API_URL } from '../constants';
import { useAuth } from '@clerk/clerk-react';
import { REACT_QUERY_DEFAULT_PROPERTIES } from '../constants'

function useCategoriesByUser(/* authToken: string */) {
    const { getToken } = useAuth()
    return useQuery<Category[]>(
        'CategoriesUser',
        async () => {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${API_URL}/api/v1/categories/user`,
                headers: { 'Authorization': `Bearer ${await getToken()}`}
            };
            const response = await axios.request<Category[]>(config);
            return response.data;
        },
        REACT_QUERY_DEFAULT_PROPERTIES
    );
}

export default useCategoriesByUser