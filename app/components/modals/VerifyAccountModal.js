'use client';

import { useState, useContext } from 'react';
import Image from 'next/image';
import TextInput from '@/components/inputs/TextInput';
import PasswordInput from '@/components/inputs/PasswordInput';
import { createProfileApi } from '@/api/profile/sfuverif';
import { AuthContext } from '@/context/AuthContext';

export default function VerifyAccountModal({ isOpen, onClose, mode = 'verify', onSuccess }) {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token, user } = useContext(AuthContext);
  const profileAPI = createProfileApi(token);

  const isChangeAccountMode = mode === 'change';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await profileAPI.sfuverif({
        login: formData.login,
        password: formData.password
      }, user?.id);
      console.log('Верификация аккаунта:', formData);
      
      // Очищаем форму
      setFormData({ login: '', password: '' });
      setError('');
      
      // Уведомляем родительский компонент об успехе
      if (onSuccess) {
        onSuccess(response);
      }
      
      onClose();
    } catch (error) {
      console.error('Ошибка верификации:', error);
      setError(error.message || 'Произошла ошибка при верификации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ login: '', password: '' });
    setError('');
    onClose();
  };

  return (
    <div className={`verify-account-modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-overlay" onClick={handleClose} />
      
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
          <button className="close-button" onClick={handleClose}>
            <Image 
              src="/images/Close-button.svg" 
              alt="Close" 
              width={32}
              height={32}
            />
          </button>
        </div>

        <h2 className="modal-title">
          {isChangeAccountMode ? 'Смена аккаунта СФУ' : 'Верификация аккаунта'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <label className="verify-modal-label">Логин СФУ</label>
          <div className="verify-modal-input">
            <TextInput 
              className="verify-input"
              placeholder="Введите ваш логин СФУ..."
              value={formData.login}
              name="login"
              onChange={handleChange}
            />
          </div>

          <label className="verify-modal-label">Пароль СФУ</label>
          <div className="verify-modal-input">
            <PasswordInput
              name="password"
              onChange={handleChange}
              placeholder="Введите ваш пароль СФУ..."
              value={formData.password}
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
              <span className="wrong-code-error">{error}</span>
            </div>
          )}

          <button type="submit" className="verify-modal-submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                {isChangeAccountMode ? 'Смена аккаунта...' : 'Верификация...'}
              </>
            ) : (
              isChangeAccountMode ? 'Сменить аккаунт' : 'Верифицировать'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 