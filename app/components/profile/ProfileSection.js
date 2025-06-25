'use client';

import { useState } from "react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import VerifyAccountModal from "@/components/modals/VerifyAccountModal";
import ChangeUsernameModal from "@/components/modals/ChangeUsernameModal";

export default function ProfileSection(user) {
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
    const [isChangeUsernameModalOpen, setIsChangeUsernameModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('verify');
    const router = useRouter();
    
    console.log(user?.user)
    
    const handleVerifyClick = () => {
        setModalMode('verify');
        setIsVerifyModalOpen(true);
    };
    
    const handleCloseVerifyModal = () => {
        setIsVerifyModalOpen(false);
    };

    const handleChangeAccountClick = () => {
        setModalMode('change');
        setIsVerifyModalOpen(true);
    };

    const handleVerifySuccess = (response) => {
        console.log('Верификация успешна:', response);
        
        // Небольшая задержка перед обновлением страницы
        setTimeout(() => {
            router.refresh();
        }, 500);
    };

    const handleUsernameClick = () => {
        setIsChangeUsernameModalOpen(true);
    };

    const handleCloseChangeUsernameModal = () => {
        setIsChangeUsernameModalOpen(false);
    };
    
    return (
        <>
            <div className="profile-block">
                <div className="profile-content">
                    <Image 
                        src={user?.user?.avatarUrl ? `/uploads/${user.user.avatarUrl}` : '/images/Profile-image.svg'}
                        alt="Фото профиля" 
                        width={120} 
                        height={120}
                        className="profile-image"
                    />
                    <div className="profile-details">
                        <div className="student-info-block">
                            <p className="student-group">
                                <span className="label">Группа:</span><br/>
                                {user?.user.sfuGroup ? (
                                <span className="group-name">{`${user?.user.sfuGroup}`}</span>
                                ) : (
                                <span className="group-name">Не указана</span>
                                )}
                            </p>
                            <p className="student-info">
                                <span className="label">Студент:</span><br/>
                                {user?.user.sfuName ? (
                                <span className="group-name">{`${user?.user.sfuName}`}</span>
                                ) : (
                                <span className="group-name">Не указан</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="profile-actions-block">
                    {user?.user.verified ? (
                        <button className="change-account-btn" onClick={handleChangeAccountClick}>Сменить аккаунт</button>
                    ) : (
                        <button className="verify-account-btn" onClick={handleVerifyClick}>Верифицировать аккаунт</button>

                    )}
                    <button className="username-btn" onClick={handleUsernameClick}>
                        <span className="username-text">{`${user?.user.username}`}</span>
                        <img src="../images/Edit-icon.svg" alt="Редактировать" className="edit-icon"/>
                    </button>
                    <button className="email-btn">
                        <span className="email-text">{`${user?.user.email}`}</span>
                    </button>
                </div>
            </div>
            
            <VerifyAccountModal 
                isOpen={isVerifyModalOpen} 
                onClose={handleCloseVerifyModal}
                mode={modalMode}
                onSuccess={handleVerifySuccess}
            />
            
            <ChangeUsernameModal 
                isOpen={isChangeUsernameModalOpen} 
                onClose={handleCloseChangeUsernameModal}
                currentUsername={user?.user?.username}
            />
        </>
    )
}