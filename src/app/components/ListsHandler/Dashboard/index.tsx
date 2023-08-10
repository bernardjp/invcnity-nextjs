import React from 'react';
import { User } from 'firebase/auth';

type Props = {
  user: User | null | undefined;
};

function Dashboard(props: Props) {
  const { user } = props;

  return <div>{user?.displayName} Dashboard</div>;
}

export default Dashboard;
