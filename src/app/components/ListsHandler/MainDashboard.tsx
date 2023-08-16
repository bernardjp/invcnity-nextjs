import React from 'react';
import Link from 'next/link';
import { User } from 'firebase/auth';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';

type ListDashboardProps = {
  user: User | null | undefined;
};

function ListDashboard(props: ListDashboardProps): React.ReactElement {
  const { user } = props;
  const { openModal } = useCreateResourceModal('list');

  return (
    <section>
      <h1>Welcome {user?.displayName}</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/listas/123" style={{ padding: '1rem' }}>
          List 123
        </Link>
        <Link href="/listas/456" style={{ padding: '1rem' }}>
          List 456
        </Link>
        <Link href="/listas/789" style={{ padding: '1rem' }}>
          List 789
        </Link>
        <button style={{ padding: '1rem' }} onClick={() => openModal()}>
          Add list
        </button>
      </div>
    </section>
  );
}

export default ListDashboard;
