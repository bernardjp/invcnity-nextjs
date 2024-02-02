import React from 'react';
import { Metadata } from 'next';
import ContentWrapper from './ContentWrapper';
import EstateCreationModal from '@/app/components/Modal/EstateCreation';

export const metadata: Metadata = {
  title: 'Estate Dashboard | IN/V',
  description: 'Dashboard used to showcase and manage the Estate information.',
};

function EstatesDetailsPage() {
  return (
    <main>
      <EstateCreationModal />
      <section>
        <ContentWrapper />
      </section>
    </main>
  );
}

export default EstatesDetailsPage;
