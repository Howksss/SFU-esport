'use client';
import { useState, useEffect } from 'react';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

export default function AuthModalsContainer({ isOpen, onClose, defaultActive = 'login' }) {
  const [activeModal, setActiveModal] = useState(defaultActive);

  useEffect(() => {
    setActiveModal(defaultActive);
  }, [defaultActive]);

  if (!isOpen) return null;

  const handleSwitchToLogin = () => {
    setActiveModal('login');
  };

  const handleSwitchToRegister = () => {
    setActiveModal('register');
  };

  return (
    <>
      {activeModal === 'register' ? (
        <RegisterModal 
          isOpen={true}
          onClose={onClose}
          onSwitchToLogin={handleSwitchToLogin}
        />
      ) : (
        <LoginModal 
          isOpen={true}
          onClose={onClose}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}
    </>
  );
}