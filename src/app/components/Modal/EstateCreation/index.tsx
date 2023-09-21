'use client';
import React from 'react';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import BaseModal from '../BaseModal';
import FormInputs from './FormInputs';

function EstateCreationModal(): React.ReactElement {
  const { modalState, closeModal } = useCreateResourceModal('estate');

  return (
    <BaseModal
      modalState={modalState.estate}
      onCloseHandler={closeModal}
      title="New Estate"
      body={<FormInputs closeModal={closeModal} />}
    />
  );
}

export default EstateCreationModal;
