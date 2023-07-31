'use client';
import React from 'react';
import {
  Button,
  Stack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import PasswordInput from './PasswordInput';
import { useAuthModal } from '@/app/hooks/useAuthModal';

function AuthModal(): React.ReactElement {
  const { modalState, openModal, closeModal } = useAuthModal();

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
          <ModalHeader>Login IN</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Input placeholder="Enter username" />
              <PasswordInput />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={() => closeModal()}>
              Go Back
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                console.log('logged in');
                closeModal();
              }}
            >
              Log IN
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal;
