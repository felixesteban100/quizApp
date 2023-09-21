import { useQuery } from 'react-query';
import axios from 'axios';
import { Question } from '../types';
import { API_URL } from '../constants';
import { useAuth } from '@clerk/clerk-react';
import { REACT_QUERY_DEFAULT_PROPERTIES } from '../constants'

function useQuestionsByUser(/* authToken: string */) {
    const { getToken } = useAuth();

    return useQuery<Question[]>(
        'QuestionsByUser',
        async () => {
            const tokenClerk = await getToken()
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${API_URL}/api/v1/questions/user`,
                headers: { 'Authorization': `Bearer ${tokenClerk}` }
            };
            const response = await axios.request<Question[]>(config);
            return response.data;
        },
        REACT_QUERY_DEFAULT_PROPERTIES
    );
}

export default useQuestionsByUser