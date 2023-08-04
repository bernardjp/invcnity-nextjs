'use client';
import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import AuthInputs from './AuthInputs';
import AuthFooter from './AuthFooter';
import OAuthButtons from './OAuthButtons';
import { useAuthModal } from '@/app/hooks/useAuthModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

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
    <>
      <Modal
        isOpen={modalState.open}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
        onClose={() => closeModal()}
      >
        <ModalOverlay />
        <ModalContent mx={{ base: 4, md: 0 }} borderRadius={12}>
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={4}
          >
            {modalTitle[modalState.view]}
          </ModalHeader>
          <ModalCloseButton borderRadius={50} />

          <ModalBody paddingInline={{ base: 12, md: 16 }}>
            <OAuthButtons />
            <Text
              color="gray.400"
              fontWeight="bold"
              fontSize={12}
              my={3}
              textAlign="center"
            >
              OR
            </Text>
            <AuthInputs />
            {/* <ResetPassword /> */}
          </ModalBody>

          <ModalFooter
            display="flex"
            flexDirection="column"
            alignItems="center"
            paddingInline={16}
            paddingTop={1}
            paddingBottom={10}
          >
            <AuthFooter />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal;
