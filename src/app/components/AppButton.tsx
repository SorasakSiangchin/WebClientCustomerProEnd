import { Button } from 'antd';

type Prop = {
    type?: any;
    htmlType?: any;
    loading?: boolean;
    icon?: any;
    className?: string;
    size?: any;
    children?: any;
    onClick?: (event?: any) => void;
}

const AppButton = ({ className, htmlType, icon, loading, size, type, children , onClick}: Prop) => {
    return (
        <Button onClick={onClick} type={type || "default"} htmlType={htmlType} loading={loading} icon={icon} className={`button ${className}`} size={size}>
            {children}
        </Button>
    )
}

export default AppButton;