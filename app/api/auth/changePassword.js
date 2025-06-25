import { createApiClient } from '@/api/client';

export const createChangeAPI = () => {
  const apiClient = createApiClient();
  
  return {
    changePass: (userData) => 
      apiClient.noAuthPost('/api/v1/users/changePassword', userData),  
  };
};