'use client';
import React, { useState } from 'react';
import Blockies from 'react-blockies';
import { postData } from '@/context/constants';
import CopyButton from './copy';

const AddressList = (p: any) => {
//   const [isRemoved, setIsRemoved] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);

  const removeReq = async (address: string, token: string) => {
    if (address != '') {
      setBtnLoader(true);

      let response = await postData('/removeAddress', token, {
        address: address,
      });

      if (response.status == '100') {
        setBtnLoader(false);
      } else if (response.status == '200') {
        // setIsRemoved(true);
        p.refreshData();
      }
      setBtnLoader(false);
    }
  };

//   if(isRemoved){
//       return (<></>)
//   }

  return (
    <>
      <div className='listAddr'>
        <div className='list_inn'>
          <Blockies
            seed={p.addressDt.address}
            size={6}
            scale={3}
            className='chainIcon mr5'
          />
          <img
            src={'/images/' + p.addressDt.type + '.png'}
            className='addTypIcon'
          />{' '}
          {p.addressDt.address}
          <CopyButton data={p.addressDt.address} />
          {btnLoader ? (
            <>
              <div className='pendingicon'>
                <div className='spinner'>
                  <div className='spinner-icon'></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <img
                src='/images/delete.svg'
                className='deleteicon'
                onClick={() => removeReq(p.addressDt.address, p.accessToken)}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressList;
