'use client';
import { fetcher } from "@/context/constants";
import React, { useState } from "react";
import useSWR from 'swr'
import DepositAddress from "./depositAddr";
import SelArrow from "./selArrow";




const DepositModal = ( p: any ) => {
    const { data } = useSWR('/getChains', fetcher)
    let chainList = data && data.result ? data.result : [];

    const [isOpen, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<typeof data>();
    const [selectedChain, setSelectedChain] = useState('');

    const handleChildElementClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    }

    const selectChainOpen = () => {
        setOpen(!isOpen);
    };

    const selectChain = ( dt: any ) => {
        if(dt.deposit){
            setOpen(!isOpen);

            setSelectedData(dt);
            setSelectedChain(dt.type);
        }
    };

    // Select Chain
    return (
        <>
            <div className="modal" onClick={() => p.inFunct("")}>
                <div className="modalCont" onClick={(e) => handleChildElementClick(e)}>
                    <div className="modalClose" onClick={() => p.inFunct("")}><img src="/images/close.svg" className="stsicon"/></div>
                    <>
                        <div className="modalHead">Deposit Gas</div>
                        <div className="modalInn">
                            <div className="selectBox">
                                <div className="selectLbl" onClick={selectChainOpen}>
                                { selectedData ? (
                                    <>
                                        <img src={"/images/"+selectedData.chain+".png"} className="chainIcon"/> {selectedData.name}
                                    </>
                                ) : (
                                    <>
                                        Select Chain
                                    </>
                                )}
                                    <SelArrow isOpen={isOpen}/>
                                </div>
                                { isOpen && (
                                    <div className="selectList">
                                    { chainList.map( (dt: any, i: number) => (
                                        <div className="selectLi" key={i} onClick={() => selectChain(dt)}>
                                            <img src={"/images/"+dt.chain+".png"} className="chainIcon"/> {dt.name} 
                                            { !dt.deposit && (
                                                <span className="suspend">suspended</span>
                                            )}
                                        </div>
                                    ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        { selectedData && (
                            <DepositAddress addressType={selectedChain} sD={selectedData} accessToken={p.accessToken} refreshData={p.refreshData}/>
                        )}
                    </>
                </div>
            </div>
        </>
    )
}

export default DepositModal;