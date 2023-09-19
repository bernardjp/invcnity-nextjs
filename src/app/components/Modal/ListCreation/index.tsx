'use client';
import React from 'react';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import FormInputs from './FormInputs';
import BaseModal from '../BaseModal';

function ListCreationModal(): React.ReactElement {
  const { modalState, closeModal } = useCreateResourceModal('list');

  return (
    <BaseModal
      modalState={modalState.list}
      onCloseHandler={closeModal}
      title="New VCNITY"
      body={<FormInputs closeModal={closeModal} />}
    />
  );
}

export default ListCreationModal;
