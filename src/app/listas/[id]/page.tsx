import React from 'react';
import { Metadata } from 'next';
import EstatesDashboard from '@/app/components/EstatesDashboard';
import EstateCreationModal from '@/app/components/Modal/EstateCreation';
import DashboardTitle from '@/app/components/DashboardHandler/DashboardTitle';

export const metadata: Metadata = {
  title: 'VCNITY Dashboard',
  description: 'Dashboard that showcase all your Estates stored in IN/VCNITY.',
};

type Props = {
  params: {
    id: string;
  };
};

function ListPage(props: Props) {
  const {
    params: { id },
  } = props;

  return (
    <>
      <EstateCreationModal />
      <section>
        <DashboardTitle type="estate" title="VCNITY Estates" />
        <EstatesDashboard listID={id} />
      </section>
    </>
  );
}

export default ListPage;
