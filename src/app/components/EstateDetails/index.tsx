'use client';
import React from 'react';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { EstateDoc, ListType } from '@/firebase/customTypes';
import { firestore } from '@/firebase/clientApp';
import DashboardTitle from '@/app/components/DashboardHandler/DashboardTitle';
import EstateTitleMenu from '@/app/components/DashboardHandler/EstateTitleMenu';
import EstateDetails from '@/app/components/EstateDetails/EstateDetailsDisplay';
import LoadingSkeleton from '@/app/components/EstateDetails/LoadingSkeleton';
import { Flex } from '@chakra-ui/react';
import FormAlert from '@/app/components/FormAlert/FormAlert';
import CustomLink from '@/app/components/Utils/CustomLink';
import NotFoundWrapper from '@/app/components/ErrorHandling/NotFoundWrapper';
import { ThemeVariant, listVariant } from '@/style/componentsStyleConfig';

type DetailsProps = {
  id: string;
  params: {
    name: string;
    type: string;
  };
};

function ContentWrapper(props: DetailsProps) {
  const {
    id,
    params: { name, type },
  } = props;
  const [snapshot, loading, error] = useDocument(doc(firestore, 'estates', id));
  const estateData = snapshot?.exists() && (snapshot.data() as EstateDoc);

  return (
    <NotFoundWrapper notFound={Boolean(error?.message)}>
      <FormAlert />
      <DashboardTitle
        title={!loading && estateData ? name : 'Loading...'}
        menu={
          estateData && (
            <EstateTitleMenu
              type={type as ListType}
              estateID={id}
              listID={estateData.listID}
              resource={'estate'}
            />
          )
        }
        actionButton={
          <CustomLink
            url="/listas"
            variant={`${listVariant[type as ListType]}Outline` as ThemeVariant}
          >
            Go Back
          </CustomLink>
        }
        variant={`${listVariant[type as ListType]}Outline` as ThemeVariant}
      />
      <Flex justifyContent="center">
        {estateData && <EstateDetails estateData={estateData} />}
        {loading && <LoadingSkeleton />}
      </Flex>
    </NotFoundWrapper>
  );
}

export default ContentWrapper;
