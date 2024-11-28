import React, { ReactNode, useEffect } from "react";
import "./index.css";
import Image from "next/image";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  disableOutsideClickClose?: boolean;
}

const Modal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  title = "",
  children,
  disableOutsideClickClose = false,
}) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!disableOutsideClickClose) {
      onClose();
    }
  };

  const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='commonModalOverlay' onClick={handleOutsideClick}>
      <div
        className='commonModalContainer'
        onClick={handleInsideClick}
        // style={{ width }}
      >
        <div className='commonModalHeader'>
          {title && <h3 className='commonModalTitle'>{title}</h3>}
          <div className='commonModalClose' onClick={onClose}>
            <Image
              className='stsicon'
              src='/images/close.svg'
              alt='Down arrow'
              width={12}
              height={12}
            />
          </div>
        </div>
        <div className='commonModalBody'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
