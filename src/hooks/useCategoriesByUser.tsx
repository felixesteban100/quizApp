import { useQuery } from 'react-query';
import axios from 'axios';
import { Category } from '../types';
import { API_URL } from '../constants';


function useCategoriesByUser(authToken: string) {
    return useQuery<Category[]>(
        'CategoriesUser',
        async () => {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${API_URL}/api/v1/categories/user`,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };
            const response = await axios.request<Category[]>(config);
            return response.data;
        },
        {
            enabled: true,
            refetchOnMount: true,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onError: (error) => console.log(error),
        }
    );
}

export default useCategoriesByUser