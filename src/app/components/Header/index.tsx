import React from 'react';
import styles from './styles.module.css';
import RightSideContent from './RightSideContent';
import LeftSideContent from './LeftSideContent';
import AuthModal from '../Modal/Auth';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <header className={styles.header}>
      <AuthModal />
      <div className={styles.content_wrapper}>
        <LeftSideContent />
        <RightSideContent user={user} />
      </div>
    </header>
  );
};

export default Header;
