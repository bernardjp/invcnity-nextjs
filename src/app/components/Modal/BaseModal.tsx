'use client';
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react';

type Props = {
  title: string;
  modalState: boolean;
  onCloseHandler: () => void;
  body: React.ReactNode;
  footer?: React.ReactNode;
};

function BaseModal(props: Props): React.ReactElement {
  const { title, modalState, onCloseHandler, body, footer } = props;

  return (
    <>
      <Modal
        isOpen={modalState}
        motionPreset="slideInBottom"
        size={{ base: 'sm', md: 'md' }}
        closeOnOverlayClick={false}
        onClose={() => onCloseHandler()}
      >
        <ModalOverlay />
        <ModalContent mx={{ base: 4, md: 0 }} borderRadius={16}>
          <ModalHeader
            alignItems="center"
            bgColor="brand.red"
            border="2px solid white"
            borderTopLeftRadius="16px"
            borderTopRightRadius="16px"
            boxShadow="0px 10px 90px -20px rgba(188, 151, 6, 0.35)"
            color="white"
            display="flex"
            justifyContent="center"
          >
            {title}
          </ModalHeader>
          <ModalCloseButton
            border="1px solid white"
            borderRadius={50}
            color="white"
            right={4}
            top={4}
          />

          <ModalBody
            borderRadius="16px"
            paddingInline={{ base: 8, md: 14 }}
            paddingBottom={8}
          >
            {body}
          </ModalBody>
          {footer && (
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
              {footer}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default BaseModal;
