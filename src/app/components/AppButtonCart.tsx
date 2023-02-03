import { FastBackwardOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface Prop {
  children: any;
  onClick?: any;
  disabled?: boolean;
}

const AppButtonCart = ({ children, onClick, disabled }: Prop) => {
  return (
    <Button
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