import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Divider, InputNumber, Space } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import state from 'sweetalert/typings/modules/state';

const AppNumberRange = ({ onRangeChange }: any) => {
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(0);
    const [error, setError] = useState<string>("");
    let checkOnClick: boolean;
    useEffect(() => {
        if (start > end && start !== 0 && end !== 0) {
            setError("กรุณาใส่ช่วงของราคาสินค้าให้ถุกต้อง");
            checkOnClick = true;
        }
        else {
            setError("");
            checkOnClick = false;
        }

    }, [start, end]);

    const onClick = () => {
        if (!checkOnClick)  onRangeChange(start, end) ;
        return;
    }

    return (
        <Fragment>
            <Space direction="horizontal">
                <InputNumber prefix="฿" min={0} style={{ width: '100px' }} onChange={(value) => setStart(Number(value))} />
                <Divider type="horizontal" plain style={{ width: "20px", backgroundColor: "#000" }} />
                <InputNumber prefix="฿" min={0} style={{ width: '100px' }} onChange={(value) => setEnd(Number(value))} />
                <Button icon={<CaretRightOutlined />} onClick={onClick} />
            </Space>
            {error ? <p style={{ color:"red" }}>{error}</p> : ""}
        </Fragment>
    )
}

export default AppNumberRange