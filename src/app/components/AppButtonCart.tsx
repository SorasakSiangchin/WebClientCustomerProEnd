import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

interface Prop {
  children: any;
  onClick?: any;
  disabled?: boolean;
  size? : SizeType;
}

const AppButtonCart = ({ children, onClick, disabled , size }: Prop) => {
  return (
    <Button
      size={size}
      htmlType='button'
      disabled={disabled}
      onClick={() => onClick()}
      icon={<ShoppingCartOutlined style={{ fontSize : "30px" }} />}
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