import React from 'react';
import { Metadata } from 'next';
import ContentWrapper from './ContentWrapper';

export const metadata: Metadata = {
  title: 'User Profile | IN/V',
  description: 'Dashboard that showcase all your Estates stored in IN/VCNITY.',
};

function UserPage(props: { params: { id: string } }) {
  const { params } = props;

  return <ContentWrapper id={params.id} />;
}

export default UserPage;
