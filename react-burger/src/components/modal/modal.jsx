import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from './modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = () => {
    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-root');
    document.body.appendChild(modalContainer);
    return modalContainer;
}

const Modal = ({ isOpen, setState, children }) => {
    const [modalElement, setModalElement] = useState(null);

    useEffect(() => {
        let modal = document.getElementById('modal-root');
        let isModalSet = false;
        if (!modal) {
            isModalSet = !isModalSet;
            modal = modalRoot();
        }
        setModalElement(modal);

        return () => {
            if (isModalSet && modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }
    }, [])

    const closeModal = (e) => {
        e.stopPropagation();
        setState(false);
    }

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape')
                closeModal(e);
        }

        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);

    }, [])

    return !isOpen ? null : ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClick={closeModal} />
                <div className={modalStyles.container} >
                    <button className={`${modalStyles.button} mt-10 mr-10`} onClick={closeModal}>
                        <CloseIcon type='primary' />
                    </button>
                    {children}
                </div>
            </>
        ), modalElement);
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setState: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Modal;