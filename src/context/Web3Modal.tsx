'use client'

import React, { ReactNode } from 'react'
import { wagmiConfig } from '@/blockchain/config'

import { createWeb3Modal } from '@web3modal/wagmi/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { State, WagmiProvider } from 'wagmi'
import { projectId } from './constants'

// Setup queryClient
const queryClient = new QueryClient()

// Create modal
createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId,
  themeMode: "dark",
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeVariables: {
    // '--w3m-accent': '#000',
    // '--w3m-color-mix': '#fff'
  }
})

export default function Web3Modal({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}