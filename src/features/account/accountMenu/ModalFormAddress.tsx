import { Modal } from 'antd';
import React, { Fragment } from 'react';

interface Props {
    isOpen: boolean,
    onOk: () => void,
    onCancel: () => void,
    title: string,
    content: any,
    isSubmitting? :boolean,
}

const ModalFormAddress = ({ isOpen, onCancel, onOk, title, content , isSubmitting }: Props) => {
    return (
            <Modal
                confirmLoading={isSubmitting}
                title={title}
                className='text-st'
                centered
                open={isOpen}
                okText={
                    <div className='text-st'>
                        บันทึก
                    </div>
                }
                cancelText={
                    <div className='text-st'>
                        ยกเลิก
                    </div>
                }
                onOk={onOk}
                onCancel={onCancel}
            >
                {content}
            </Modal>
    )
}

export default ModalFormAddress