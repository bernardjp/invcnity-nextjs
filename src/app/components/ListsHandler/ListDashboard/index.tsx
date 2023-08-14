import React from 'react';

type Props = {
  listID: string;
};

function Dashboard(props: Props) {
  const { listID } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>IN/VCNITY ID: {listID}</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Estate name</h3>
          <span>Price: $100,000.00</span>
          <span>Location: Brandsen</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Estate name</h3>
          <span>Price: $100,000.00</span>
          <span>Location: Brandsen</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Estate name</h3>
          <span>Price: $100,000.00</span>
          <span>Location: Brandsen</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
