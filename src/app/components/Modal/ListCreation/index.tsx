'use client';
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import FormInputs from './FormInputs';

function ListCreationModal(): React.ReactElement {
  const { modalState, closeModal } = useCreateResourceModal('list');

  return (
    <>
      <Modal
        isOpen={modalState.list}
        motionPreset="slideInBottom"
        size={{ base: 'sm', md: 'md' }}
        closeOnOverlayClick={false}
        onClose={() => closeModal()}
      >
        <ModalOverlay />
        <ModalContent margin="auto" borderRadius={16}>
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
            New VCNITY
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
            paddingInline={{ base: 8, md: 12 }}
            paddingBottom={8}
          >
            <FormInputs closeModal={closeModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ListCreationModal;
