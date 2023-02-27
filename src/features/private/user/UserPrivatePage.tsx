import { Col, Divider, Image, Row, Table, Switch } from 'antd'
import React from 'react'
import LayoutPrivate from '../LayoutPrivate'
import type { ColumnsType } from 'antd/es/table';
import { Role } from '../../../app/models/Account';
import useAccount from '../../../app/hooks/useAccount';
import { backEndUtl, Ts } from '../../../app/util/util';
import { useAppSelector } from '../../../app/store/configureStore';

interface DataType {
  key: React.Key;
  fullName: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
  status: boolean;
  role: Role;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'รูปภาพ',
    className: 'text-st',
    dataIndex: 'imageUrl',
    width: "20rem",
    render: (data) => (
      <>
        {data.includes("https://lh3.googleusercontent.com") ?
          <Image src={data} width={100} /> :
          <Image src={backEndUtl + "account/" + data} width={100} />}
      </>
    )
  },
  {
    title: 'ชื่อ',
    dataIndex: 'fullName',
    className: 'text-st',
    width: "20rem",
    render: (data) => (
      <Ts>{data}</Ts>
    )
  },
  {
    title: 'อีเมล',
    dataIndex: 'email',
    className: 'text-st',
    width: "20rem",
    render: (data) => (
      <Ts>{data}</Ts>
    )
  },
  {
    title: 'เบอร์โทร',
    dataIndex: 'phoneNumber',
    className: 'text-st',
    width: "20rem",
    render: (data) => (
      <Ts>{data}</Ts>
    )
  },
  {
    title: 'สถานะ',
    dataIndex: 'phoneNumber',
    className: 'text-st',
    width: "20rem",
    render: (data) => (
      <Switch
        className='text-st'
        checkedChildren="ใช้งานอยู่"
        unCheckedChildren="ระงับการใช้งาน"
        defaultChecked={data} />
    )
  }
];


const UserPrivatePage = () => {
  const { account } = useAppSelector(state => state.account);
  const { accounts } = useAccount();
  const data: DataType[] = accounts.filter(e => e.id !== account?.id).map((account) => {
    return {
      key: account.id,
      email: account.email,
      fullName: `${account.firstName} ${account.lastName}`,
      imageUrl: account.imageUrl,
      phoneNumber: account.phoneNumber,
      role: account.role,
      status: account.status
    } as unknown as DataType
  });
  return (
    <LayoutPrivate>
      <Row  >
        <Col span={8}><h1 className='text-st'>ผู้ใช้งานทั้งหมด</h1></Col>
        <Col span={8} offset={8} style={{ display: "flex", justifyContent: "end" }}>
          <h1>

          </h1>
        </Col>
      </Row>
      <Divider />
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 440 }} />
    </LayoutPrivate>
  )
}

export default UserPrivatePage