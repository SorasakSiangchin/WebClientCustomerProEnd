import { Button } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

interface Prop {
  children: any;
  onClick?: any;
  disabled?: boolean;
  size? : SizeType;
  icon? : any;
}

const AppButtonCart = ({ children, onClick, disabled , size , icon }: Prop) => {
  return (
    <Button
      size={size}
      htmlType='button'
      disabled={disabled}
      onClick={() => onClick()}
      icon={icon}
      className="button btn-cart"
      style={{
        height: "54px", display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      {children}
    </Button>
  )
}

export default AppButtonCart