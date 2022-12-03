import { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from './modal.module.css';
import { TModalRender } from "../../utils/types";

const modalRoot = document.querySelector('#modal') as HTMLElement;

const Modal: FC<TModalRender>= ({ onClose, children }) => {
    const closeModal = () => {
        onClose();
    }

    useEffect(() => {
        const handleEsc = (e: {key:string}) => {
            if (e.key === 'Escape')
                closeModal();
        }

        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);

    })

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClose={closeModal} />
                <div className={modalStyles.container} >
                    <button className={`${modalStyles.button} mt-10 mr-10`} onClick={closeModal}>
                        <CloseIcon type='primary' />
                    </button>
                    {children}
                </div>
            </>
        ), modalRoot);
}

export default Modal;