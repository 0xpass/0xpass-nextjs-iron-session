import type { NextPage } from 'next';
import { ConnectButton, useAuth } from '@0xpass/react';
import useUser from 'hooks/useUser';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  // here we just check if user is already logged in and redirect to profile
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { isConnected } = useAccount()

  useEffect(()=>{
    const destroySession = async () => {
      await fetch('/api/logout', {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
        },
      })
    }
    
    if (!isAuthenticated && !isConnected) {
      destroySession()
      setTimeout(()=>router.replace("/login"),200)
      
    }
  },[isAuthenticated])


  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <ConnectButton />
        <div style={{marginTop: '12px'}}>
          Home is for logged in users
          <div>
            <span style={{fontWeight: 'bold'}}>address:</span> 
            {user?.address}
          </div>
          <div>
            <span style={{fontWeight: 'bold'}}>userId:</span> 
            {user?.userId}
          </div>
        </div>
        {/* <button onClick={}>
          logout
        </button> */}
      </div>
      
    </div>
  );
};

export default Home;
