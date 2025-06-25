'use client';

import { useState, useContext } from 'react';
import Image from 'next/image';
import TextInput from '@/components/inputs/TextInput';
import { createProfileApi } from '@/api/profile/sfuverif';
import { AuthContext } from '@/context/AuthContext';

export default function ChangeUsernameModal({ isOpen, onClose, currentUsername }) {
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const profileAPI = createProfileApi(token);

  const handleChange = (e) => {
    setNewUsername(e.target.value);
    setError(''); // Очищаем ошибку при вводе
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await profileAPI.changename({
        newName: newUsername,
      });
      
      if (!response) {
        throw new Error('Invalid server response');
      }
      
      console.log('Изменение никнейма:', { currentUsername, newUsername });
      
      // Проверка на занятость никнейма (пример)
      if (newUsername === 'anonymus1337') {
        setError('Ошибка! Имя пользователя недоступно или занято.');
        return;
      }
      
      // Если все успешно, закрываем модальное окно
      onClose();
      // Обновляем страницу после успешного изменения никнейма
      window.location.reload();
      
    } catch (err) {
      console.error('Ошибка изменения никнейма:', err);
      setError(err.message || 'Ошибка изменения никнейма');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`change-username-modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-overlay" onClick={onClose} />
      
      <div className="modal-content">
        <div className="modal-header">
          <div className="register-logo-section">
            <Image 
              src="/images/Logo.svg" 
              alt="Logo" 
              width={80}
              height={80}
              className="logo"
            />
            <div className="site-name">
              <span className="logo-large">ISIT</span>
              <span className="logo-small">.GAMING</span>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <Image 
              src="/images/Close-button.svg" 
              alt="Close" 
              width={32}
              height={32}
            />
          </button>
        </div>

        <h2 className="modal-title">Изменить никнейм</h2>
        
        <form onSubmit={handleSubmit}>
          <label className="change-username-label">Новый никнейм</label>
          <div className="change-username-input">
            <TextInput 
              className="username-input"
              placeholder="Введите новый никнейм..."
              value={newUsername}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="error-container">
              <Image 
                src="/images/Error-icon.svg" 
                alt="Error" 
                width={24}
                height={24}
                className="error-icon"
              />
              <span className="username-error">{error}</span>
            </div>
          )}

          <button type="submit" className="change-username-submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Изменение...
              </>
            ) : (
              'Изменить никнейм'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 