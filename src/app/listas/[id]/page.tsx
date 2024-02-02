import React from 'react';
import { Metadata } from 'next';
import EstateCreationModal from '@/app/components/Modal/EstateCreation';
import ListCreationModal from '@/app/components/Modal/ListCreation';
import EstatesDashboard from '@/app/components/EstatesDashboard';

export const metadata: Metadata = {
  title: 'VCNITY Dashboard | IN/V',
  description: 'Dashboard that showcase all your Estates stored in IN/VCNITY.',
};

type Props = {
  params: { id: string };
  searchParams: { type: string; name: string };
};

function ListPage({ params, searchParams }: Props) {
  return (
    <main>
      <EstateCreationModal />
      <ListCreationModal />
      <section>
        <EstatesDashboard id={params.id} params={searchParams} />
      </section>
    </main>
  );
}

export default ListPage;
