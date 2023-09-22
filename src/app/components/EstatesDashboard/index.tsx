'use client';
import React from 'react';
import EstateCard from './EstateCard';
import ListHandler from '../DashboardHandler';
import { firestore } from '@/firebase/clientApp';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useParams } from 'next/navigation';

function EstateDashboard() {
  const params = useParams();
  const [value, loading, error] = useCollection(
    collection(firestore, `estate_lists/${params.id}/estateSnippets`)
  );

  return (
    <ListHandler loading={loading} error={error?.message}>
      {value &&
        value.docs.map((estate) => {
          const estateData = estate.data();
          return (
            <EstateCard
              key={estate.id}
              id={estate.id}
              estateName={estateData.estateName}
              type={'countryside'} // Mocked value
              isVisited={true} // Mocked value
              isFavorite={true} // Mocked value
              location={estateData.location}
              price={estateData.price}
            />
          );
        })}
    </ListHandler>
  );
}

export default EstateDashboard;
