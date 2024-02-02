import React from 'react';
import NotFoundError from './NotFoundError';

type Props = {
  notFound: boolean;
  children: React.ReactNode;
};

function NotFoundWrapper(props: Props) {
  const { notFound, children } = props;
  return <>{notFound ? <NotFoundError /> : children}</>;
}

export default NotFoundWrapper;
