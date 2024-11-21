'use client';
import { authFetcher, fetcherPublic, template } from "@/context/constants";
import React, { useState } from "react";
import { useQRCode } from 'next-qrcode';
import useSWR from 'swr'
import CopyButton from "./copy";





const DepositAddress = ( p: any ) => {
    const { Canvas } = useQRCode();
    const [depositAddr, setDepositAddr] = useState('');
    const [fetchTime, setFetchTime] = useState(0);


    const GetDepositAddress = async ( type: string, at: string ) => {
        const { data } = await useSWR({
            "path": `/getDepositAddress/${type}`,
            "accessToken": at
        }, authFetcher)
        
        if(data && data.result){
            if(data.status == 200){
                setDepositAddr(data.result);
            }
        }
    }

    const CheckDeposit = async ( dt: any, address: string ) => {
        let urlParsed = template(dt.depositApi, {
            chain: dt.chain,
            ticker: dt.ticker,
            address: address
        });

        if(typeof urlParsed == "string"){
            const { data } = await useSWR(urlParsed+"?"+fetchTime, fetcherPublic);
            if(data && data.status){
                if(data.status == 200){
                    p.refreshData();
                } else {
                    setTimeout(function(){
                        setFetchTime(Math.round(+new Date()/1000));
                    }, 10000);
                }
            }
        }
    };

    if(depositAddr == ""){
        GetDepositAddress(p.sD.type, p.accessToken);
        return  <footer>
            Laading...
        </footer>;
    }
    else {
        CheckDeposit(p.sD, depositAddr);
        
        return (
            <>
                <div className="depositBox">
                    <div>
                        <Canvas
                        text = { depositAddr }
                        options = {{
                            errorCorrectionLevel: 'M',
                            margin: 3,
                            scale: 4,
                            width: 200,
                            color: {
                                dark: '#FFFFFFFF',
                                light: '#000000FF',
                            },
                        }}
                        />
                    </div>
                    <div>
                        <div>Chain <img src={"/images/"+p.sD.chain+".png"} className="chainIcon"/> {p.sD.name}</div>
                        <div>Send only <img src={"/images/"+p.sD.ticker+".png"} className='chainIcon'/> {p.sD.token_name} ({p.sD.ticker.toUpperCase()})</div>
                        <div>Minimum Deposit Amount: {p.sD.min_deposit} {p.sD.ticker.toUpperCase()}</div>
                        <div className="depositAddr">{ depositAddr } <CopyButton data={depositAddr} isWhite="true"/></div>
                    </div>
                </div>
            </>
        )
    }
}

export default DepositAddress;