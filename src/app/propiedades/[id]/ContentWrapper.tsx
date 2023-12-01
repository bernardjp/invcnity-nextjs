'use client';
import React from 'react';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { EstateDoc, ListType, ResourceType } from '@/firebase/customTypes';
import { firestore } from '@/firebase/clientApp';
import DashboardTitle from '@/app/components/DashboardHandler/DashboardTitle';
import EstateTitleMenu from '@/app/components/DashboardHandler/EstateTitleMenu';
import EstateDetails from '@/app/components/EstateDetails';
import LoadingSkeleton from '@/app/components/EstateDetails/LoadingSkeleton';
import Link from 'next/link';
import { Flex } from '@chakra-ui/react';
import FormAlert from '@/app/components/FormAlert/FormAlert';

type Props = {
  id: string;
  resourceType: ResourceType;
  listType: ListType;
};

enum FIREBASE_COLLECTIONS {
  estate = 'estates',
  list = 'estate_lists',
  user = 'users',
}

function ContentWrapper(props: Props) {
  const { id, listType = 'house', resourceType } = props;
  const [snapshot, loading, error] = useDocument(
    doc(firestore, FIREBASE_COLLECTIONS[resourceType], id)
  );
  const estateData = snapshot?.exists() && (snapshot.data() as EstateDoc);

  return (
    <section>
      <FormAlert />
      <DashboardTitle
        title={!loading && estateData ? estateData.estateName : 'Loading...'}
        menu={
          estateData && (
            <EstateTitleMenu
              type={listType}
              estateID={id}
              listID={estateData.listID}
              resource={resourceType}
            />
          )
        }
        actionButton={
          <Link
            href={
              estateData
                ? `/listas/${listType}_${estateData.listID}`
                : '/listas'
            }
          >
            Back to List
          </Link>
        }
      />
      <Flex justifyContent="center">
        {estateData && <EstateDetails estateData={estateData} />}
        {loading && <LoadingSkeleton />}
        {error && <div>{`Error: ${error}`}</div>}
      </Flex>
    </section>
  );
}

export default ContentWrapper;
