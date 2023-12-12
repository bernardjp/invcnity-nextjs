'use client';
import React from 'react';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { UserDoc } from '@/firebase/customTypes';
import { firestore } from '@/firebase/clientApp';
import DashboardTitle from '@/app/components/DashboardHandler/DashboardTitle';
import LoadingSkeleton from '@/app/components/UserDetails/LoadingSkeleton';
import { Flex } from '@chakra-ui/react';
import FormAlert from '@/app/components/FormAlert/FormAlert';
import UserDetails from '@/app/components/UserDetails';
import UserTitleMenu from '@/app/components/DashboardHandler/UserTitleMenu';

function ContentWrapper(props: { id: string }) {
  const { id } = props;
  const [snapshot, loading, error] = useDocument(doc(firestore, 'users', id));
  const userData = snapshot?.exists() && (snapshot.data() as UserDoc);

  return (
    <section>
      <FormAlert />
      <DashboardTitle
        title={'User Profile'}
        menu={userData && <UserTitleMenu type={'house'} />}
      />
      <Flex justifyContent="center" direction="column">
        {userData && <UserDetails userData={userData} />}
        {loading && <LoadingSkeleton />}
        {error && <div>{`Error: ${error}`}</div>}
      </Flex>
    </section>
  );
}

export default ContentWrapper;
