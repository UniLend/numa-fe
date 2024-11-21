'use client';
import React from "react";


const SelArrow = ( p: any ) => {
    return (
        <>  
            { p.isOpen ? (
                <img src="/images/up-arrow.svg" className="arrowicon"/>
            ) : (
                <img src="/images/down-arrow.svg" className="arrowicon"/>
            )}
        </>
    )
}

export default SelArrow;