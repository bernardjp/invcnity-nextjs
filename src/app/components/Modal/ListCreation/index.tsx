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
        size={{ base: 'md', md: 'lg' }}
        closeOnOverlayClick={false}
        onClose={() => closeModal()}
      >
        <ModalOverlay />
        <ModalContent mx={{ base: 4, md: 0 }} borderRadius={12}>
          <ModalHeader
            alignItems="center"
            boxShadow="0px 10px 90px -20px rgba(188, 151, 6, 0.35)"
            display="flex"
            justifyContent="center"
          >
            Create a new VCNITY
          </ModalHeader>
          <ModalCloseButton borderRadius={50} />

          <ModalBody paddingInline={{ base: 12, md: 16 }} paddingBottom={8}>
            <FormInputs />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ListCreationModal;
