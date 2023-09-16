import React from 'react';
import './Accordion.css';
import { Divider, Modal } from 'antd';
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
            open={open}
            centered
            onCancel={() => setOpen(false)}
            getPopupContainer={node => node}
        >
            <strong className='fs-6'>Share Item</strong>
            <Divider style={{ margin: '10px 0 24px 0' }} />
            <div className='flex'>
                <img className='modalImgStyled' src={src} />
                <div className='titleStyled'>{title}
                    <a onClick={() => setOpen(false)} target='_blank' href={url} rel='noreferrer'>
                        <button className='btn btn-primary py-1 px-2 bg-primary ml-2 position-absolute' style={{ bottom: '7px', right: '20px' }}>
                            {getIcon[`${btnTitle}`]} share
                        </button>
                    </a>
                </div>
            </div>
        </Modal>
    )
};
