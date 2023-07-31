import React from 'react';
import styles from './styles.module.css';
import RightSideContent from './RightSideContent';
import LeftSideContent from './LeftSideContent';
import AuthModal from '../Modal/Auth/AuthModal';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <AuthModal />
      <div className={styles.content_wrapper}>
        <LeftSideContent />
        <RightSideContent />
      </div>
    </header>
  );
};

export default Header;
