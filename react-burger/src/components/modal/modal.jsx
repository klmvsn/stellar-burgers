import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from './modal.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { resetIngridientModal } from "../../services/actions/ingridient-details";

const modalRoot = document.querySelector('#modal');

const Modal = ({ children }) => {
    const dispatch = useDispatch();
    const closeModal = (e) => {
        e.stopPropagation();
        dispatch(resetIngridientModal());
    }

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape')
                closeModal(e);
        }

        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);

    }, [])

    return ReactDOM.createPortal(
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
        ), modalRoot);
}

Modal.propTypes = {
    children: PropTypes.node.isRequired
}

export default Modal;