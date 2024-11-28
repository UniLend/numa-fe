"use client";
import React, { useState } from "react";

const AddNetwork = ({
  network,
  setIsModalVisible,
}: {
  network: string;
  setIsModalVisible: (n: boolean) => void;
}) => {
  const ethParams = [
    {
      chainId: "0x1",
      rpcUrls: ["https://rpc.numa.network/eth"],
      blockExplorerUrls: ["https://etherscan.io"],
      chainName: "Eth Mainnet [Numa]",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
    },
  ];
  const baseParams = [
    {
      chainId: "0x2105",
      rpcUrls: ["https://rpc.numa.network/base"],
      blockExplorerUrls: ["https://basescan.org"],
      chainName: "Base Mainnet [Numa]",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
    },
  ];
  const params = network === "ethereum" ? ethParams : baseParams;
  const addNow = async () => {
    try {
      const { ethereum } = window as any;

      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: params,
      });
      setIsModalVisible(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className='addNetwork'>
        <div className='rbtn' onClick={addNow}>
          + Add RPC
        </div>
      </div>
    </>
  );
};

export default AddNetwork;
