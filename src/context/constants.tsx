import BigNumber from "bignumber.js";
const { validate } = require('multicoin-address-validator');


export const priceApi = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,solana&vs_currencies=usd";
export const projectId = "74fed541411c146193b4f5a73726801e";
// export const API_URL = "http://localhost:3001";
export const API_URL = "https://api.numa.network";

export const AddrTypes = [
    "eth",
    "sol"
]

export const fetcher = (path: string | URL | Request) => fetch(`${API_URL}${path}`).then((res) => res.json());
export const fetcherPublic = (url: string | URL | Request) => fetch(url).then((res) => res.json());
export const authFetcher = (dt: any) => fetch(`${API_URL}${dt.path}`, { 
    headers: new Headers({
        'access-token': dt.accessToken
    })
}).then((res) => res.json());

export const postData = async (path: string, token: string, dt: any) => {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': token,
      },
      body: JSON.stringify(dt),
    });
  
    const result = await response.json();
    return result;
};


export const convertNumberFromat = (n: any) => {
    if(n == "0"){ return "0"; }
    let s = ["", "K", "M", "B", "T", "Q"];
    let orderOfMagnitude = Math.floor(Math.log10(n));
    let index = Math.floor(orderOfMagnitude / 3);
    let abbreviatedValue = parseFloat((n / Math.pow(1000, index)).toPrecision(2));
    return abbreviatedValue + s[index];
};


export const timeSince = (date: any) => {
    var seconds = Math.floor((Math.round(+new Date()/1000) - date));
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}


export const setLocalStorage = (k: string, v: string) => {
    try {
        localStorage.setItem(k, v);
    } catch (error) { }
}

export const getLocalStorage = (k: string) => {
    try {
        return localStorage.getItem(k);
    } catch (error) { return ""; }
}

export const removeLocalStorage = (k: string) => {
    try {
        return localStorage.removeItem(k);
    } catch (error) { }
}

export const getLocalAccessToken = () => {
    let addr = getLocalStorage(`addr`);
    let at = getLocalStorage(`tk:${addr}`);
    if(!at){ at = ""; }
    return at.toString();
}

export const randomUUID = () => {
    try {
        return window.crypto.randomUUID()
    } catch (error) { return ""; }
}

export const setLocalAccessToken = (address: string, token: string) => {
    if(address != ""){
        setLocalStorage(`tk:${address}`, token);
    }
}


export const toDate = (k: string) => {
    return (new Date(parseInt(k)*1000)).toUTCString();
}


export const validateAddress = (address: string, type: string) => {
    return validate(address, type);
}


export const SignMeta = (address: string)  => { 
    let nonce = randomUUID()
    let expiry = Math.floor(Date.now() / 1000) + 300;
    let signMsg = `Welcome to Numa Network!\n\nClick to sign in to your account, This request will not trigger a blockchain transaction or cost any gas fees.\n\nAddress: ${address}\n\nNonce: ${nonce}\n\nExpiry: ${expiry}`;
    return {
        "msg": signMsg,
        "nonce": nonce,
        "expiry": expiry
    }
}

export const template = (str: string, obj: any)  => { 
    var s = str;
    if(!s){ return ""; }
    for(var prop in obj) {
      s = s.replace(new RegExp('{'+ prop +'}','g'), obj[prop]);
    }
    return s;
}


export const shortHex = (str: string, size: number)  => { 
    var s = str;
    if(s.length-2 > size*2){
        s = str.substring(0, size+2);
        s += "...";
        s += str.substring(str.length - size);
    }
    return s;
}


export const ADD = (a: any, b: any) => {
    return ((new BigNumber(a)).plus(b)).toFixed();
}

export const SUB = (a: any, b: any) => {
    return ((new BigNumber(a)).minus(b)).toFixed();
}

export const DIV = (a: any, b: any) => {
    return ((new BigNumber(a)).dividedBy(b)).toFixed();
}

export const MUL = (a: any, b: any) => {
    return ((new BigNumber(a)).multipliedBy(b)).toFixed();
}

export const isGreaterThanOrEqualTo = (a: any, b: any) => {
    return ((new BigNumber(a)).isGreaterThanOrEqualTo(b));
}

export const isGreaterThan = (a: any, b: any) => {
    return ((new BigNumber(a)).isGreaterThan(b));
}

export const Decimal2Fixed = (a: any, d: any) => {
    return ((new BigNumber(a)).multipliedBy(10**d)).toFixed();
}

export const Fixed2Decimals = (a: any, d: any) => {
    return ((new BigNumber(a)).dividedBy(10**d)).toFixed();
}

export const formatAmount = (p: any) => {
    p = p.toString();
    if(p.indexOf(".") === -1){ return p; }

    let s = ["", "K", "M", "B", "T", "Q"];
    let pAr = p.split(".");
    
    let apnd = "";
    let p0 = parseInt(pAr[0]);
    if(p0 > 0){
        let orderOfMagnitude = Math.floor(Math.log10(p0));
        let index = Math.floor(orderOfMagnitude / 3);
        if(index > 0){ apnd = " "+s[index]; }
        p0 = parseFloat((p0 / Math.pow(1000, index)).toPrecision(2));
    }
    
    var zerosL = (pAr[1].match(/^0+/) || [''])[0].length;
    if(zerosL > 4){
        return `${p0}.0<div class="numPow">${zerosL}</div>${pAr[1].substr(zerosL, 5)}${apnd}`;
    } 
    else {
        return `${p0}.${pAr[1].substr(0, 5)}${apnd}`;
    }
}

