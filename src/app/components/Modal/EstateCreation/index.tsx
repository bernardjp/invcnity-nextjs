'use client';
import React from 'react';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import BaseModal from '../BaseModal';
import FormInputs from './FormInputs';
import { EstateFormInfo } from '@/firebase/customTypes';

function EstateCreationModal(): React.ReactElement {
  const { modalState, closeModal } = useCreateResourceModal('estate');

  return (
    <BaseModal
      modalState={modalState.estate}
      onCloseHandler={closeModal}
      title={`${modalState.defaultValues ? 'Edit' : 'New'} ESTATE`}
      body={
        <FormInputs
          closeModal={closeModal}
          defaultValues={modalState.defaultValues as EstateFormInfo}
          action={modalState.action}
        />
      }
    />
  );
}

export default EstateCreationModal;
