import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

function EstatesDetailsPage(props: Props) {
  const {
    params: { id },
  } = props;
  return <div>{`Estate ID ${id} details Page!`}</div>;
}

export default EstatesDetailsPage;
