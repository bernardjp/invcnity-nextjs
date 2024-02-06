import React from 'react';
import { Metadata } from 'next';
import EstateDetails from '../../components/EstateDetails';
import EstateCreationModal from '@/app/components/Modal/EstateCreation';
import { ListType } from '@/firebase/customTypes';

export const metadata: Metadata = {
  title: 'Estate Dashboard | IN/V',
  description: 'Dashboard used to showcase and manage the Estate information.',
};

type Props = {
  params: { id: string };
  searchParams: { type: ListType; name: string };
};

function EstatesDetailsPage({ params, searchParams }: Props) {
  return (
    <main>
      <EstateCreationModal paramData={{ ...params, ...searchParams }} />
      <section>
        <EstateDetails estateParamData={{ ...params, ...searchParams }} />
      </section>
    </main>
  );
}

export default EstatesDetailsPage;
