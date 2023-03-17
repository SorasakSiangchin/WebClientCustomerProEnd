import { Card, Radio, RadioChangeEvent } from 'antd';

const CardPaymentMethod = ({ setPaymentMethod , paymentMethod }: any) => {

    const onChange = (e: RadioChangeEvent) => setPaymentMethod(e.target.value);

    return (
        <Card
            title="ช่องทางการชำระเงิน"
            className="block block-progress text-st"

        >
            <Radio.Group onChange={onChange} value={paymentMethod}>
                <Radio className="text-st" value={0}>โอนชำระ</Radio>
                <Radio className="text-st" value={1}>บัตรเครดิต</Radio>
            </Radio.Group>
        </Card>
    )
}

export default CardPaymentMethod