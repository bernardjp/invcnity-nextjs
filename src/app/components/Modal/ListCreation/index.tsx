'use client';
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';

function ListCreationModal(): React.ReactElement {
  const { modalState, closeModal } = useCreateResourceModal('list');

  return (
    <>
      <Modal
        isOpen={modalState.list}
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
            Create a new VCNITY
          </ModalHeader>
          <ModalCloseButton borderRadius={50} />

          <ModalBody paddingInline={{ base: 12, md: 16 }}>
            {/* Resource Creation Form */}
            FORM
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
            FOOTER
            {/* Resource Creation Footer */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ListCreationModal;
