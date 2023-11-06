import React from 'react';
import { Metadata } from 'next';
import { ListType } from '@/firebase/customTypes';
import ContentWrapper from './ContentWrapper';
import EstateCreationModal from '@/app/components/Modal/EstateCreation';

export const metadata: Metadata = {
  title: 'Estate Dashboard | IN/V',
  description: 'Dashboard used to showcase and manage the Estate information.',
};

type Props = {
  params: {
    id: string;
  };
};

function EstatesDetailsPage(props: Props) {
  const { params } = props;
  const [listType, id] = params.id.split('_');

  return (
    <>
      <EstateCreationModal />
      <ContentWrapper
        id={id}
        resourceType="estate"
        listType={listType as ListType}
      />
    </>
  );
}

export default EstatesDetailsPage;
