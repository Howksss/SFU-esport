'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createTeamApi } from '@/api/teams/team';
import { useAuth } from '@/context/AuthContext';

export default function CreateTeamModal({ isOpen, onClose, onRefreshTeams }) {
  const { user, token } = useAuth();
  const [teamName, setTeamName] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState('');
  const [isGameDropdownOpen, setIsGameDropdownOpen] = useState(false);
  const [isPlayersDropdownOpen, setIsPlayersDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const teamApi = createTeamApi(token);

  const games = [
    { value: 'dota2', label: 'Dota 2', gameId: 1 },
    { value: 'cs2', label: 'Counter-Strike 2', gameId: 2 },
    { value: 'valorant', label: 'Valorant', gameId: 3 },
    { value: 'lol', label: 'League of Legends', gameId: 4 }
  ];

  const playerCounts = [2, 3, 4, 5];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.modal-content')) {
        setIsGameDropdownOpen(false);
        setIsPlayersDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleCreateTeam = async () => {
    setError('');
    setSuccess('');
    setInviteLink('');

    if (!teamName || !selectedGame || !selectedPlayers) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (!user) {
      setError('Необходимо быть авторизованным для создания команды');
      return;
    }

    setIsLoading(true);

    try {
      const selectedGameData = games.find(g => g.value === selectedGame);
      
      const response = await teamApi.createTeam({
        name: teamName,
        id: user.id,
        gameId: selectedGameData.gameId,
        members: parseInt(selectedPlayers)
      });

      // Сохраняем пригласительную ссылку из ответа
      if (response.inviteLink || response.inviteCode) {
        setInviteLink(response.inviteLink || response.inviteCode);
      } else if (response.data && (response.data.inviteLink || response.data.inviteCode)) {
        setInviteLink(response.data.inviteLink || response.data.inviteCode);
      } else if (response.message && response.message.includes('http')) {
        // Если в сообщении есть ссылка
        const urlMatch = response.message.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch) {
          setInviteLink(urlMatch[1]);
        }
      }
      
      setSuccess('Команда успешно создана!');
      setShowSuccessModal(true);
      
      setTeamName('');
      setSelectedGame('');
      setSelectedPlayers('');
      
      if (onRefreshTeams) {
        onRefreshTeams();
      }
      
    } catch (error) {
      console.error('Ошибка при создании команды:', error);
      setError(error.message || 'Произошла ошибка при создании команды');
    } finally {
      setIsLoading(false);
    }
  };

  const selectGame = (value, label) => {
    setSelectedGame(value);
    setIsGameDropdownOpen(false);
  };

  const selectPlayers = (value) => {
    setSelectedPlayers(value);
    setIsPlayersDropdownOpen(false);
  };

  const toggleGameDropdown = (e) => {
    e.stopPropagation();
    setIsGameDropdownOpen(!isGameDropdownOpen);
    setIsPlayersDropdownOpen(false);
  };

  const togglePlayersDropdown = (e) => {
    e.stopPropagation();
    setIsPlayersDropdownOpen(!isPlayersDropdownOpen);
    setIsGameDropdownOpen(false);
  };

  const handleDropdownClick = (dropdownType) => {
    if (dropdownType === 'game') {
      setIsGameDropdownOpen(!isGameDropdownOpen);
      setIsPlayersDropdownOpen(false);
    } else if (dropdownType === 'players') {
      setIsPlayersDropdownOpen(!isPlayersDropdownOpen);
      setIsGameDropdownOpen(false);
    }
  };

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      alert(getCopyMessage());
    } catch (err) {
      console.error('Ошибка при копировании:', err);
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = inviteLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert(getCopyMessage());
    }
  };

  const isInviteLink = (text) => {
    return text && (text.startsWith('http://') || text.startsWith('https://'));
  };

  const getInviteLabel = () => {
    return isInviteLink(inviteLink) ? 'Пригласительная ссылка:' : 'Код приглашения:';
  };

  const getCopyMessage = () => {
    return isInviteLink(inviteLink) ? 'Ссылка скопирована в буфер обмена!' : 'Код скопирован в буфер обмена!';
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setInviteLink('');
    setSuccess('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`create-team-modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-overlay" onClick={showSuccessModal ? handleCloseSuccessModal : onClose}></div>
      <div className="modal-content">
        {!showSuccessModal ? (
          <>
            <div className="modal-header">
              <h2 className="success-modal-header">Создание команды</h2>
              <Image 
                src="/images/Close-button.svg" 
                alt="Закрыть модальное окно" 
                className="modal-close-btn" 
                onClick={onClose}
                width={24}
                height={24}
              />
            </div>
            
            <div className="team-name-input">
              <input 
                type="text" 
                placeholder="Введите название команды..." 
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required 
              />
            </div>
            
            <div className="selection-row">
              <div className="game-selection">
                <div className="dropdown">
                  <div className="dropdown-selected" onClick={() => handleDropdownClick('game')}>
                    <span>{selectedGame ? games.find(g => g.value === selectedGame)?.label : 'Выберите игру'}</span>
                    <Image 
                      src="/images/List-icon.svg" 
                      alt="Раскрыть список игр" 
                      className={`dropdown-arrow ${isGameDropdownOpen ? 'rotated' : ''}`}
                      width={16}
                      height={16}
                    />
                  </div>
                  {isGameDropdownOpen && (
                    <div className="dropdown-menu">
                      {games.map((game) => (
                        <div 
                          key={game.value}
                          className="dropdown-item" 
                          onClick={() => selectGame(game.value, game.label)}
                        >
                          {game.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="players-count">
                <div className="dropdown">
                  <div className="dropdown-selected" onClick={() => handleDropdownClick('players')}>
                    <span>{selectedPlayers ? selectedPlayers : 'Кол-во участников'}</span>
                    <Image 
                      src="/images/List-icon.svg" 
                      alt="Раскрыть список количества участников" 
                      className={`dropdown-arrow ${isPlayersDropdownOpen ? 'rotated' : ''}`}
                      width={16}
                      height={16}
                    />
                  </div>
                  {isPlayersDropdownOpen && (
                    <div className="dropdown-menu">
                      {playerCounts.map((count) => (
                        <div 
                          key={count}
                          className="dropdown-item" 
                          onClick={() => selectPlayers(count.toString())}
                        >
                          {count}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="leader-info">
              <Image 
                src="/images/Profile-icon.svg" 
                alt="Аватар лидера команды"
                width={40}
                height={40}
              />
              <span>{user?.username || 'Player'} (Лидер)</span>
            </div>

            {error && <div className="error-message">{error}</div>}
            
            <div className="modal-buttons">
              <button 
                className="modal-create-btn" 
                onClick={handleCreateTeam}
                disabled={isLoading}
              >
                {isLoading ? 'Создание...' : 'Создать'}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-header">
              <h2 className="success-modal-header">Команда создана!</h2>
              <Image 
                src="/images/Close-button.svg" 
                alt="Закрыть модальное окно" 
                className="modal-close-btn" 
                onClick={handleCloseSuccessModal}
                width={24}
                height={24}
              />
            </div>
            
            <div className="success-message">
              {success}
            </div>
            
            {inviteLink && (
              <>
                <div className="invite-link-label">
                  {getInviteLabel()}
                </div>
                <div className="invite-link-box">
                  <span className="invite-link">{inviteLink}</span>
                  <button className="copy-link-btn" onClick={copyInviteLink}>
                    <Image 
                      src="/images/Copy-icon.svg" 
                      alt="Копировать" 
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </>
            )}
            
            <div className="modal-buttons">
              <button 
                className="modal-create-btn" 
                onClick={handleCloseSuccessModal}
              >
                Закрыть
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 