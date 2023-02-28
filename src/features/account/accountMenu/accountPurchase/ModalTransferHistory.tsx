import { Image, List, Modal, Space } from 'antd';
import { currencyFormat, Ts } from '../../../../app/util/util';
import { EvidenceMoneyTransfer } from '../../../../app/models/EvidenceMoneyTransfer';
const ModalTransferHistory = ({ openModal, setOpenModal, cancelEvidence }: any) => {
    [].length
    return (
        <Modal
            title="ประวัติการโอนเงิน"
            className='text-st'
            centered
            open={openModal}
            onCancel={() => setOpenModal(false)}
            onOk={() => setOpenModal(false)}
            okText={<Ts>ตกลง</Ts>}
            cancelText={<Ts>ยกเลิก</Ts>}
            width={"50rem"}
        >
            {
                cancelEvidence?.length > 0 ?
                    <List
                        itemLayout="horizontal"
                        size='small'
                        dataSource={cancelEvidence as EvidenceMoneyTransfer[]}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <>
                                            <Image style={{
                                                width: "15rem",
                                                height: "15rem"
                                            }} src={item.evidence} />
                                            <p className='text-st'>
                                                {new Date(item.created).toLocaleString("th-TH", {
                                                    year: "numeric",
                                                    month: "numeric",
                                                    day: "2-digit",
                                                })}
                                            </p>
                                        </>
                                    }
                                />
                                <Space direction='vertical' size={'small'}>
                                    <h4 className='text-st'>
                                        ค่าสินค้า : {currencyFormat(item.order.subtotal)}
                                    </h4>
                                    <h4 className='text-st'>
                                        ค่าจัดส่ง : {currencyFormat(item.order.deliveryFee)}
                                    </h4>
                                    <h4 className='text-st'>
                                        รวม : {currencyFormat(item.order.subtotal + item.order.deliveryFee)}
                                    </h4>
                                </Space>
                            </List.Item>
                        )}
                    /> :
                    " "
            }
        </Modal>
    )
}

export default ModalTransferHistory