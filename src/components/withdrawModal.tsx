'use client';
import { SUB, formatAmount, isGreaterThan, isGreaterThanOrEqualTo, postData, validateAddress } from "@/context/constants";
import React, { useState } from "react";
import InputBox from "./inputBox";
import SelArrow from "./selArrow";


const handleChildElementClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
}

const WithdrawModal = ( p: any ) => {
    let chainList = p.chainData;
    let balData: string[] = [];
    p.balancesData.map((dt: any) => {
        // if(!balData[dt.chain]){
        //     balData[dt.chain] = [];
        // }
        // balData[dt.chain][dt.ticker] = dt.balance

        balData[dt.ticker] = dt.balance
    });


    const [isOpen, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<typeof p.chainData>();
    const [buttonText, setButtonText] = useState('Enter Address');
    const [actionBtn, setActionBtn] = useState(false);
    const [btnLoader, setBtnLoader] = useState(false);
    const [amountReceive, setAmountReceive] = useState('0');
    const [errStr, setErrStr] = useState("");
    const [succStr, setSuccStr] = useState("");

    const [addressVal, setAddressVal] = useState("");
    const [amountVal, setAmountVal] = useState("");

    let currentBal = 0;
    if(selectedData){
        if(balData && balData[selectedData.ticker]){
            currentBal = parseFloat(balData[selectedData.ticker]);
        }
    }

    const selectChainOpen = () => {
        setOpen(!isOpen);
    };

    const selectChain = ( dt: any ) => {
        if(dt.withdraw){
            setOpen(!isOpen);
            setSelectedData(dt);
        }
    };


    const setInputValue = (type: string, value: string) => {
        if(type == "address"){
            if(validateAddress(value, selectedData.type)){
                setAddressVal(value);
                if(amountVal == ""){
                    setActionBtn(false);
                    setButtonText("Enter Amount");
                } 
                else {
                    setActionBtn(true);
                    setButtonText("Withdraw");
                }
            } 
            else {
                setActionBtn(false);
                setAddressVal("");
                setButtonText("Enter Address");
            }
        } 
        else if(type == "amount"){
            let receiveAmount = SUB(value, selectedData.withdraw_fee);
            
            if(isGreaterThan(receiveAmount, 0) && isGreaterThanOrEqualTo(currentBal, value)){
                let receiveAmount = SUB(value, selectedData.withdraw_fee);
                setAmountReceive(receiveAmount.toString());
                setAmountVal(value);

                if(addressVal == ""){
                    setActionBtn(false);
                    setButtonText("Enter Address");
                } 
                else {
                    setActionBtn(true);
                    setButtonText("Withdraw");
                }
            } 
            else {
                setActionBtn(false);
                setAmountReceive("0");
                setAmountVal("");

                if(parseFloat(value) > currentBal){
                    setButtonText("Insufficiant Amount");
                } 
                else {
                    setButtonText("Enter Amount");
                }
            }
        }
    };

    const withdrawReq = async () => {
        if(addressVal != "" && amountVal != "" && actionBtn){
            setSuccStr("");
            setErrStr("");
            setActionBtn(false);
            setBtnLoader(true);

            let response = await postData('/withdraw', p.accessToken, {
                "address": addressVal,
                "amount": amountVal,
                "ticker": selectedData.ticker,
                "chain": selectedData.chain
            });

            setBtnLoader(false);
            if(response.status == "100"){
                setErrStr(response.result);
            } else if(response.status == "200"){
                setSuccStr(response.result);
                p.refreshData();
            }
        }
    };


    // Select Chain
    return (
        <>
            <div className="modal" onClick={() => p.inFunct("")}>
                <div className="modalCont" onClick={(e) => handleChildElementClick(e)}>
                    <div className="modalClose" onClick={() => p.inFunct("")}><img src="/images/close.svg" className="stsicon"/></div>
                    <>
                        <div className="modalHead">Withdraw Gas</div>
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
                                            { !dt.withdraw && (
                                                <span className="suspend">suspended</span>
                                            )}
                                        </div>
                                    ))}
                                    </div>
                                )}
                            </div>
                            { selectedData && (
                            <>
                                <InputBox inputType="address" setInputValue={setInputValue} placeholder="Enter Address" value=""/>
                                <InputBox inputType="amount" setInputValue={setInputValue} placeholder="Enter Amount" ticker={selectedData.ticker} balance={currentBal}/>
                                
                                <div>Available Withdraw <span className="fR" dangerouslySetInnerHTML={{ __html: formatAmount(currentBal) + " " + selectedData.ticker.toUpperCase() }}></span></div>
                                <div>Withdraw Fee <span className="fR">{selectedData.withdraw_fee} {selectedData.ticker.toUpperCase()}</span></div>
                                <div className="bLabelB">Receive Amount <span className="fR" dangerouslySetInnerHTML={{ __html: formatAmount(amountReceive) + " " + selectedData.ticker.toUpperCase() }}></span></div>

                                { errStr && (
                                    <>
                                        <div className="errDiv">
                                            <img src="/images/error.svg" className="stsicon"/> {errStr}
                                        </div>
                                    </>
                                )}
                                { succStr && (
                                    <>
                                        <div className="succDiv">
                                            <img src="/images/success.svg" className="stsicon"/> {succStr}
                                        </div>
                                    </>
                                )}

                                <div className={ actionBtn ? "rbtnf" : "rbtnf dsbl" } onClick={withdrawReq}>
                                    { btnLoader ? (
                                        <>
                                            <div className="spinner"><div className="spinner-icon"></div></div>
                                        </>
                                    ) : (
                                        <>
                                            {buttonText}
                                        </>
                                    )}
                                </div>
                            </>
                            )}
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}

export default WithdrawModal;