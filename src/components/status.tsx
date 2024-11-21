'use client';
import React from "react";


// initiated
// nobalance
// inprocess
// releasing
// sent
// error
// success
// idle

const StatusIcon = ( p: any ) => {
    switch (p.status.toString()) {
        case "success":
          return <img src="/images/success.svg" className="stsicon"/>
        case "releasing":
          return <img src="/images/pending.svg" className="stsicon"/>
        case "sent":
          return <img src="/images/pending.svg" className="stsicon"/>
        case "inprocess":
          return <img src="/images/pending.svg" className="stsicon"/>
        case "initiated":
          return <img src="/images/pending.svg" className="stsicon"/>
        case "queue":
          return <img src="/images/pending.svg" className="stsicon"/>
        case "nobalance":
          return <img src="/images/error.svg" className="stsicon"/>
        case "error":
          return <img src="/images/error.svg" className="stsicon"/>
        default:
          return <img src="/images/caution.svg" className="stsicon"/>
    }
}

export default StatusIcon;