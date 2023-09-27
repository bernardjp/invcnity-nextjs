'use client';
import React from 'react';
import EstateCard from './EstateCard';
import ListHandler from '../DashboardHandler';
import { firestore } from '@/firebase/clientApp';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useParams } from 'next/navigation';
import { EstateDoc, ListType } from '@/firebase/customTypes';

function EstateDashboard() {
  const params = useParams();
  const [type, id] = params.id.split('_');
  const [value, loading, error] = useCollection(
    collection(firestore, `estate_lists/${id}/estateSnippets`)
  );

  return (
    <ListHandler loading={loading} error={error?.message}>
      {value &&
        value.docs.map((estate) => {
          const estateData = estate.data() as EstateDoc;

          return (
            <EstateCard
              key={estate.id}
              id={estate.id}
              estateName={estateData.estateName}
              location={estateData.location}
              price={estateData.price}
              publicationURL={estateData.publicationURL}
              locationURL={estateData.locationURL}
              type={type as ListType}
              isVisited={estateData.isVisited}
              isFavorite={estateData.isFavorite}
            />
          );
        })}
    </ListHandler>
  );
}

export default EstateDashboard;
