'use client';
import useSWR from 'swr'
import React, { useState } from "react";
import { authFetcher, convertNumberFromat, formatAmount, shortHex, template, toDate  } from '@/context/constants';
import CopyButton from './copy';
import StatusIcon from './status';
import Pagination from './pagination';
import Link from 'next/link';



const TxnBox = ( p: any ) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    var txns: any = [];
    var totalTxns = 0;
    var loadStatus = 0;

    const changePage = (page: any) => { 
        setCurrentPage(page);
    };


    const parseAddrUrl = (chain: string, address: string) => { 
        if(chainObj && chainObj[chain]){
            let chObj = chainObj[chain];
            return chObj.addressUrl ? template(chObj.addressUrl, { addr: address }) : "#";
        } else {
            return "#";
        }
    };

    const parseTxnUrl = (chain: string, txn: string) => { 
        if(chainObj && chainObj[chain]){
            let chObj = chainObj[chain];
            return chObj.addressUrl ? template(chObj.txnUrl, { tx: txn }) : "#";
        } else {
            return "#";
        }
    };

    const loadTxns = () => { 
        let exQ = p.fetchTime ? `?${p.fetchTime}` : "";
        const { data, error, isLoading } = useSWR({
            "path": currentPage > 1 ? `/getUserTxns/${currentPage}${exQ}` : `/getUserTxns${exQ}`,
            "accessToken": p.accessToken
        }, authFetcher)

        let retStatus = data && data.status;
        if(retStatus){ loadStatus = retStatus; }

        txns = data && data.result && data.result.txns ? data.result.txns : [];
        totalTxns = data && data.result && data.result.total ? data.result.total : 0;
    };

    var chainObj:any = {};
    p.chainData.map( (dt: any) => {
        if(!chainObj[dt.chain]){ chainObj[dt.chain] = {}; }
        chainObj[dt.chain] = dt;
    });

    loadTxns();

    return (
        <>
            <h3 className='mt50'>Transactions <span className="counts">{ convertNumberFromat(totalTxns) }</span></h3>
            
            { totalTxns > 10 && (
                <div className='flRbox'>
                    <Pagination page={currentPage} total={totalTxns} changePage={changePage}/>
                </div>
            )}

            <div className='txBox'>
            { loadStatus == 200 ? (
                <>
                <table>
                    <tbody>
                        <tr>
                            <th style={{"width" : "16%"}}>Type</th>
                            <th style={{"width" : "22%"}}>Amount</th>
                            <th>Transaction</th>
                        </tr>
                        { txns.map( (dt: any, i: number) => (
                            <tr key={i}>
                                <td>
                                    <div className='flCap'>
                                        <div>
                                            <StatusIcon status={dt.status}/> {dt.type}
                                            <div style={{marginLeft: "1px"}}>
                                                <img src={"/images/"+dt.chain+".png"} className='chainIcon' /> {dt.chain}
                                            </div>
                                        </div>
                                    </div>
                                    
                                </td>
                                <td>
                                    <div dangerouslySetInnerHTML={{ __html: formatAmount(dt.amount) + " " + dt.ticker.toUpperCase() }}></div>
                                    <div className='smTag' dangerouslySetInnerHTML={{ __html: "fee: " +formatAmount(dt.fee) + " " + dt.ticker.toUpperCase() }}></div>
                                    <div className='smTag' dangerouslySetInnerHTML={{ __html: "total: " +formatAmount(dt.total) + " " + dt.ticker.toUpperCase() }}></div>
                                </td>
                                <td>
                                    <div>
                                        <span className='lbl'>Address:</span> 
                                        <Link href={ parseAddrUrl(dt.chain, dt.address) } target="_blank">
                                            { shortHex(dt.address, 20) }
                                            <img src="/images/link.svg" className="copyicon"/>
                                        </Link>
                                        <CopyButton data={dt.address}/> 
                                    </div>

                                    {dt.txid && (
                                        <div className='txnid'>
                                            <span className='lbl'>TX:</span> 
                                            <Link href={ parseTxnUrl(dt.chain, dt.txid) } target="_blank">
                                                { shortHex(dt.txid, 20) }
                                                <img src="/images/link.svg" className="copyicon"/>
                                            </Link>
                                            <CopyButton data={dt.txid}/> 
                                        </div>
                                    )}
                                    <div className='lbl'>On: {toDate(dt.time)}</div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    { totalTxns == 0 && (
                        <div className='nil'>
                            No Transaction Found :(
                        </div>
                    )}

                </>
            ) : (
                <>
                <div className='nil'>
                    Loading ...
                </div>
                </>
            )}
            </div>
        </>
    )
}

export default TxnBox;