import { Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ErrorMessage } from 'formik';
import { Fragment } from 'react';

interface Props {
    label: string;
    name: string;
    status?: any;
    type?: string;
    size?: SizeType;
    onChange?:(e: React.ChangeEvent<any>)=> void;
    onBlur?: (e: React.FocusEvent<any, Element>)=>  void;
    value?:any
    button?:any}

const AppPasswordInput = (props : Props) => {
  return (
    <Fragment>
    <label htmlFor={props.name}>{props.label}<em className="required">*</em></label>
    {props.button}
    <Input.Password
        allowClear
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        type={props.type}
        size={props.size || "large"}
        status={props.status}
        name={props.name}
    />
    <ErrorMessage name={props.name} component="div" className="text-danger" />
</Fragment>
  )
}

export default AppPasswordInput