import { Checkbox, Col } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Fragment } from 'react';

interface Props {
    data?: any;
    onChange: (event: CheckboxValueType[]) => void;
}

const AppCheckbox = ({ data, onChange }: Props) => {
    return (
        <Fragment>
            <Checkbox.Group onChange={onChange}>
                <ol>
                    {data?.map((event: any, index : number) =>
                        <li key={index}>
                            <Col span={8}>
                                <Checkbox className="text-st" style={{ width: "100%" }} value={event.name}><p>{event.name}</p></Checkbox>
                            </Col>
                        </li>
                    )}
                </ol>
            </Checkbox.Group>
        </Fragment>
    )
}

export default AppCheckbox