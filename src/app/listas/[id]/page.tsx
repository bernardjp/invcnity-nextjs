import React from 'react';
import { Metadata } from 'next';
import { ListType } from '@/firebase/customTypes';
import EstateCreationModal from '@/app/components/Modal/EstateCreation';
import ListCreationModal from '@/app/components/Modal/ListCreation';
import ContentWrapper from './ContentWrapper';

export const metadata: Metadata = {
  title: 'VCNITY Dashboard | IN/V',
  description: 'Dashboard that showcase all your Estates stored in IN/VCNITY.',
};

function ListPage(props: { params: { id: string } }) {
  const { params } = props;
  const [type, id] = params.id.split('_');

  return (
    <main>
      <EstateCreationModal />
      <ListCreationModal />
      <ContentWrapper listID={id} type={type as ListType} />
    </main>
  );
}

export default ListPage;
