import React from 'react';

type Props = {
  children: React.ReactNode;
};

function ListsPageLayout(props: Props) {
  return <div>{props.children}</div>;
}

export default ListsPageLayout;
