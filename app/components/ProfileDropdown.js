import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import AuthModalsContainer from '@/components/modals/AuthModalsContainer';
import SettingsModal from '@/components/modals/SettingsModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Avatar() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />;
  }

  const handleProfileClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setIsModalOpen(true);
      return;
    }
    router.push(`/profile/${user?.id}`);
  };

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='techn-profile-container relative' ref={menuRef}>
       {isAuthenticated ? (
       <div className="profile-section-container">
       <div 
        className="profile-section w-10 h-10 cursor-pointer relative inline-block text-center" 
          onClick={toggleMenu}
       >
             {user?.avatarUrl ? (
               <div className="profile-icon">
                 <Image
                   src="/uploads/avatar_b4e8f7dd-7faf-42a6-a706-ad851524d38f.png"
                   alt="Аватар"
                   width={40}
                   height={40}
                   className="object-cover w-full h-full"
                 />
               </div>
             ) : (
               <div className="profile-icon-text">
                 {user?.username?.[0]?.toUpperCase() || 'U'}
                 </div>
               )}
         </div>
         
         {isMenuOpen && (
           <div className="dropdown-menu-container">
             <div className="dropdown-menu">
               <Link href={`/profile/${user?.id}`}>
                 <div className="dropdown-item">
                   Профиль
                 </div>
               </Link>
               <div className="dropdown-item" onClick={handleSettingsClick}>
                 Настройки
               </div>
               <button
                 onClick={async () => {
                   await logout();
                   router.push('/');
                 }}
                 className="dropdown-item"
               >
                 Выйти
               </button>
             </div>
           </div>
         )}
               </div>
         ) : (
           <div 
         className="profile-section-not-authed cursor-pointer" 
         onClick={handleProfileClick}
           >
           <div className="profile-icon">
             <Image 
               src="/images/Profile-icon.svg" 
               alt="Профиль" 
               width={45}
               height={45}
               className="opacity-70 hover:opacity-100 transition-opacity"
             />
           </div>
        </div>
        )}

       {isModalOpen && (
         <AuthModalsContainer
           isOpen={isModalOpen}
           onClose={() => setIsModalOpen(false)}
           defaultActive="login"
         />
       )}

       {isSettingsModalOpen && (
         <SettingsModal
           isOpen={isSettingsModalOpen}
           onClose={() => setIsSettingsModalOpen(false)}
         />
       )}
     </div>
   );
}