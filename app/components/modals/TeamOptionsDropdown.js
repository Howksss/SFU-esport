'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function TeamOptionsDropdown({ team, onDelete, isOwner }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить команду? Это действие нельзя отменить.')) {
      try {
        await onDelete(team.id);
        setIsOpen(false);
      } catch (error) {
        console.error('Ошибка при удалении команды:', error);
        alert('Произошла ошибка при удалении команды');
      }
    }
  };

  return (
    <div className="team-options-dropdown" ref={dropdownRef}>
      <div className="more-options" onClick={handleToggle}>
        •••
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          {isOwner && (
            <div className="dropdown-item delete-item" onClick={handleDelete}>
              <Image 
                src="/images/Delete-icon.svg" 
                alt="Удалить команду" 
                width={16} 
                height={16}
              />
              <span>Удалить команду</span>
            </div>
          )}
          {!isOwner && (
            <div className="dropdown-item">
              <span>Покинуть команду</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 