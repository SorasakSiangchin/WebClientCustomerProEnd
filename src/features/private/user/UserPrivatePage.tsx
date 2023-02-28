import { Col, Divider, Image, Row, Table, Switch } from 'antd'
import React from 'react'
import LayoutPrivate from '../LayoutPrivate'
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Role } from '../../../app/models/Account';
import useAccount from '../../../app/hooks/useAccount';
import { backEndUtl, Ts } from '../../../app/util/util';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import agent from '../../../app/api/agent';
import { loadAccountStorage, setAccount } from '../../../app/store/accountSlice';

interface DataType {
  key: React.Key;
  fullName: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
  status: boolean;
  role: Role;
  firstName: string;
  lastName: string;
  password: string;
}




const UserPrivatePage = () => {
  const { account } = useAppSelector(state => state.account);
  const { accounts } = useAccount();
  const dispatch = useAppDispatch();
  const accountStorage = loadAccountStorage();
  const data: DataType[] = accounts.filter(e => e.id !== account?.id).map((account) => {
    return {
      key: account.id,
      firstName: account.firstName,
      email: account.email,
      lastName: account.lastName,
      fullName: `${account.firstName} ${account.lastName}`,
      imageUrl: account.imageUrl,
      phoneNumber: account.phoneNumber,
      role: account.role,
      status: account.status,
      password: account.password,
    } as unknown as DataType
  });

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
      ),

    },
    {
      title: 'ชื่อ',
      dataIndex: 'fullName',
      className: 'text-st',
      width: "20rem",
      render: (data) => (
        <Ts>{data}</Ts>
      ),

      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortDirections: ['descend'],

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
      render: (data, more) => {
        const onChange = async (checked: boolean) => {
          const value = {
            id: more?.key,
            firstName: more?.firstName || "",
            lastName: more?.lastName || "",
            email: more?.email || "",
            password: more?.password || "",
            phoneNumber: more?.phoneNumber || "",
            roleID: more?.role.id || "",
            formFiles: {} || undefined,
            statusLogin: ""
          };
          const { result } = await agent.Account.update(value);
          localStorage.setItem('account', JSON.stringify({ ...accountStorage, account: result }));
          dispatch(setAccount({ account: result }));
        };
        return <Switch
          className='text-st'
          checkedChildren="ใช้งานอยู่"
          unCheckedChildren="ระงับการใช้งาน"
          defaultChecked={data}
          onChange={onChange}

        />
      }
    }
  ];


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