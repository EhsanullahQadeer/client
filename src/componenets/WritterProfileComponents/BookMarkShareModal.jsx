import React from 'react';
import { Divider, Modal, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Brands from '@fortawesome/free-brands-svg-icons';
import { faCheck, faLink } from '@fortawesome/free-solid-svg-icons';
import { gettingTumbnailImg } from '../logicFunctionalities/logics';
import './WriterProfileContent.css';
import { useState } from 'react';

export const BookMarkShareModal = ({ open, setOpen, title, description, url }) => {
    const icons = ['faFacebook', 'faTwitter', 'faLinkedin'];
    const src = gettingTumbnailImg('' + description);
    const [isCopied, setIsCopied] = useState(false);
    const allUrls = {
        faFacebook: `https://www.facebook.com/dialog/share&app_id=${''}&display=popup&href=${url}`,
        faTwitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
        faLinkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    const handleOnClick = e => {
        e.preventDefault();
        setIsCopied(true);
        window.navigator.clipboard.writeText(`${url}`);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };
    return (
        <Modal
            className='antdModal'
            open={open}
            centered
            onCancel={() => setOpen(false)}
            getPopupContainer={node => node}
        >
            <strong className='fs-6'>Share Item</strong>
            <Divider style={{ margin: '10px 0 24px 0' }} />
            <div className='flexWrapper'>
                <img className='shareImgStyled' src={src} />
                <div className='modalBlogTitle'><p>{title}</p></div>
            </div>
            <Divider />
            <div className='iconsWrapper'>
                {icons?.map((item, idx) => {
                    return <a key={idx} onClick={() => setOpen(false)} target='_blank' href={allUrls[`${item}`]} rel='noreferrer'>
                        <FontAwesomeIcon className={`${item}`} icon={Brands[`${item}`]} color='#4e5156' fontSize='20px' />
                    </a>
                })}
                <Tooltip title={<div>{isCopied && <FontAwesomeIcon icon={faCheck} color="#4DFF4D"/>} {!isCopied ? 'Copy' : 'Copied!'}</div>}>
                    <FontAwesomeIcon onClick={handleOnClick} icon={faLink} color='#4e5156' fontSize='20px' cursor='pointer' className='shareLink' />
                </Tooltip>
            </div>
        </Modal>
    )
};
