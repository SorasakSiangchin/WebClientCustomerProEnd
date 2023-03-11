import { Col, Divider, Row } from 'antd';
import { useParams } from 'react-router-dom';
import LayoutPrivate from '../LayoutPrivate';

const UserDetailPrivatePage = () => {
    const { id } = useParams<{ id: any }>();
    return (
        <LayoutPrivate>
        <Row>
          <Col span={8}><h1 className='text-st'>รายละเอียดผู้ใช้งาน</h1></Col>
          <Col span={8} offset={8} style={{ display: "flex", justifyContent: "end" }}>
            <h1>
            
            </h1>
          </Col>
        </Row>
        <Divider />
        
      </LayoutPrivate>
    )
}

export default UserDetailPrivatePage