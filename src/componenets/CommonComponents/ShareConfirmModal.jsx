import React from 'react';
import './Accordion.css';
import { Button, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export const ShareConfirmModal = ({ open, setOpen, title, url, btnTitle }) => {
    return (
        <Modal
            className='modalStyled'
            width={350}
            visible={open}
            onCancel={() => setOpen(false)}
            getPopupContainer={node => node}
        >
            <div style={{ marginTop: '10px', fontSize: '16px' }}>{title}</div>
            <a target='_blank' href={url} rel='noreferrer'>
                <button className='btn btn-primary py-1 px-2 bg-primary position-absolute d-flex justiy-content-center align-items-center' style={{ right: '20px', gap: '10px', bottom: '20px' }}>
                    {`Share to ${btnTitle}`} <FontAwesomeIcon icon={faShare} fontSize='12px' />
                </button>
            </a>
        </Modal>
    )
};
