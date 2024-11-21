"use client";
import ConnectButton from "@/components/connectButton";
// import HomeBox from "@/components/homePage";
import TxnBox from "@/components/txnsBox";

import useSWR from "swr";
import React, { useEffect, useState } from "react";
import {
  authFetcher,
  fetcher,
  convertNumberFromat,
  formatAmount,
  fetcherPublic,
  priceApi,
} from "@/context/constants";
import DepositModal from "@/components/depositModal";
import WithdrawModal from "@/components/withdrawModal";
import AddAddressModal from "@/components/addAddressModal";
import AddressList from "@/components/addressList";
import { timeStamp } from "console";
import FAQAccordion from "@/components/accordian";
import { faqData } from "../helper/constants";

export default function Dashboard(p: any) {
  const [fetchTime, setFetchTime] = useState(0);
  const [loadStatus, setLoadStatus] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState("");
  const [addressData, setAddressData] = useState([]);
  const [balancesData, setBalancesData] = useState([]);
  const [chainData, setChainData] = useState([]);

  const openModal = (action: string) => {
    document.body.className = isOpen ? "" : "novr";

    setOpen(!isOpen);
    setModalTarget(action);
  };

  const refreshData = () => {
    setFetchTime(Math.round(+new Date() / 1000));
  };

  const loadUserData = async () => {
    const { data, error, isLoading } = await useSWR(
      {
        path: fetchTime ? `/getUserData?${fetchTime}` : `/getUserData`,
        accessToken: p.accessToken,
      },
      authFetcher
    );

    let retStatus = data && data.status;
    if (retStatus) {
      setLoadStatus(retStatus);
    }

    let resData = data && data.result ? data.result : {};
    if (data && data.status == 101) {
      p.logOut();
    }

    if (resData.balances) setBalancesData(resData.balances);
    if (resData.address) setAddressData(resData.address);
  };

  const loadChains = async () => {
    const { data, error, isLoading } = await useSWR("/getChains", fetcher);
    let chainList = data && data.result ? data.result : [];

    if (chainList) setChainData(chainList);
  };

  const loadData = async () => {
    loadUserData();
    loadChains();
  };

  loadData();

  var chainObj: any = {};
  chainData.map((dt: any) => {
    if (!chainObj[dt.chain]) {
      chainObj[dt.chain] = {};
    }
    chainObj[dt.chain] = dt;
  });

  return (
    <>
      {isOpen &&
        (() => {
          switch (modalTarget) {
            case "deposit":
              return (
                <DepositModal
                  inFunct={openModal}
                  accessToken={p.accessToken}
                  refreshData={refreshData}
                />
              );
            case "withdraw":
              return (
                <WithdrawModal
                  inFunct={openModal}
                  balancesData={balancesData}
                  accessToken={p.accessToken}
                  chainData={chainData}
                  refreshData={refreshData}
                />
              );
            case "addWallet":
              return (
                <AddAddressModal
                  inFunct={openModal}
                  accessToken={p.accessToken}
                  refreshData={refreshData}
                />
              );
            default:
              return null;
          }
        })()}

      <div className='cont'>
        <div className='main'>
          <div className='row left'>
            <h3>
              Balances
              <div className='ribtn' onClick={() => openModal("withdraw")}>
                <svg
                  width='18px'
                  height='18px'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  stroke='#000000'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></g>
                  <g id='SVGRepo_iconCarrier'>
                    {" "}
                    <path
                      d='M12 17L12 8'
                      stroke='#ffffff'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>{" "}
                    <path
                      d='M16 11L12 7L8 11'
                      stroke='#ffffff'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>{" "}
                  </g>
                </svg>
                Withdraw
              </div>
              {/* <div className="ribtn" onClick={() => openModal("transfer")}>
                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 13V11.5H10V9.5H16V8L19 10.5L16 13Z" fill="#ffffff"></path> <path d="M8 17V15.5H14V13.5H8V12L5 14.5L8 17Z" fill="#ffffff"></path> </g></svg>
                Transfer
              </div> */}
              <div className='ribtn' onClick={() => openModal("deposit")}>
                <svg
                  width='18px'
                  height='18px'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></g>
                  <g id='SVGRepo_iconCarrier'>
                    {" "}
                    <path
                      d='M12 7L12 16'
                      stroke='#ffffff'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>{" "}
                    <path
                      d='M8 13L12 17L16 13'
                      stroke='#ffffff'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>{" "}
                  </g>
                </svg>
                Deposit
              </div>
            </h3>

            {loadStatus == 200 ? (
              <>
                <div className='balanceCont'>
                  {balancesData.length ? (
                    <>
                      {balancesData.map((dt: any, i: number) => (
                        <div className='balanceBox' key={i}>
                          <div
                            className='balance'
                            dangerouslySetInnerHTML={{
                              __html: formatAmount(dt.balance),
                            }}
                          ></div>
                          <div className='balTicker'>
                            <img
                              src={"/images/" + dt.ticker + ".png"}
                              className='tickerIcon'
                            />{" "}
                            {dt.ticker.toUpperCase()}
                          </div>
                          {/* <div>on <img src={"/images/"+dt.chain+".png"} className='chainIcon' /> {dt.chain}</div> */}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div
                      className='balanceBoxNil'
                      onClick={() => openModal("deposit")}
                    >
                      {/* <div className='balance'>-</div>
                                <div className='balTicker'>-</div>
                                <div>on -</div> */}
                      <div
                        className='boxDep'
                        onClick={() => openModal("deposit")}
                      >
                        <svg
                          width='24px'
                          height='24px'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                          <g
                            id='SVGRepo_tracerCarrier'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          ></g>
                          <g id='SVGRepo_iconCarrier'>
                            {" "}
                            <path
                              d='M12 7L12 16'
                              stroke='#333'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            ></path>{" "}
                            <path
                              d='M8 13L12 17L16 13'
                              stroke='#333'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            ></path>{" "}
                          </g>
                        </svg>
                        Deposit Gas
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p>LOADING....</p>
            )}

            <TxnBox
              accessToken={p.accessToken}
              chainData={chainData}
              fetchTime={fetchTime}
            />
          </div>
          <div className='row right'>
            {loadStatus == 200 ? (
              <>
                <h3>
                  Allowance Wallets{" "}
                  <span className='counts'>
                    {convertNumberFromat(addressData.length)}
                  </span>{" "}
                  <div className='rbtn' onClick={() => openModal("addWallet")}>
                    + Add Wallet
                  </div>
                </h3>
                {/* <div className='listAddrBox'>
                  {addressData.map((dt: any, i: number) => (
                    <AddressList
                      key={i}
                      addressDt={dt}
                      accessToken={p.accessToken}
                      refreshData={refreshData}
                    />
                  ))}

                  {!addressData.length && (
                    <div className='nil'>No Linked Wallet :(</div>
                  )}
                </div> */}
                <div className='listAddrBox'>
                  <div className='listAddrBox_inn'>
                    {addressData.map((dt: any, i: number) => (
                      <AddressList
                        key={i}
                        addressDt={dt}
                        accessToken={p.accessToken}
                        refreshData={refreshData}
                      />
                    ))}

                    {!addressData.length && (
                      <div className='nil'>No Linked Wallet :(</div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3>
                  Linked Wallets <span className='counts'>0</span>{" "}
                  <div className='rbtn' onClick={() => openModal("addWallet")}>
                    + Add Wallet
                  </div>
                </h3>
                <p>LOADING....</p>
              </>
            )}
          </div>
        </div>
        <div
          style={{
            padding: "20px",
          }}
        >
          <div>
            <h1 style={{ textAlign: "center" }}>Frequently Asked Questions</h1>
            <FAQAccordion items={faqData} />
          </div>
        </div>
      </div>

      <footer>&copy; 2024 Numa Network. All Rights Reserved.</footer>
    </>
  );
}
