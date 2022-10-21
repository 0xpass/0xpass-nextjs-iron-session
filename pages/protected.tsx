import type { NextPage } from 'next';
import { ConnectButton } from '@0xpass/react';

const Protected: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      Protected
      <ConnectButton />
    </div>
  );
};

export default Protected;
