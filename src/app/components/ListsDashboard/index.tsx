import React from 'react';
import Link from 'next/link';
import { User } from 'firebase/auth';
import { useCreateResourceModal } from '@/app/hooks/useCreateResourceModal';
import { ListInfoType } from '../Modal/ListCreation/utils/validation';
import ListCard from './ListCard';

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
        {listSnippets!.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
        <button style={{ padding: '1rem' }} onClick={() => openModal()}>
          Add list
        </button>
      </div>
    </section>
  );
}

export default ListDashboard;
