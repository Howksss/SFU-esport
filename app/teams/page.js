'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import CreateTeamModal from "../components/modals/CreateTeamModal";
import { createTeamApi } from "@/api/teams/team";
import { useAuth } from '@/context/AuthContext';
import TeamOptionsDropdown from '@/components/modals/TeamOptionsDropdown';

export default function Teams() {
  const [activeGame, setActiveGame] = useState('dota2');
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
    const { user, token } = useAuth();
  
  const games = [
    {
      id: 'dota2',
      name: 'Dota 2',
      icon: '/images/Dota2-icon.svg',
      activeIcon: '/images/Dota2-icon-active.svg',
      gameId: 1
    },
    {
      id: 'cs2',
      name: 'Counter-Strike 2',
      icon: '/images/CS2-icon.svg',
      activeIcon: '/images/CS2-icon-active.svg',
      gameId: 2
    },
    {
      id: 'valorant',
      name: 'Valorant',
      icon: '/images/Valorant-icon.svg',
      activeIcon: '/images/Valorant-icon-active.svg',
      gameId: 3
    },
    {
      id: 'lol',
      name: 'League of Legends',
      icon: '/images/LoL-icon.svg',
      activeIcon: '/images/LoL-icon-active.svg',
      gameId: 4
    }
  ];

  const gameIdMapping = {
    1: 'dota2',
    2: 'cs2', 
    3: 'valorant',
    4: 'lol'
  };

  useEffect(() => {
    const loadUserTeams = async () => {
      if (!user?.teams || !Array.isArray(user.teams) || !token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const teamsData = [];
        const teamApi = createTeamApi(token);
        
        for (const team of user.teams) {
          if (team.team_id) {
            try {
              const teamData = await teamApi.findTeam({ teamId: team.team_id });
              teamsData.push(teamData);
            } catch (error) {
              console.error(`Ошибка загрузки команды ${team.team_id}:`, error);
            }
          }
        }
        
        setTeams(teamsData);
      } catch (error) {
        console.error('Ошибка загрузки команд:', error);
        setError('Ошибка при загрузке команд');
      } finally {
        setLoading(false);
      }
    };

    loadUserTeams();
  }, [user?.teams, token]);

  const handleGameClick = (gameId) => {
    setActiveGame(gameId);
  };

  const openModal = () => {
    setIsCreateTeamModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateTeamModalOpen(false);
  };

  const refreshTeams = () => {
    if (user?.teams && Array.isArray(user.teams) && token) {
      const loadUserTeams = async () => {
        try {
          setLoading(true);
          setError('');
          const teamsData = [];
          const teamApi = createTeamApi(token);
          
          for (const team of user.teams) {
            if (team.team_id) {
              try {
                const teamData = await teamApi.findTeam({ teamId: team.team_id });
                teamsData.push(teamData);
              } catch (error) {
                console.error(`Ошибка загрузки команды ${team.team_id}:`, error);
              }
            }
          }
          
          setTeams(teamsData);
        } catch (error) {
          console.error('Ошибка загрузки команд:', error);
          setError('Ошибка при загрузке команд');
        } finally {
          setLoading(false);
        }
      };

      loadUserTeams();
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      const teamApi = createTeamApi(token);
      await teamApi.deleteTeam({ teamId });
      
      // Обновляем список команд после удаления
      setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));
      
      // Показываем уведомление об успешном удалении
      alert('Команда успешно удалена');
    } catch (error) {
      console.error('Ошибка при удалении команды:', error);
      alert('Произошла ошибка при удалении команды');
    }
  };

  const getGameIcon = (gameId) => {
    const gameIdString = gameIdMapping[gameId];
    const game = games.find(g => g.id === gameIdString);
    return game ? game.icon : '/images/CS2-tournament.svg';
  };

  const getGameName = (gameId) => {
    const gameIdString = gameIdMapping[gameId];
    const game = games.find(g => g.id === gameIdString);
    return game ? game.name : 'Unknown Game';
  };

  return (
    <div className="teams-page-content">
      <div className="page-title">
        <h1>Команды</h1>
      </div>

      <div className="teams-container">
        <div className="game-icons-section">
          <div className="game-icons">
            {games.map((game) => (
              <Image
                key={game.id}
                src={activeGame === game.id ? game.activeIcon : game.icon}
                alt={game.name}
                className={`game-icon ${activeGame === game.id ? 'active' : ''}`}
                width={50}
                height={50}
                onClick={() => handleGameClick(game.id)}
              />
            ))}
          </div>
          <button className="create-team-btn" onClick={openModal}>
            Создать команду
          </button>
        </div>

        <div className="teams-list">
          {loading ? (
            <div className="loading-message">Загрузка команд...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : teams.length === 0 ? (
            <div className="no-teams-message">
              У вас пока нет команд
            </div>
          ) : (
            teams.map((team) => (
              <div key={team.id} className="team-card">
            <Image 
                  src={getGameIcon(team.gameId)} 
                  alt={getGameName(team.gameId)} 
              className="game-image"
              width={200}
              height={250}
            />
            <div className="team-content">
              <div className="team-header">
                <div className="team-info">
                      <div className="team-name">{team.name}</div>
                  <div className="players-section">
                    <div className="players-text">Участники:</div>
                        <div className="current-amount-of-players">
                          {team.members?.length || 0}
                        </div>
                    <div className="slash">/</div>
                        <div className="max-amount-of-players">
                          {team.countMembers || 5}
                        </div>
                  </div>
                </div>
                <TeamOptionsDropdown 
                  team={team}
                  onDelete={handleDeleteTeam}
                  isOwner={user?.id === team.creatorId}
                />
              </div>
              <div className="team-avatars">
                    {team.members && team.members.length > 0 ? (
                      team.members.map((member, index) => (
                        <Link key={member.id || index} href={`/profile/${member.id}`}>
                  <div className="avatar">
                    <Image 
                              src={member.avatarUrl || "/images/Profile-icon.svg"} 
                              alt={member.username || `Player ${index + 1}`}
                      width={40}
                      height={40}
                    />
                            <span>
                              {member.username || `Player ${index + 1}`}
                              {member.id === team.creatorId && ' (Лидер)'}
                            </span>
                  </div>
                </Link>
                      ))
                    ) : (
                      <div className="no-members">Нет участников</div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

        <CreateTeamModal
          isOpen={isCreateTeamModalOpen}
          onClose={closeModal}
        onRefreshTeams={refreshTeams}
        />
    </div>
  );
}
