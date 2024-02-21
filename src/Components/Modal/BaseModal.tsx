import { Close } from 'grommet-icons';
import './BaseModal.css'
import { useState, useEffect, useRef } from 'react';

interface BaseModalProps {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
  };

const BaseModal = ({isOpen, onClose, children}: BaseModalProps) => {
                              
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef<HTMLDialogElement | null>(null);
  
    const handleCloseModal = () => {
      if (onClose) {
        onClose();
      }
      setModalOpen(false);
    };
  
    useEffect(() => {
      setModalOpen(isOpen);
    }, [isOpen]);
  
    useEffect(() => {
      const modalElement = modalRef.current;
  
      if (modalElement) {
        if (isModalOpen) {
          modalElement.showModal();
        } else {
          modalElement.close();
        }
      }
    }, [isModalOpen]);
  
    return (
      <dialog ref={modalRef} className="base-modal">                             
          <button className="modal-close-btn" onClick={handleCloseModal}>
            <Close className='close-icon' size='30px'/>
          </button> 
        {children}
      </dialog>
  )
}

export default BaseModal