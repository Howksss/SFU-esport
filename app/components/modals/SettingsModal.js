import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import PasswordInput from '@/components/inputs/PasswordInput';
import SendCodeButton from './SendCodeButton';
import { createChangeAPI } from '@/api/auth/changePassword';

export default function SettingsModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const changeApi = createChangeAPI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Валидация
    if (!newPassword || !confirmPassword) {
      setError('Все поля обязательны для заполнения');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Новые пароли не совпадают');
      return;
    }

    if (newPassword.length < 6) {
      setError('Новый пароль должен содержать минимум 6 символов');
      return;
    }

    if (!verificationCode) {
      setError('Введите код подтверждения');
      return;
    }

    setIsLoading(true);

    try {
      const response = await changeApi.changePass({
        email: user.email,
        code: verificationCode,
        newPassword: newPassword
      });

      setSuccess('Пароль успешно изменен');
      setNewPassword('');
      setConfirmPassword('');
      setVerificationCode('');
      setIsCodeSent(false);
    } catch (error) {
      console.error('Ошибка при изменении пароля:', error);
      setError(error.message || 'Ошибка при изменении пароля');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSent = () => {
    setIsCodeSent(true);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className={`settings-modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Настройки</h2>
          <button className="modal-close" onClick={onClose}>
            <img src="/images/Close-button.svg" alt="Закрыть" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-section">
            <h3 className="settings-section-title">Изменение пароля</h3>
            
            <div className="input-group">
              <label className="settings-label" htmlFor="newPassword">Новый пароль</label>
              <div className="settings-input-container">
                <PasswordInput
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Введите новый пароль"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="settings-label" htmlFor="confirmPassword">Подтвердите новый пароль</label>
              <div className="settings-input-container">
                <PasswordInput
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Подтвердите новый пароль"
                />
              </div>
            </div>

            <div className="verification-section">
              <div className="input-group">
                <label className="settings-label" htmlFor="verificationCode">Код подтверждения</label>
                <div className="code-input-container">
                  <div className="settings-code-input">
                    <input
                      type="text"
                      id="verificationCode"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Введите код"
                      className="code-input-field"
                    />
                  </div>
                  <SendCodeButton 
                    email={user?.email} 
                    onCodeSent={handleCodeSent}
                  />
                </div>
              </div>
            </div>

            {error && <div className="settings-error-message">{error}</div>}
            {success && <div className="settings-success-message">{success}</div>}

            <button
              type="submit"
              className="settings-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Изменение...' : 'Изменить пароль'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 