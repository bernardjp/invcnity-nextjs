import React from 'react';
import { Metadata } from 'next';
import ListCreationModal from '../components/Modal/ListCreation';
import ListsDashboard from '../components/ListsDashboard';

export const metadata: Metadata = {
  title: 'VCNITIES List | IN/V',
  description: 'Dashboard that showcase all your Estates stored in IN/VCNITY.',
};

function ListPage(): React.ReactElement {
  return (
    <main>
      <ListCreationModal />
      <section>
        <ListsDashboard />
      </section>
    </main>
  );
}

export default ListPage;
