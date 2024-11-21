'use client';
import React, { useState } from "react";



const InputBox = ( p: any ) => {
    const [value, setValue] = useState("");
    const maxAmount = () => {
        let mBal = p.balance.toString();
        setValue(mBal);
        p.setInputValue('amount', mBal);
    };


    const addWalletReq = (e: React.FormEvent<HTMLInputElement>) => {
        let cVal = e.currentTarget.value;
        if(p.inputType == "amount"){
            let newValue = cVal.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
            p.setInputValue(p.inputType, newValue);
            setValue(newValue);
        } 
        else {
            setValue(cVal);
            p.setInputValue(p.inputType, cVal);
        }
    };

    
    return (
        <>
            <div className={ p.ticker ? "pr100 inputBox" : "inputBox" }>
                { p.ticker && (
                    <>
                        <div className="inpSub"><img src={"/images/"+p.ticker+".png"} className='chainIcon'/> {p.ticker.toUpperCase()}</div>
                        <div className="maxBtn" onClick={maxAmount}>MAX</div>
                    </>
                )}
                <input type="text" placeholder={p.placeholder} className="input" onInput={(e) => addWalletReq(e)} value={value}/>
            </div>
        </>
    )
}

export default InputBox;