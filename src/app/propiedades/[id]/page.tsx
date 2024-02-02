import React from 'react';
import { Metadata } from 'next';
import ContentWrapper from './ContentWrapper';
import EstateCreationModal from '@/app/components/Modal/EstateCreation';

export const metadata: Metadata = {
  title: 'Estate Dashboard | IN/V',
  description: 'Dashboard used to showcase and manage the Estate information.',
};

type Props = {
  params: { id: string };
  searchParams: { type: string; name: string };
};

function EstatesDetailsPage({ params, searchParams }: Props) {
  return (
    <main>
      <EstateCreationModal />
      <section>
        <ContentWrapper id={params.id} params={searchParams} />
      </section>
    </main>
  );
}

export default EstatesDetailsPage;
