'use client';
import React from 'react';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { EstateDoc, ListType } from '@/firebase/customTypes';
import { firestore } from '@/firebase/clientApp';
import DashboardTitle from '@/app/components/DashboardHandler/DashboardTitle';
import EstateTitleMenu from '@/app/components/DashboardHandler/EstateTitleMenu';
import EstateDetails from '@/app/components/EstateDetails';
import LoadingSkeleton from '@/app/components/EstateDetails/LoadingSkeleton';
import { Flex } from '@chakra-ui/react';
import FormAlert from '@/app/components/FormAlert/FormAlert';
import CustomLink from '@/app/components/Utils/CustomLink';
import NotFoundWrapper from '@/app/components/ErrorHandling/NotFoundWrapper';
import { useParams } from 'next/navigation';

function ContentWrapper() {
  const params: { id: string } = useParams();
  const [listType, id] = params.id.split('_');

  const [snapshot, loading, error] = useDocument(doc(firestore, 'estates', id));
  const estateData = snapshot?.exists() && (snapshot.data() as EstateDoc);

  return (
    <NotFoundWrapper notFound={Boolean(error?.message)}>
      <FormAlert />
      <DashboardTitle
        title={!loading && estateData ? estateData.estateName : 'Loading...'}
        menu={
          estateData && (
            <EstateTitleMenu
              type={listType as ListType}
              estateID={id}
              listID={estateData.listID}
              resource={'estate'}
            />
          )
        }
        actionButton={
          <CustomLink
            url={
              estateData
                ? `/listas/${listType}_${estateData.listID}`
                : '/listas'
            }
            variant="primaryOutline"
          >
            Go Back
          </CustomLink>
        }
      />
      <Flex justifyContent="center">
        {estateData && <EstateDetails estateData={estateData} />}
        {loading && <LoadingSkeleton />}
      </Flex>
    </NotFoundWrapper>
  );
}

export default ContentWrapper;
