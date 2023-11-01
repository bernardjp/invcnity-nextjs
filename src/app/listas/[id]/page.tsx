import React from 'react';
import { Metadata } from 'next';
import { ListType } from '@/firebase/customTypes';
import EstatesDashboard from '@/app/components/EstatesDashboard';
import EstateCreationModal from '@/app/components/Modal/EstateCreation';
import DashboardTitle from '@/app/components/DashboardHandler/DashboardTitle';
import CreateResourceButton from '@/app/components/DashboardHandler/CreateResourceButton';
import ListTitleMenu from '@/app/components/DashboardHandler/ListTitleMenu';
import ListCreationModal from '@/app/components/Modal/ListCreation';

export const metadata: Metadata = {
  title: 'VCNITY Dashboard | IN/V',
  description: 'Dashboard that showcase all your Estates stored in IN/VCNITY.',
};

function ListPage(props: { params: { id: string } }) {
  const { params } = props;
  const [type, id] = params.id.split('_');

  return (
    <>
      <EstateCreationModal />
      <ListCreationModal />
      <section>
        <DashboardTitle
          title="VCNITY Estates"
          menu={<ListTitleMenu type={type as ListType} listID={id} />}
          actionButton={<CreateResourceButton type="estate" />}
        />
        <EstatesDashboard />
      </section>
    </>
  );
}

export default ListPage;
