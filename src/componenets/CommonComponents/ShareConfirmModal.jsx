import React from 'react';
import './Accordion.css';
import { Button, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import parse from 'html-react-parser';

export const ShareConfirmModal = ({ open, setOpen, title, url, btnTitle, description }) => {
    const getIcon = {
        Facebook: <FontAwesomeIcon icon={faFacebook} color='#fff' />,
        Twitter: <FontAwesomeIcon icon={faTwitter} color='#fff' />,
        Linkedin: <FontAwesomeIcon icon={faLinkedin} color='#fff' />,
    };
    const htmlDescription = parse(""+description)
    return (
        <Modal
            className='modalStyled'
            visible={open}
            onCancel={() => setOpen(false)}
            getPopupContainer={node => node}
        >
            <div style={{ margin: '10px 0', fontSize: '20px' }}>{title}
                <a onClick={() => setOpen(false)} target='_blank' href={url} rel='noreferrer'>
                    <button className='btn btn-primary py-1 px-2 bg-primary ml-2 position-absolute' style={{bottom: '6px', right: '40px'}}>
                        {getIcon[`${btnTitle}`]} share
                    </button>
                </a>
            </div>
            <div dangerouslySetInnerHTML={{ __html: htmlDescription }}></div>
        </Modal>
    )
};
