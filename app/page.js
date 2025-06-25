'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState('future'); // 'past' или 'future'

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="index-page-content">
      <div className="page-title">
        <h1>Главная</h1>
      </div>
      <div className="main-content">
        <div className="games-window">
          <div className="game-item">
            <Link href="/tournaments">
              <Image 
                src="/images/CS2-tournament.svg" 
                alt="Counter-Strike 2" 
                className="game-image"
                width={200}
                height={250}
              />
            </Link>
            <span className="game-title">Counter-Strike 2</span>
          </div>
          <div className="game-item">
            <Link href="/tournaments">
              <Image 
                src="/images/Dota2-tournament.svg" 
                alt="Dota 2" 
                className="game-image"
                width={200}
                height={250}
              />
            </Link>
            <span className="game-title">Dota 2</span>
          </div>
          <div className="game-item">
            <Link href="/tournaments">
              <Image 
                src="/images/Valorant-tournament.svg" 
                alt="Valorant" 
                className="game-image"
                width={200}
                height={250}
              />
            </Link>
            <span className="game-title">Valorant</span>
          </div>
          <div className="game-item">
            <Link href="/tournaments">
              <Image 
                src="/images/LoL-tournament.svg" 
                alt="League of Legends" 
                className="game-image"
                width={200}
                height={250}
              />
            </Link>
            <span className="game-title">League of Legends</span>
          </div>
          <div className="game-item">
            <Link href="/tournaments">
              <Image 
                src="/images/StarCraft2-tournament.svg" 
                alt="StarCraft 2" 
                className="game-image"
                width={200}
                height={250}
              />
            </Link>
            <span className="game-title">StarCraft 2</span>
          </div>
          <div className="game-item">
            <Link href="/tournaments">
              <Image 
                src="/images/Tekken8-tournament.svg" 
                alt="Tekken 8" 
                className="game-image"
                width={200}
                height={250}
              />
            </Link>
            <span className="game-title">Tekken 8</span>
          </div>
        </div>

        <div className="tournaments-window">
          <div className="tournaments-header">
            <h2>Турниры</h2>
          </div>
          <div className="tournaments-tabs">
            <span 
              className={`tab-past-tournaments ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => handleTabClick('past')}
            >
              Прошедшие
            </span>
            <span 
              className={`tab-future-tournaments ${activeTab === 'future' ? 'active' : ''}`}
              onClick={() => handleTabClick('future')}
            >
              Будущие
            </span>
          </div>
          
          <div className="tournaments-list">
            <div className="tournament-item">
              <Link href="/tournaments">
                <Image 
                  src="/images/CS2-icon-active-50x50.svg" 
                  alt="CS2" 
                  className="game-icon-50x50"
                  width={50}
                  height={50}
                />
              </Link>
              <div className="tournament-info">
                <Link href="/tournaments">
                  <span className="tournament-name">SibFU Spring Cup 2047</span>
                </Link>
                <span className="tournament-format">Best of 3, LAN</span>
              </div>
              <div className="tournament-date">
                <span className="main-tournament-start-date">27.04.2023</span>
                <span className="separator">—</span>
                <span className="main-tournament-end-date">01.05.2023</span>
              </div>
            </div>
            
            <div className="tournament-item">
              <Link href="/tournaments">
                <Image 
                  src="/images/Dota2-icon-active-50x50.svg" 
                  alt="Dota 2" 
                  className="game-icon-50x50"
                  width={50}
                  height={50}
                />
              </Link>
              <div className="tournament-info">
                <Link href="/tournaments">
                  <span className="tournament-name">SibFU Spring Cup 2047</span>
                </Link>
                <span className="tournament-format">Best of 3, LAN</span>
              </div>
              <div className="tournament-date">
                <span className="main-tournament-start-date">27.04.2023</span>
                <span className="separator">—</span>
                <span className="main-tournament-end-date">01.05.2023</span>
              </div>
            </div>
            <div className="tournament-item">
              <Link href="/tournaments">
                <Image 
                  src="/images/Valorant-icon-active-50x50.svg" 
                  alt="Valorant" 
                  className="game-icon-50x50"
                  width={50}
                  height={50}
                />
              </Link>
              <div className="tournament-info">
                <Link href="/tournaments">
                  <span className="tournament-name">SibFU Spring Cup 2047</span>
                </Link>
                <span className="tournament-format">Best of 3, LAN</span>
              </div>
              <div className="tournament-date">
                <span className="main-tournament-start-date">27.04.2023</span>
                <span className="separator">—</span>
                <span className="main-tournament-end-date">01.05.2023</span>
              </div>
            </div>
            <div className="tournament-item">
              <Link href="/tournaments">
                <Image 
                  src="/images/LoL-icon-active-50x50.svg" 
                  alt="LoL" 
                  className="game-icon-50x50"
                  width={50}
                  height={50}
                />
              </Link>
              <div className="tournament-info">
                <Link href="/tournaments">
                  <span className="tournament-name">SibFU Spring Cup 2047</span>
                </Link>
                <span className="tournament-format">Best of 3, LAN</span>
              </div>
              <div className="tournament-date">
                <span className="main-tournament-start-date">27.04.2023</span>
                <span className="separator">—</span>
                <span className="main-tournament-end-date">01.05.2023</span>
              </div>
            </div>
            <div className="tournament-item">
              <Link href="/tournaments">
                <Image 
                  src="/images/CS2-icon-active-50x50.svg" 
                  alt="CS2" 
                  className="game-icon-50x50"
                  width={50}
                  height={50}
                />
              </Link>
              <div className="tournament-info">
                <Link href="/tournaments">
                  <span className="tournament-name">SibFU Spring Cup 2047</span>
                </Link>
                <span className="tournament-format">Best of 3, LAN</span>
              </div>
              <div className="tournament-date">
                <span className="main-tournament-start-date">27.04.2023</span>
                <span className="separator">—</span>
                <span className="main-tournament-end-date">01.05.2023</span>
              </div>
            </div>
            <div className="tournament-item">
              <Link href="/tournaments">
                <Image 
                  src="/images/Dota2-icon-active-50x50.svg" 
                  alt="Dota 2" 
                  className="game-icon-50x50"
                  width={50}
                  height={50}
                />
              </Link>
              <div className="tournament-info">
                <Link href="/tournaments">
                  <span className="tournament-name">SibFU Spring Cup 2047</span>
                </Link>
                <span className="tournament-format">Best of 3, LAN</span>
              </div>
              <div className="tournament-date">
                <span className="main-tournament-start-date">27.04.2023</span>
                <span className="separator">—</span>
                <span className="main-tournament-end-date">01.05.2023</span>
              </div>
            </div>
            <div className="tournament-item">
              <Link href="/tournaments">
                <Image 
                  src="/images/Valorant-icon-active-50x50.svg" 
                  alt="Valorant" 
                  className="game-icon-50x50"
                  width={50}
                  height={50}
                />
              </Link>
              <div className="tournament-info">
                <Link href="/tournaments">
                  <span className="tournament-name">SibFU Spring Cup 2047</span>
                </Link>
                <span className="tournament-format">Best of 3, LAN</span>
              </div>
              <div className="tournament-date">
                <span className="main-tournament-start-date">27.04.2023</span>
                <span className="separator">—</span>
                <span className="main-tournament-end-date">01.05.2023</span>
              </div>
            </div>
            <div className="tournament-item">
              <Link href="/tournaments">
                <Image 
                  src="/images/LoL-icon-active-50x50.svg" 
                  alt="LoL" 
                  className="game-icon-50x50"
                  width={50}
                  height={50}
                />
              </Link>
              <div className="tournament-info">
                <Link href="/tournaments">
                  <span className="tournament-name">SibFU Spring Cup 2047</span>
                </Link>
                <span className="tournament-format">Best of 3, LAN</span>
              </div>
              <div className="tournament-date">
                <span className="main-tournament-start-date">27.04.2023</span>
                <span className="separator">—</span>
                <span className="main-tournament-end-date">01.05.2023</span>
              </div>
            </div>
          </div>
          <div className="tournaments-footer">
            <Link href="/tournaments" className="all-tournaments-btn">Все турниры</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
