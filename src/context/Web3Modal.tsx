"use client";

// import React, { ReactNode } from 'react'
// import { wagmiConfig } from '@/blockchain/config'

// import { createWeb3Modal } from '@web3modal/wagmi/react'

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import { State, WagmiProvider } from 'wagmi'
// import { projectId } from './constants'

// // Setup queryClient
// const queryClient = new QueryClient()

// // Create modal
// createWeb3Modal({
//   wagmiConfig: wagmiConfig,
//   projectId,
//   themeMode: "dark",
//   enableAnalytics: true, // Optional - defaults to your Cloud configuration
//   enableOnramp: true, // Optional - false as default
//   themeVariables: {
//     // '--w3m-accent': '#000',
//     // '--w3m-color-mix': '#fff'
//   }
// })

// export default function Web3Modal({
//   children,
//   initialState
// }: {
//   children: ReactNode
//   initialState?: State
// }) {
//   return (
//     <WagmiProvider config={wagmiConfig} initialState={initialState}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </WagmiProvider>
//   )
// }

import "./polyfills";
import "@rainbow-me/rainbowkit/styles.css";
import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { injected } from "wagmi/connectors";
import infinityLogo from "./assets/infinity-logo.svg";
// import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { mainnet, polygon, base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import {wagmiConfig} from "./config.ts"
import {
  rabbyWallet,
  trustWallet,
  ledgerWallet,
  okxWallet,
  coin98Wallet,
} from "@rainbow-me/rainbowkit/wallets";

const { wallets } = getDefaultWallets();

export const wagmiConfig = getDefaultConfig({
  appName: "BorrowSwap",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, base],
  wallets: [
    ...wallets,
    {
      groupName: "Recommended",
      wallets: [rabbyWallet, trustWallet, okxWallet, coin98Wallet],
    },
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

// const Web3Modal = () => {
//   return (
//     <WagmiProvider config={wagmiConfig}>
//       <QueryClientProvider client={queryClient}>
//         <RainbowKitProvider>
//         {children}
//         </RainbowKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// };

export default function Web3Modal({ children }: { children: ReactNode }) {
  return (
    // <WagmiProvider config={wagmiConfig}>
    //   <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    // </WagmiProvider>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
