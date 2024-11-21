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
import Link from "next/link";

export default function Home() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState({
    termsAndCondition: false,
    privacyPolicy: false,
  });

  const isButtonEnabled =
    isCheckboxChecked.termsAndCondition && isCheckboxChecked.privacyPolicy;

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

  const handleCheckboxChange = (key: keyof typeof isCheckboxChecked) => {
    setIsCheckboxChecked((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
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
                <div className='navItem'>
                  <Link
                    href='https://medium.com/@unilend/how-to-use-numa-network-a-step-by-step-guide-5ae7fc781a1b'
                    target='_blank'
                  >
                    How it Works?
                  </Link>
                </div>
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
              {/* <AddNetwork /> */}
              <div className='navItem'>
                <Link
                  href='https://medium.com/@unilend/how-to-add-numa-rpc-to-your-metamask-wallet-30b572e67bf8'
                  target='_blank'
                >
                  Add RPC
                </Link>
              </div>
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
            <div className='checkboxContainer'>
              <label className='checkboxLabel'>
                <input
                  type='checkbox'
                  checked={isCheckboxChecked.termsAndCondition}
                  onChange={() => handleCheckboxChange("termsAndCondition")}
                />
                I agree to the&nbsp;
                <Link href='/terms-of-use' target='_blank'>
                  Terms of Use
                </Link>
              </label>
              <label className='checkboxLabel'>
                <input
                  type='checkbox'
                  checked={isCheckboxChecked.privacyPolicy}
                  onChange={() => handleCheckboxChange("privacyPolicy")}
                />
                I agree to the&nbsp;
                <Link href='/privacy-policy' target='_blank'>
                  Privacy Policy
                </Link>
              </label>
            </div>
            {(() => {
              switch (loginStatus) {
                case 0:
                  return (
                    <button
                      className={`rbtnlg ${
                        !isButtonEnabled ? "btn-disabled" : ""
                      }`}
                      onClick={loginAction}
                      disabled={!isButtonEnabled}
                    >
                      Connect Wallet
                    </button>
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
