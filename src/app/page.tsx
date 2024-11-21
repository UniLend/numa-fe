"use client";
import React, { useEffect, useState } from "react";
import {
  SignMeta,
  getLocalAccessToken,
  getLocalStorage,
  postData,
  setLocalAccessToken,
  setLocalStorage,
} from "@/context/constants";
import Dashboard from "./dashboard";
import {
  useAccount,
  useAccountEffect,
  useDisconnect,
  useSignMessage,
} from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import ConnectButton from "@/components/connectButton";
import AddNetwork from "@/components/customNetwork";

export default function Home() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState(0);
  const [accessToken, setAccessToken] = useState("");

  const logOut = () => {
    if (loginStatus != 1) {
      setLoginStatus(0);
      setIsLoggedIn(false);
      setLocalAccessToken(userAddress, "");
      disconnect();
    }
  };

  function checkLogin() {
    if (getLocalAccessToken() == "") {
      setIsLoggedIn(false);
      logOut();
    } else {
      setAccessToken(getLocalAccessToken());
      setIsLoggedIn(true);
    }
  }

  let userAddress = address ? address : "";
  if (userAddress) {
    let currAddr = getLocalStorage("addr");
    if (currAddr != userAddress) {
      setLocalStorage("addr", userAddress);
      checkLogin();
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  const loginReq = async (
    address: string,
    nonce: string,
    expiry: number,
    signature: string
  ) => {
    let response = await postData("/login", accessToken, {
      address: address,
      nonce: nonce,
      expiry: expiry,
      signature: signature,
      type: "eth",
    });

    if (response.status == 200) {
      setLocalAccessToken(address, response.result);
      setAccessToken(response.result);
      setLoginStatus(2);
      setIsLoggedIn(true);
    }
  };

  const signIN = async (address: string) => {
    let signMeta = SignMeta(address);
    signMessageAsync({
      message: signMeta.msg,
    })
      .then(async (signData) => {
        await loginReq(address, signMeta.nonce, signMeta.expiry, signData);
      })
      .catch((...args) => {
        disconnect();
        setLoginStatus(0);
      });
  };

  useAccountEffect({
    onConnect(data) {
      if (getLocalAccessToken() == "") {
        setLoginStatus(1);
        signIN(data.address);
      } else {
        checkLogin();
      }
    },
    onDisconnect() {
      logOut();
      setLoginStatus(0);
    },
  });

  const loginAction = () => {
    open();
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <header>
            <div className='logoBox'>
              <img className='logo' src='/images/logo-full.png' />
            </div>
            <div className='navBox'>
              <div className='nav'>
                <div className='navItem'>Home</div>
                <div className='navItem'>How it Works?</div>
                <div className='navItem'>
                  <a
                    style={{ color: "#fff", fontWeight: "500" }}
                    href='https://t.me/UniLendFinance'
                    target='_blank'
                  >
                    Telegram
                  </a>
                </div>
                <div className='navItem'>
                  <a
                    style={{ color: "#fff", fontWeight: "500" }}
                    href='https://x.com/UniLend_Finance'
                    target='_blank'
                  >
                    X
                  </a>
                </div>
              </div>
            </div>
            <div className='accountBox'>
              <AddNetwork />
              <ConnectButton />
            </div>
          </header>
          <Dashboard accessToken={accessToken} logOut={logOut} />
        </>
      ) : (
        <>
          <div className='loginCont'>
            <div className='logoBox'>
              <img className='logo' src='/images/logo-full.png' />
            </div>
            {(() => {
              switch (loginStatus) {
                case 0:
                  return (
                    <div className='rbtnlg' onClick={loginAction}>
                      Connect Wallet
                    </div>
                  );
                case 1:
                  return <div>Signing Wallet...</div>;
                case 2:
                  return <div>Logging IN...</div>;
                default:
                  return null;
              }
            })()}
          </div>
        </>
      )}
    </>
  );
}
