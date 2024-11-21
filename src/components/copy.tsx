"use client";
import React, { useState } from "react";

import { copyToClipboard } from "@/helper/constants";
const CopyButton = (p: { data: string; isWhite?: boolean }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCopy = () => {
    if (p.data) {
      copyToClipboard(p.data);
      setTooltipVisible(true);

      setTimeout(() => {
        setTooltipVisible(false);
      }, 1000);
    }
  };

  return (
    <div className='copyBox'>
      <img
        src={p.isWhite ? "/images/copyWhite.svg" : "/images/copy.svg"}
        className='copyicon'
        onClick={handleCopy}
        alt='Copy'
      />
      {tooltipVisible && <span className='tooltip'>Address Copied!</span>}
    </div>
  );
};

export default CopyButton;
