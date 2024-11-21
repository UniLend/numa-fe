'use client';
import React from "react";

function copy(data: string){
    var inp =document.createElement('input');
    document.body.appendChild(inp)
    inp.value = data
    inp.select();
    document.execCommand('copy',false);
    inp.remove();
}


const CopyButton = ( p: any ) => {
    // params.data
    if(p.data){
        return (
            <>
                <img src={p.isWhite ? "/images/copyWhite.svg" : "/images/copy.svg"} className="copyicon" onClick={() => copy(p.data)} />
            </>
        )
    }
}

export default CopyButton;