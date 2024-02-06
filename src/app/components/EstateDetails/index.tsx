'use client';
import React from 'react';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { EstateDoc, ParamData, ListType } from '@/firebase/customTypes';
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
import { usePageTitle } from '@/app/hooks/usePageTitle';
import EstateTitle from './EstateTitle';

function ContentWrapper({ estateParamData }: { estateParamData: ParamData }) {
  const { id, name, type } = estateParamData;
  usePageTitle(name);
  const [snapshot, loading, error] = useDocument(doc(firestore, 'estates', id));
  const estateData = snapshot?.exists() && (snapshot.data() as EstateDoc);

  return (
    <NotFoundWrapper notFound={Boolean(error?.message)}>
      <FormAlert />
      <DashboardTitle
        title={
          <EstateTitle
            listData={estateData && estateData.listData}
            estateName={name}
            loading={loading}
          />
        }
        menu={
          estateData && (
            <EstateTitleMenu
              type={type as ListType}
              estateID={id}
              listID={estateData.listData.id}
              resource={'estate'}
            />
          )
        }
        actionButton={
          <CustomLink
            url={
              estateData
                ? `/listas/${estateData.listData.id}?type=${estateData.listData.type}&name=${estateData.listData.name}`
                : ''
            }
            variant={`${listVariant[type as ListType]}Outline` as ThemeVariant}
          >
            Go Back
          </CustomLink>
        }
        variant={`${listVariant[type as ListType]}Outline` as ThemeVariant}
      />
      <Flex justifyContent="center">
        {estateData && <EstateDetails estateData={estateData} estateID={id} />}
        {loading && <LoadingSkeleton />}
      </Flex>
    </NotFoundWrapper>
  );
}

export default ContentWrapper;
