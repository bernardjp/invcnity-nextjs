import React from 'react';
import { Metadata } from 'next';
import ListCreationModal from '../components/Modal/ListCreation';
import ListsDashboard from '../components/ListsDashboard';
import DashboardTitle from '../components/DashboardHandler/DashboardTitle';

export const metadata: Metadata = {
  title: 'IN/VCNITY Lists',
  description: 'Dashboard that showcase all your Estates stored in IN/VCNITY.',
};

function ListPage(): React.ReactElement {
  return (
    <>
      <ListCreationModal />
      <section>
        <DashboardTitle type="list" title="VCNITIES" />
        <ListsDashboard />
      </section>
    </>
  );
}

export default ListPage;
