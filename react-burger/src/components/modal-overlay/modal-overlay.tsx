import modalOverlayStyle from './modal-overlay.module.css';
import { FC } from 'react';
import { TModalRender } from '../../utils/types';
;

const ModalOverlay: FC<TModalRender> = ({ onClose }) => {
    return (
        <div className={modalOverlayStyle.overlay} onClick={onClose} />
    )
}

export default ModalOverlay;
