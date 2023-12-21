'use client';
import React from 'react';
import DashboardTitle from '@/app/components/DashboardHandler/DashboardTitle';
import ListTitleMenu from '@/app/components/DashboardHandler/ListTitleMenu';
import EstatesDashboard from '@/app/components/EstatesDashboard';
import CustomLink from '@/app/components/Utils/CustomLink';
import { ListType } from '@/firebase/customTypes';
import { ThemeVariant, listVariant } from '@/style/componentsStyleConfig';

type Props = {
  type: ListType;
  listID: string;
};

function ContentWrapper(props: Props) {
  const { listID, type } = props;

  return (
    <section>
      <DashboardTitle
        title="VCNITY Estates"
        menu={<ListTitleMenu type={type} listID={listID} />}
        actionButton={
          <CustomLink
            url="/listas"
            variant={`${listVariant[type]}Outline` as ThemeVariant}
          >
            Go Back
          </CustomLink>
        }
      />
      <EstatesDashboard />
    </section>
  );
}

export default ContentWrapper;
