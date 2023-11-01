import React from 'react';
import { Metadata } from 'next';
import ListCreationModal from '../components/Modal/ListCreation';
import ListsDashboard from '../components/ListsDashboard';
import DashboardTitle from '../components/DashboardHandler/DashboardTitle';
import CreateResourceButton from '../components/DashboardHandler/CreateResourceButton';

export const metadata: Metadata = {
  title: 'VCNITIES List | IN/V',
  description: 'Dashboard that showcase all your Estates stored in IN/VCNITY.',
};

function ListPage(): React.ReactElement {
  return (
    <>
      <ListCreationModal />
      <section>
        <DashboardTitle
          title="VCNITIES"
          actionButton={<CreateResourceButton type="list" />}
        />
        <ListsDashboard />
      </section>
    </>
  );
}

export default ListPage;
