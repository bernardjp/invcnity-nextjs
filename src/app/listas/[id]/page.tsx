import React from 'react';
import EstatesDashboard from '@/app/components/EstatesDashboard';

type Props = {
  params: {
    id: string;
  };
};

function ListPage(props: Props) {
  const {
    params: { id },
  } = props;

  return <EstatesDashboard listID={id} />;
}

export default ListPage;
