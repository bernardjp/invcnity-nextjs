'use client';
import React, { useEffect } from 'react';
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
} from '@chakra-ui/react';
import AuthInputs from './AuthInputs';
import AuthFooter from './AuthFooter';
import OAuthButtons from './OAuthButtons';
import ResetPassword from './ResetPassword';
import { useAuthModal } from '@/app/hooks/useAuthModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

const modalTitle = {
  login: 'Login in',
  signup: 'Create an account',
  resetPassword: 'Reset password',
};

function AuthModal(): React.ReactElement {
  const { modalState, closeModal, changeView } = useAuthModal();
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
            alignItems="center"
            bgColor="brand.red"
            borderTopLeftRadius="12px"
            borderTopRightRadius="12px"
            color="white"
            display="flex"
            justifyContent="center"
            mb={6}
          >
            {modalTitle[modalState.view]}
          </ModalHeader>
          <ModalCloseButton borderRadius={50} top={3.5} color="white" />

          <ModalBody paddingInline={{ base: 8, md: 16 }}>
            {modalState.view === 'resetPassword' ? (
              <ResetPassword />
            ) : (
              <>
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
              </>
            )}
          </ModalBody>

          <ModalFooter
            display="flex"
            flexDirection="column"
            alignItems="center"
            fontSize={13}
            paddingInline={16}
            paddingTop={0}
            paddingBottom={8}
            gap={1}
          >
            {modalState.view === 'resetPassword' ? (
              <Flex>
                <Button
                  mr={1}
                  colorScheme="teal"
                  fontWeight="bold"
                  fontSize="inherit"
                  variant="link"
                  onClick={() => changeView('login')}
                >
                  LOG IN
                </Button>
                -
                <Button
                  ml={1}
                  colorScheme="teal"
                  fontWeight="bold"
                  fontSize="inherit"
                  variant="link"
                  onClick={() => changeView('signup')}
                >
                  SIGN UP
                </Button>
              </Flex>
            ) : (
              <AuthFooter />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal;
