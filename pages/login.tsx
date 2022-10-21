import type { NextPage } from 'next';
import { ConnectButton } from '@0xpass/react';

const Login: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      Logged Out
      <ConnectButton />
    </div>
  );
};

export default Login;
