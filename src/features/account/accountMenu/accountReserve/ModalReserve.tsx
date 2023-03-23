import { Avatar, Card, List, Modal, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import { Order } from '../../../../app/models/Order';
import moment from 'moment-timezone';

interface Props {
  open: boolean;
  setOpen: Function;
  order: Order;
  handleCancel: Function
};

const ModalReserve = ({ open, setOpen, order, handleCancel }: Props) => {

  return (
    <Modal

      centered
      footer={false}
      open={open}
      onCancel={() => handleCancel()}
      width="60rem"
    >
      <List
        itemLayout="vertical"
        size="small"
        dataSource={order?.orderMessage}
        className="text-st"
        renderItem={(item) => (
          <List.Item

            key={item.id}
          >
            <Space>
              <Card.Meta
                 
                style={{ display: 'flex'  }}
                className='text-st'
                avatar={<Avatar src={item.account?.imageUrl} style={{ marginRight : "8px" }} />}
                title={`${item.account?.firstName} ${item.account?.lastName}`}
                description={<h6>{moment.utc(item.created).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')}</h6>}
              />
            </Space>
              <h4  className='text-st' >{item.message}</h4>
          </List.Item>
        )}
      />
    </Modal>
  );
}

export default ModalReserve