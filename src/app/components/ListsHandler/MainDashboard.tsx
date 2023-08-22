import React from 'react';
import Link from 'next/link';
import { User } from 'firebase/auth';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import { ListInfoType } from '../Modal/ListCreation/utils/validation';

type ListDashboardProps = {
  user: User | null | undefined;
  listSnippets: ListInfoType[];
};

function ListDashboard(props: ListDashboardProps): React.ReactElement {
  const { user, listSnippets } = props;
  const { openModal } = useCreateResourceModal('list');

  return (
    <section>
      <h1>Welcome {user?.displayName}</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {listSnippets!.map((list) => {
          return (
            <Link
              key={list.listName}
              href={`/listas/${list.id}`}
              style={{ padding: '1rem' }}
            >
              {list.listName}
            </Link>
          );
        })}
        <button style={{ padding: '1rem' }} onClick={() => openModal()}>
          Add list
        </button>
      </div>
    </section>
  );
}

export default ListDashboard;
