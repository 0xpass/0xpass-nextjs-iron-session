import type { NextPage } from 'next';
import { ConnectButton, useAuth } from '@0xpass/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login: NextPage = () => {
  const { isAuthenticated, getAccessToken } = useAuth()
  const router = useRouter()

  useEffect(()=>{
    const createSession = async () => {
      const accessToken = await getAccessToken()
  
      // create cookie after verifying accessToken
      await fetch('/api/login', {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      })
      router.replace("/")
    }

    if (isAuthenticated) {
      createSession()
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
        <div style={{
          display: 'flex',
          marginTop: '12px'
        }}>
          You need to login to see the main page
        </div>
      </div>
      
    </div>
  );
};

export default Login;
