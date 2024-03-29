import React from 'react';
import { Metadata } from 'next';
import DashboardTitle from '../components/DashboardHandler/DashboardTitle';

export const metadata: Metadata = {
  title: 'User Profile | IN/V',
  description: 'Dashboard that showcase all your Estates stored in IN/VCNITY.',
};

function UserPage(): React.ReactElement {
  return (
    <main>
      <section>
        <DashboardTitle title="User Profile" />
      </section>
    </main>
  );
}

export default UserPage;
