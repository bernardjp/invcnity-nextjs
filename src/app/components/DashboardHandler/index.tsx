import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';

type Props = {
  loading: boolean;
  error?: string;
  children: React.ReactNode;
};

function DashboardHandler(props: Props): React.ReactElement {
  const { loading, error, children } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
      }}
    >
      {error && <p>{error}</p>}
      {loading && <LoadingSkeleton />}
      {children}
    </div>
  );
}
export default DashboardHandler;
