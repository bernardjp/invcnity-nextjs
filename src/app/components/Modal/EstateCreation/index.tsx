'use client';
import React from 'react';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import BaseModal from '../BaseModal';
import FormInputs from './FormInputs';
import { EstateFormInfo, ParamData } from '@/firebase/customTypes';

function EstateCreationModal({
  paramData,
}: {
  paramData: ParamData;
}): React.ReactElement {
  const { modalState, closeModal } = useCreateResourceModal('estate');
  const defaultValues = modalState.defaultValues as EstateFormInfo;

  return (
    <BaseModal
      modalState={modalState.estate}
      onCloseHandler={closeModal}
      title={`${modalState.defaultValues ? 'Edit' : 'New'} ESTATE`}
      body={
        <FormInputs
          closeModal={closeModal}
          defaultValues={defaultValues}
          action={modalState.action}
          listData={defaultValues ? defaultValues.listData : paramData}
        />
      }
    />
  );
}

export default EstateCreationModal;
