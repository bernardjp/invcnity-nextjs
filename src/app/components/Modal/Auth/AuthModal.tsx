'use client';
import React from 'react';
import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import AuthInputs from './AuthInputs';
import { useAuthModal } from '@/app/hooks/useAuthModal';

function AuthModal(): React.ReactElement {
  const { modalState, closeModal, changeView } = useAuthModal();

  return (
    <>
      <Modal
        isOpen={modalState.open}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
        onClose={() => closeModal()}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginBottom={4}
          >
            {modalState.view === 'login' && 'Login in'}
            {modalState.view === 'signup' && 'Create an account'}
            {modalState.view === 'resetPassword' && 'Reset password'}
          </ModalHeader>
          <ModalCloseButton borderRadius={50} />

          <ModalBody paddingInline={10}>
            {/* <OauthButtons /> */}
            <AuthInputs />
            {/* <ResetPassword /> */}
          </ModalBody>

          <ModalFooter
            display="flex"
            flexDirection="column"
            alignItems="center"
            paddingInline={10}
            paddingTop={0}
            paddingBottom={6}
          >
            <Text fontWeight="bold" fontSize={13}>
              {modalState.view === 'login' && (
                <>
                  First time here?
                  <Button
                    marginLeft={1}
                    colorScheme="red"
                    fontWeight="inherit"
                    fontSize="inherit"
                    variant="link"
                    onClick={() => changeView('signup')}
                  >
                    SIGN UP
                  </Button>
                </>
              )}
              {modalState.view === 'signup' && (
                <>
                  Already have an account?
                  <Button
                    marginLeft={1}
                    colorScheme="red"
                    fontWeight="inherit"
                    fontSize="inherit"
                    variant="link"
                    onClick={() => changeView('login')}
                  >
                    LOG IN
                  </Button>
                </>
              )}
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal;
