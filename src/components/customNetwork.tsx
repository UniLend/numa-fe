'use client';
import React, { useState } from "react";


const AddNetwork = ( p: any ) => {
    const addNow = async () => {
        try {
            const { ethereum } = window as any;
            
            await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: "0x2105",
                    rpcUrls: ["https://rpc.numa.network/base"],
                    blockExplorerUrls: ["https://basescan.org"],
                    chainName: "Base Mainnet [Numa]",
                    nativeCurrency: {
                        name: "ETH",
                        symbol: "ETH",
                        decimals: 18
                    }
                }]
            });
        } catch (error) { 
            console.log("error", error)
        }
    }


    return (
        <>  
            <div className="addNetwork">
                <div className="rbtn" onClick={addNow}>+ Add RPC</div>
            </div>
        </>
    )
}

export default AddNetwork;