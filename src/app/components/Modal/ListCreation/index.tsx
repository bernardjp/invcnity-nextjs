'use client';
import React from 'react';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import FormInputs from './FormInputs';
import BaseModal from '../BaseModal';
import { ListFormInfo } from '@/firebase/customTypes';

function ListCreationModal(): React.ReactElement {
  const { modalState, closeModal } = useCreateResourceModal('list');

  return (
    <BaseModal
      modalState={modalState.list}
      onCloseHandler={closeModal}
      title={`${modalState.defaultValues ? 'Edit' : 'New'} VCNITY`}
      body={
        <FormInputs
          closeModal={closeModal}
          defaultValues={modalState.defaultValues as ListFormInfo}
          action={modalState.action}
        />
      }
    />
  );
}

export default ListCreationModal;
