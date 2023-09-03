import React from 'react';
import './Accordion.css';
import { Button, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { gettingTumbnailImg } from '../logicFunctionalities/logics';

export const ShareConfirmModal = ({ open, setOpen, title, url, btnTitle, description }) => {
    const getIcon = {
        Facebook: <FontAwesomeIcon icon={faFacebook} color='#fff' />,
        Twitter: <FontAwesomeIcon icon={faTwitter} color='#fff' />,
        Linkedin: <FontAwesomeIcon icon={faLinkedin} color='#fff' />,
    };
    const src = gettingTumbnailImg('' + description)
    return (
        <Modal
            className='modalStyled'
            visible={open}
            centered
            onCancel={() => setOpen(false)}
            getPopupContainer={node => node}
        >
            <div className='titleStyled'>{title}
                <a onClick={() => setOpen(false)} target='_blank' href={url} rel='noreferrer'>
                    <button className='btn btn-primary py-1 px-2 bg-primary ml-2 position-absolute' style={{ bottom: '7px', right: '20px' }}>
                        {getIcon[`${btnTitle}`]} share
                    </button>
                </a>
            </div>
            <img className='modalImgStyled' src={src} />
        </Modal>
    )
};
