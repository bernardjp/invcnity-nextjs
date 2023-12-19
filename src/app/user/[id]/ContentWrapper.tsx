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
import LoadingSnippetsList from '@/app/components/UserDetails/LoadingSnippet';

function ContentWrapper(props: { id: string }) {
  const { id } = props;
  const { data, loading } = useGetUserData(id);

  return (
    <Stack as="section" gap="4rem">
      <FormAlert />
      <>
        <div>
          <DashboardTitle
            title={'User Profile'}
            menu={data.profile?.exists() && <UserTitleMenu type={'house'} />}
          />
          <Flex justifyContent="center" direction="column">
            {data.profile?.exists() && (
              <UserDetails userData={data.profile!.data() as UserDoc} />
            )}
            {loading && <LoadingSkeleton />}
          </Flex>
        </div>
        <div>
          <DashboardTitle title={'VCNITIES Created'} />
          <Flex justifyContent="center" direction="column">
            {data.profile?.exists() && (
              <ListSnippetsList
                listData={data.snippets!.docs.map(
                  (list) => list.data() as EstateListDoc
                )}
                userID={data.profile.id}
              />
            )}
            {loading && <LoadingSnippetsList />}
          </Flex>
        </div>
      </>
    </Stack>
  );
}

export default ContentWrapper;
