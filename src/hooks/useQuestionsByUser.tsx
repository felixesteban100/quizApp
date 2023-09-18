import { useQuery } from 'react-query';
import axios from 'axios';
import { Question } from '../types';
import { API_URL } from '../constants';


function useQuestionsByUser(authToken: string) {
    return useQuery<Question[]>(
        'QuestionsByUser',
        async () => {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${API_URL}/api/v1/questions/user`,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };
            const response = await axios.request<Question[]>(config);
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

export default useQuestionsByUser