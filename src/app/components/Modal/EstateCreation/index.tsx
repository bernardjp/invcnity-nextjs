'use client';
import React from 'react';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import BaseModal from '../BaseModal';

function EstateCreationModal(): React.ReactElement {
  const { modalState, closeModal } = useCreateResourceModal('estate');

  return (
    <BaseModal
      modalState={modalState.estate}
      onCloseHandler={closeModal}
      title="New Estate"
      body={<p>CREATE ESTATE INPUTS</p>}
    />
  );
}

export default EstateCreationModal;
