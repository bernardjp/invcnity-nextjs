'use client';
import React from 'react';
import { EstateListDoc, UserDoc } from '@/firebase/customTypes';
import DashboardTitle from '@/app/components/DashboardHandler/DashboardTitle';
import LoadingSkeleton from '@/app/components/UserDetails/LoadingSkeleton';
import { Flex, Stack } from '@chakra-ui/react';
import FormAlert from '@/app/components/FormAlert/FormAlert';
import UserDetails from '@/app/components/UserDetails';
import UserTitleMenu from '@/app/components/DashboardHandler/UserTitleMenu';
import { useGetUserData } from '@/app/hooks/useGetUserData';
import ListSnippetsList from '@/app/components/UserDetails/ListSnippetsList';

function ContentWrapper(props: { id: string }) {
  const { id } = props;
  const { data, loading, error } = useGetUserData(id);

  return (
    <section>
      <FormAlert />
      <DashboardTitle
        title={'User Profile'}
        menu={data.user?.exists() && <UserTitleMenu type={'house'} />}
      />
      <Flex justifyContent="center" direction="column">
        {data.user?.exists() && (
          <Stack gap="4rem">
            <UserDetails userData={data.user.data() as UserDoc} />
            <ListSnippetsList
              listData={data.listSnippets?.docs.map(
                (list) => list.data() as EstateListDoc
              )}
              userID={data.user.id}
            />
          </Stack>
        )}
        {loading && <LoadingSkeleton />}
        {error && <div>{`Error: ${error}`}</div>}
      </Flex>
    </section>
  );
}

export default ContentWrapper;
