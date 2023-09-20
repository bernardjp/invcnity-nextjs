import React from 'react';
import EstateCard from './EstateCard';
import ListHandler from '../DashboardHandler';

type Props = {
  listID: string;
};

function EstateDashboard(props: Props) {
  // const { listID } = props;
  const loading = false;
  const error = { message: '' };

  return (
    <ListHandler loading={loading} error={error?.message}>
      <EstateCard />
      <EstateCard />
      <EstateCard />
      <EstateCard />
    </ListHandler>
  );
}

export default EstateDashboard;
