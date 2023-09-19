import React from 'react';
import LoadingCard from './LoadingCard';

function LoadingSkeleton(): React.ReactElement {
  return (
    <>
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </>
  );
}

export default LoadingSkeleton;
