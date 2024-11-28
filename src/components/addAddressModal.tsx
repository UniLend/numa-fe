'use client';
import { AddrTypes, postData, validateAddress } from '@/context/constants';
import React, { useState } from 'react';

const handleChildElementClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  e.stopPropagation();
};

const AddAddressModal = (p: any) => {
  const [validAddr, setValidAddr] = useState(0);
  const [actionBtn, setActionBtn] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [addrTot, setAddrTot] = useState(0);
  const [addrStr, setAddrStr] = useState('');
  const [errStr, setErrStr] = useState('');
  const [succStr, setSuccStr] = useState('');

  const addWalletReq = async () => {
    if (addrTot > 0 && actionBtn) {
      setSuccStr('');
      setErrStr('');
      setActionBtn(false);
      setBtnLoader(true);

      let response = await postData('/addAddress', p.accessToken, {
        address: addrStr,
      });

      setBtnLoader(false);
      console.log('response', response);
      if (response.status == '100') {
        setErrStr(response.result);
      } else if (response.status == '200') {
        setSuccStr(response.result);
        p.refreshData();
      }
    }
  };

  const checkAddressList = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let listAddr = e.target.value;
    const splitLines = listAddr.split(/\r?\n/).map((addr) => {
      return addr.trim();
    });

    let addTmpArr: string[] = [];
    splitLines.map((x) => {
      AddrTypes.map((type) => {
        if (validateAddress(x, type)) {
          if (!addTmpArr.includes(x)) {
            addTmpArr.push(x);
          }
        }
      });
    });

    setValidAddr(addTmpArr.length);
    if (addTmpArr.length > 0) {
      setActionBtn(true);
      setAddrStr(listAddr);
      setAddrTot(addTmpArr.length);
    } else {
      setActionBtn(false);
      setAddrStr('');
      setAddrTot(addTmpArr.length);
    }

    setSuccStr('');
    setErrStr('');
  };

  // Select Chain
  return (
    <>
      <div className='modal' onClick={() => p.inFunct('')}>
        <div className='modalCont' onClick={(e) => handleChildElementClick(e)}>
          <div className='modalClose' onClick={() => p.inFunct('')}>
            <img src='/images/close.svg' className='stsicon' />
          </div>
          <>
            <div className='modalHead'>Wallet Allowance</div>
            <div className='modalInn wd70'>
              <div>Enter one address on each line</div>
              <textarea
                className='textArea'
                placeholder='0x35CBA8585330d96017d15d371D615584Ad43dAAB
0x1234567890aBCdEF1234567890AbcDEF12345678
0xaBcDEFAbcDEFAbcDEFAbcDEFAbcDEFAbcDEFAbCd
0xAbC123EF4567890abcDEF1234567890aBcDeF456'
                onChange={(e) => checkAddressList(e)}
              ></textarea>
              {errStr && (
                <>
                  <div className='errDiv'>
                    <img src='/images/error.svg' className='stsicon' /> {errStr}
                  </div>
                </>
              )}
              {succStr && (
                <>
                  <div className='succDiv'>
                    <img src='/images/success.svg' className='stsicon' />{' '}
                    {succStr}
                  </div>
                </>
              )}
              <div className='bottFoot'>
                <div className='bootFootlb'>
                  Total <b>{validAddr}</b> Address
                </div>
                <div>
                  <div
                    className={actionBtn ? 'rbtnf' : 'rbtnf dsbl'}
                    onClick={addWalletReq}
                  >
                    {btnLoader ? (
                      <>
                        <div className='spinner'>
                          <div className='spinner-icon'></div>
                        </div>
                      </>
                    ) : (
                      <>Submit</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default AddAddressModal;
