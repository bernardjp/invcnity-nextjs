'use client';
import React, { useEffect } from 'react';
import { useAuthModal } from '@/app/hooks/useAuthModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import BaseModal from '../BaseModal';
import AuthFooter from './AuthFooter';
import AuthBody from './AuthBody';

const modalTitle = {
  login: 'Login in',
  signup: 'Create an account',
  resetPassword: 'Reset password',
};

function AuthModal(): React.ReactElement {
  const { modalState, closeModal } = useAuthModal();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) closeModal();
  }, [user, closeModal]);

  return (
    <BaseModal
      title={modalTitle[modalState.view]}
      onCloseHandler={closeModal}
      modalState={modalState.open}
      body={<AuthBody />}
      footer={<AuthFooter />}
    />
  );
}

export default AuthModal;
