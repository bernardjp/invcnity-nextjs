import React from 'react';
import { ListType } from '@/firebase/customTypes';
import DashboardTitle from '@/app/components/DashboardHandler/DashboardTitle';
import EstateTitleMenu from '@/app/components/DashboardHandler/EstateTitleMenu';

type Props = {
  params: {
    id: string;
  };
};

function EstatesDetailsPage(props: Props) {
  const { params } = props;
  const [type, id] = params.id.split('_');

  return (
    <section>
      <DashboardTitle
        title={`Estate details Page!`}
        menu={
          <EstateTitleMenu type={type as ListType} id={id} resource="estate" />
        }
      />
    </section>
  );
}

export default EstatesDetailsPage;
