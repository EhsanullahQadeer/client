import React, { useContext, useState } from 'react';
import './Accordion.css';
import { Input, Checkbox, Modal } from 'antd';
import { CombinedContext } from '../SingleBlogComponents/comment/Step1Repies';

export const ReportModal = () => {
    const { openReportModal, setOpenReportModal } = useContext(CombinedContext);
    const { TextArea } = Input;
    const [inputValue, setInputValue] = useState('');
    const checkboxOptions = [
        { label: 'Offensive language', value: 'Offensive language' },
        { label: 'Harassment or bullying', value: 'Harassment or bullying' },
        { label: 'Spam', value: 'Spam' },
        { label: 'False information', value: 'False information' },
        { label: 'Violation of community guidelines', value: 'Violation of community guidelines' },
        { label: 'Other', value: 'other' },
    ];
    const [checkboxValues, setCheckboxValues] = useState([]);
    const handleOnChange = e => {
        setCheckboxValues(e);
    };

    return (
        <Modal
            open={openReportModal}
            centered
            width={400}
            onCancel={() => { setOpenReportModal(false); setCheckboxValues([]); setInputValue('') }}
            okText={'Report'}
            getPopupContainer={node => node}
        >
            <strong style={{ fontSize: '20px' }}>Report user</strong>
            <div className='mb-2'>
                <Checkbox.Group style={{ flexDirection: 'column', userSelect: 'none' }} value={checkboxValues} onChange={handleOnChange} options={checkboxOptions} />
            </div>
            {checkboxValues?.includes('other') && <TextArea
                className='textArea'
                required={true}
                rows={4}
                value={inputValue}
                onChange={e => setInputValue(e?.target?.value)}
                placeholder='Describe your issue....'
            />}
        </Modal>
    )
};

