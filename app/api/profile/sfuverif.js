import { createApiClient } from '@/api/client';

export const createProfileApi = (token = null) => {
  console.log(token);
  const apiClient = createApiClient(token);
  
  return {
    sfuverif: async (userData, userId) => {
        try {
            const response = await apiClient.post(`/api/v1/users/${userId}/check-sfu`, {
              username: userData.login,
              password: userData.password
            });
            return response;
        } catch (error) {
            console.error('SFU verification error:', error);
            throw error;
        }
    },

    changename: async (userData) => {
        try {

            const response = await apiClient.post('/api/v1/users/changeUsername',{
                newUsername: userData.newName
            });

            if (response && response.data) {
                return response.data;
            }
        
            return response;
        } catch (error) {
            console.error('SFU verification API error:', error);
        }
        }
  };
};