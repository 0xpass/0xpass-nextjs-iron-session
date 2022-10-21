import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { WagmiConfig, createClient, chain } from 'wagmi';
import { PassProvider, getDefaultClient } from '@0xpass/react';

const client = createClient(
  getDefaultClient({
    appName: '0xPass CRA demo',
    chains: [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <PassProvider apiKey="pass_SMNNLXFijYJpRJkv">
        <Component {...pageProps} />
      </PassProvider>
    </WagmiConfig>
  );
}

export default MyApp;
