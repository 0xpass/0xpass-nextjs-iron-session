import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr'
import { WagmiConfig, createClient, chain } from 'wagmi';
import { PassProvider, getDefaultClient } from '@0xpass/react';
import fetcher from 'lib/fetcher'


const client = createClient(
  getDefaultClient({
    appName: '0xPass CRA demo',
    chains: [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <WagmiConfig client={client}>
        <PassProvider settings={{
          envId: '29c37431-ae65-4c32-b8b7-3bbb60992d71'
        }}>
          <Component {...pageProps} />
        </PassProvider>
      </WagmiConfig>
    </SWRConfig>
  );
}

export default MyApp;
