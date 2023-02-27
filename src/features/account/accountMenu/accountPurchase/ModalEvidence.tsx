import { DownloadOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { Container } from 'react-bootstrap';
import { EvidenceMoneyTransfer } from '../../../../app/models/EvidenceMoneyTransfer';
import { Ts } from '../../../../app/util/util';
import UrlImageDownloader from 'react-url-image-downloader';

interface Props {
    openModal: boolean;
    setOpenModal: Function;
    evidence: EvidenceMoneyTransfer | null;
}

const ModalEvidence = ({ evidence, openModal, setOpenModal }: Props) => {

    return (
        <Modal
            title="หลักฐานการโอนเงิน"
            className='text-st'
            centered
            open={openModal}
            onCancel={() => setOpenModal(false)}
            onOk={() => setOpenModal(false)}
            okText={<Ts>ตกลง</Ts>}
            cancelText={<Ts>ยกเลิก</Ts>}
        >
            <Container className="center">
                <UrlImageDownloader
                    imageUrl={evidence?.evidence as any}
                    buttonText='ดาวน์โหลด'
                />
            </Container>
            <Container className="center">
                <p>
                    ชำระเมื่อ {new Date(evidence?.created as any).toLocaleString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                    })}
                </p>
            </Container>
        </Modal>
    )
}

export default ModalEvidence