import React from 'react';
import { Metadata } from 'next';
import EstateCreationModal from '@/app/components/Modal/EstateCreation';
import ListCreationModal from '@/app/components/Modal/ListCreation';
import EstatesDashboard from '@/app/components/EstatesDashboard';

export const metadata: Metadata = {
  title: 'VCNITY Dashboard | IN/V',
  description: 'Dashboard that showcase all your Estates stored in IN/VCNITY.',
};

function ListPage() {
  return (
    <main>
      <EstateCreationModal />
      <ListCreationModal />
      <section>
        <EstatesDashboard />
      </section>
    </main>
  );
}

export default ListPage;
