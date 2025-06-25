import { createApiClient } from '@/api/client';

export const createTeamApi= (token = null) => {
  const apiClient = createApiClient(token);
  
  return {
    createTeam: async (userData) => {
        const response = await apiClient.post('/api/v1/teams', {
        name: userData.name,
        creatorId: userData.id,
        logoUrl: "",
        gameId: userData.gameId,
        countMembers: userData.members
    });
        return response;
    },
    findTeam: async (userData) => {
        const response = await apiClient.get(`/api/v1/teams/${userData.teamId}`)
        return response
    },
    deleteTeam: async(userData) => {
        const response = await apiClient.delete(`/api/v1/teams/${userData.teamId}`)
        return response
    },
  };
};