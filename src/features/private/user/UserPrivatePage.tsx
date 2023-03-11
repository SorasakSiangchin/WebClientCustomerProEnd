import { Col, Divider, Image, Row, Table, Switch, Input, Space, Select, Button } from 'antd';
import React, { useState } from 'react'
import LayoutPrivate from '../LayoutPrivate'
import type { ColumnsType } from 'antd/es/table';
import { Role } from '../../../app/models/Account';
import useAccount from '../../../app/hooks/useAccount';
import { backEndUtl, Ts } from '../../../app/util/util';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { loadAccountStorage, setAccount } from '../../../app/store/accountSlice';
import { Option } from 'antd/es/mentions';
import AppPagination from '../../../app/components/AppPagination';
import { RedoOutlined } from '@ant-design/icons';
import agent from '../../../app/api/agent';
import { Result } from '../../../app/models/Interfaces/IResponse';
import { Link, useNavigate } from 'react-router-dom';

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
};

enum SearchKey {
  Name = "name",
  Email = "email",
  PhoneNumber = "phoneNumber",
}

const UserPrivatePage = () => {
  const { account } = useAppSelector(state => state.account);
  const navigate = useNavigate();
  const { accounts, metaData, setParams, resetParams } = useAccount();
  const [status, setStatus] = useState<any>(null);
  const [searchKey, setSearchKey] = useState<string>("name");
  const [searchValue, setSearchValue] = useState<any>(null);
  const dispatch = useAppDispatch();

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
      render: (data, more) => (
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
      showSorterTooltip: false,
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
      render: (data) => <Ts>{data}</Ts>
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      className: 'text-st',
      width: "20rem",
      render: (data, more) => {
        const onChange = async (checked: boolean) => {
          const value = {
            id: more?.key,
            firstName: more?.firstName,
            lastName: more?.lastName,
            email: more?.email,
            password: more?.password,
            phoneNumber: more?.phoneNumber,
            roleID: more?.role.id,
            formFiles: {},
            status: checked,
            statusLogin: ""
          };
          await agent.Account.update(value).then(({ isSuccess, statusCode }: Result) =>
            (isSuccess && statusCode === 200) && status && dispatch(setParams({ status }))
          );
        };
        return <Space direction='vertical' className='text-st' style={{ width: "100%" }}>
          <Switch
            className='text-st'
            checkedChildren="ใช้งาน"
            unCheckedChildren="ระงับ"
            defaultChecked={data}
            onChange={onChange}
          />
          <Button size='small' type="link" className='text-st'>
            <Link to={`/private/user/detail/${more.key}`} className='text-st'>
              เพิ่มเติม
            </Link>
          </Button>
        </Space>
      }
    }
  ];

  const onChangeSelectStatus = (value: string) => {
    dispatch(setParams({ status: value }));
    setStatus(value);
  };

  const onChangeSelectKey = (value: string) => {
    setSearchKey(value);
  };

  const onReset = () => {
    dispatch(resetParams());
    setStatus(null);
    setSearchValue(null);
    setSearchKey("name");
  };

  const onSearch = (value: string) => {
    setSearchValue(value);
    switch (searchKey) {
      case SearchKey.Name:
        dispatch(setParams({ searchName: value }));
        break;
      case SearchKey.Email:
        dispatch(setParams({ searchEmail: value }));
        break;
      case SearchKey.PhoneNumber:
        dispatch(setParams({ searchPhoneNumber: value }));
        break;
      default:
        dispatch(resetParams());
        break;
    }
  };

  return (
    <LayoutPrivate>
      <Row  >
        <Col span={8}><h1 className='text-st'>ผู้ใช้งานทั้งหมด</h1></Col>
        <Col span={8} offset={8} style={{ display: "flex", justifyContent: "end" }}>
          <h1>
            <Space size="large">
              <div>
                <Button onClick={onReset} icon={<RedoOutlined />} />
              </div>
              <div>
                <Select
                  className='text-st'
                  showSearch
                  placeholder={"สถานะ"}
                  onChange={onChangeSelectStatus}
                  value={status}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: 'true',
                      label: 'ใช้งาน',
                    },
                    {
                      value: 'false',
                      label: 'ระงับ',
                    }
                  ]}
                />
              </div>
              <div style={{ width: "40rem" }}>
                <Input.Group compact style={{ width: "100%" }} >
                  <Select style={{ width: '30%' }} onSelect={onChangeSelectKey} value={searchKey} >
                    <Option value="name">ชื่อ</Option>
                    <Option value="email">อีเมล</Option>
                    <Option value="phoneNumber">เบอร์โทร</Option>
                  </Select>
                  <Input value={searchValue} onChange={(e) => onSearch(e.target.value)} style={{ width: '70%' }} placeholder="ค้นหา" />
                </Input.Group>
              </div>
            </Space>
          </h1>
        </Col>
      </Row>
      <Divider />
      <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 440 }} />
      {accounts.length > 0 && metaData && (
        <AppPagination
          isSimple={false}
          metaData={metaData}
          onPageChange={(page: number) =>
            dispatch(setParams({ pageNumber: page }))
          }
        />
      )}
    </LayoutPrivate>
  )
}

export default UserPrivatePage