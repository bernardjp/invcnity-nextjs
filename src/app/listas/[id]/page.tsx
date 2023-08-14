import React from 'react';
import ListDashboard from '@/app/components/ListsHandler/ListDashboard';

type Props = {
  params: {
    id: string;
  };
};

function ListPage(props: Props) {
  const {
    params: { id },
  } = props;

  return <ListDashboard listID={id} />;
}

export default ListPage;
