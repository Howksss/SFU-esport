'use client';

import { useState, useEffect } from 'react';
import { createAuthAPI } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';
import SendCodeButton from '@/components/modals/SendCodeButton';
import Image from 'next/image';
import TextInput from '@/components/inputs/TextInput';
import PasswordInput from '@/components/inputs/PasswordInput';

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const authAPI = createAuthAPI();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await login({
        "login": formData.email,
        "password": formData.password 
      });
      
      if (result.success) {
        onClose();
        window.location.reload();
      } else {
        setError(result.error || 'Ошибка входа');
      }
    } catch (err) {
      console.log(err);
      setError(err.message || 'Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    onSwitchToRegister();
  };

  return (
    <div className={`login-modal ${isOpen ? 'active' : ''}`}>
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

        <h2 className="modal-title">Вход</h2>
        
        <form onSubmit={handleSubmit}>
          <label className="login-modal-label">E-mail</label>
          <div className="login-modal-input">
            <TextInput 
              className="email"
              placeholder="Введите вашу почту..."
              value={formData.email}
              name = "email"
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
              <span className="wrong-code-error">{error}</span>
            </div>
          )}

          <label className="login-modal-label">Пароль</label>
          <div className="login-modal-input password-input">
            <PasswordInput
              name = "password"
              onChange={handleChange}
              placeholder="Введите пароль..."
              value={formData.password}
            />
          </div>

          <button type="submit" className="login-modal-submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Вход...
              </>
            ) : (
              'Войти'
            )}
          </button>
        </form>

        <div className="login-modal-divider"></div>

        <div className="login-modal-footer">
          <span className="login-modal-text">Еще нет аккаунта?</span>
          <button onClick={
            handleRegisterClick
          } className="login-modal-register-link" id="loginModal">Создать</button>
        </div>
      </div>
    </div>
  );
}