import { Button } from 'antd';
import { Fragment } from 'react'

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
    onClick={()=>onClick()}
    className="button btn-cart" style={{
      height: "54px", display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
      
    }}>{children}</Button>
  )
}

export default AppButtonCart