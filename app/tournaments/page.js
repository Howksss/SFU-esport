'use client';

import Image from "next/image";
import { useState } from "react";

export default function Tournaments() {
  const [activeGame, setActiveGame] = useState('cs2');

  const games = [
    {
      id: 'dota2',
      name: 'Dota 2',
      icon: '/images/Dota2-icon.svg',
      activeIcon: '/images/Dota2-icon-active.svg'
    },
    {
      id: 'cs2',
      name: 'Counter-Strike 2',
      icon: '/images/CS2-icon.svg',
      activeIcon: '/images/CS2-icon-active.svg'
    },
    {
      id: 'valorant',
      name: 'Valorant',
      icon: '/images/Valorant-icon.svg',
      activeIcon: '/images/Valorant-icon-active.svg'
    },
    {
      id: 'lol',
      name: 'League of Legends',
      icon: '/images/LoL-icon.svg',
      activeIcon: '/images/LoL-icon-active.svg'
    }
  ];

  const handleGameClick = (gameId) => {
    setActiveGame(gameId);
  };

  return (
    <div className="tournaments-page-content">
      <div className="page-title">
        <h1>Турниры</h1>
      </div>
      <div className="tournaments-menu">
            <div className="search-bar">
                <input type="text" placeholder="Поиск по названию..." className="search-input" />
                <Image src="/images/Search-icon.svg" alt="Search Icon" className="search-icon" width={24} height={24} />
            </div>
            <div className="tournaments-tournaments-tabs">
                <span className="tournament-divider"></span>
                <span className="tab-past-tournaments">Прошедшие</span>
                <span className="tab-future-tournaments">Актуальные</span>
                <span className="tournament-divider"></span>
            </div>
            {/* <button className="create-tournament-btn">Создать турнир</button> */}
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
      </div>

  <div className="tournaments-list">
            <div className="tournament-container">
                <div className="tournament-image-section">
                    <div className="tournament-current-stage">
                        <span className="tournament-end-stage">Завершён</span>
                    </div>                
                    <Image src="/images/Tournament-image.svg" alt="Tournament Image" className="tournament-image" width={200} height={250} />
                </div>
                <div className="tournament-info">
                    <div className="tournament-header">
                        <Image src="/images/CS2-icon-active-50x50.svg" alt="CS2 Icon" className="game-icon-orange" width={50} height={50} />
                        <span className="tournament-name">SibFU Spring Cup 2076</span>
                    </div>
                    <div className="tournament-details-wrapper">
                        <div className="tournament-details">
                            <span className="tournament-date">
                                <span className="main-tournament-start-date">20.04.2077</span>
                                <span className="main-tournament-divider"></span>
                                <span className="main-tournament-end-date">28.04.2077</span>
                            </span>
                            <span className="tournament-divider"></span>
                            <span className="tournament-participants">3/10 участников</span>
                        </div>
                        <span className="tournament-format">5 vs 5, LAN</span>
                    </div>
                </div>
            </div> 

            <div className="tournament-container">
                <div className="tournament-image-section">
                    <div className="tournament-current-stage">
                        <span className="tournament-registration-stage">Регистрация</span>
                    </div>                
                    <Image src="/images/Tournament-image.svg" alt="Tournament Image" className="tournament-image" width={200} height={250} />
                </div>
                <div className="tournament-info">
                    <div className="tournament-header">
                        <Image src="/images/CS2-icon-active-50x50.svg" alt="CS2 Icon" className="game-icon-orange" width={50} height={50} />
                        <span className="tournament-name">SibFU Spring Cup 2076</span>
                    </div>
                    <div className="tournament-details-wrapper">
                        <div className="tournament-details">
                            <span className="tournament-date">
                                <span className="main-tournament-start-date">20.04.2077</span>
                                <span className="main-tournament-divider"></span>
                                <span className="main-tournament-end-date">28.04.2077</span>
                            </span>
                            <span className="tournament-divider"></span>
                            <span className="tournament-participants">3/10 участников</span>
                        </div>
                        <span className="tournament-format">5 vs 5, LAN</span>
                    </div>
                </div>
            </div>

            <div className="tournament-container">
                <div className="tournament-image-section">
                    <div className="tournament-current-stage">
                        <span className="tournament-in-progress-stage">Идёт</span>
                    </div>            
                    <Image src="/images/Tournament-image.svg" alt="Tournament Image" className="tournament-image" width={200} height={250} />
                </div>
                <div className="tournament-info">
                    <div className="tournament-header">
                        <Image src="/images/CS2-icon-active-50x50.svg" alt="CS2 Icon" className="game-icon-orange" width={50} height={50} />
                        <span className="tournament-name">SibFU Spring Cup 2076</span>
                    </div>
                    <div className="tournament-details-wrapper">
                        <div className="tournament-details">
                            <span className="tournament-date">
                                <span className="main-tournament-start-date">20.04.2077</span>
                                <span className="main-tournament-divider"></span>
                                <span className="main-tournament-end-date">28.04.2077</span>
                            </span>
                            <span className="tournament-divider"></span>
                            <span className="tournament-participants">3/10 участников</span>
                        </div>
                        <span className="tournament-format">5 vs 5, LAN</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
