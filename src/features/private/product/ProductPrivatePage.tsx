
import { useEffect, useRef, useState } from 'react';
import { DeleteFilled, EditFilled, InfoCircleFilled, PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Col, Divider, Dropdown, Image, InputRef, MenuProps, Row, Tag } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import useProducts from '../../../app/hooks/useProducts';
import { WeightUnit, CategoryProduct } from "../../../app/models/Product";
import { currencyFormat, Ts } from '../../../app/util/util';
import { useNavigate } from 'react-router-dom';
import LayoutPrivate from '../LayoutPrivate';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { removeProductAsync, setParams } from '../../../app/store/productSlice';
import AppPagination from '../../../app/components/AppPagination';
import AppSwal from '../../../app/components/AppSwal';
export interface DataType {
  key: string;
  name: string;
  price: number;
  stock: number;
  color: string;
  weight: number;
  description: string;
  imageUrl: string;
  accountID: string;
  created: Date;
  lastUpdate: Date;
  weightUnitID: number;
  categoryProductID: number;
  weightUnit: WeightUnit;
  categoryProduct: CategoryProduct;
}
type DataIndex = keyof DataType;

const columnDatas = [
  { key: "name", title: "ชื่อ" },
  { key: "imageUrl", title: "รูปภาพ" },
  { key: "price", title: "ราคา" },
  { key: "stock", title: "คลัง" },
  { key: "action", title: "เมนู" },
];

const ProductPrivatePage = () => {
  const { metaData, products } = useProducts();
  const { account } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    dispatch(setParams({ accountID: account?.id }));
  }, [dispatch, account]);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const data: DataType[] = products.map(product => ({
    key: product.id,
    name: product.name,
    accountID: product.accountID,
    imageUrl: product.imageUrl,
    price: product.price,
    stock: product.stock,
    weight: product.weight,
    categoryProduct: product.categoryProduct,
    categoryProductID: product.categoryProductID,
    color: product.color,
    created: product.created,
    description: product.description,
    lastUpdate: product.lastUpdate,
    weightUnit: product.weightUnit,
    weightUnitID: product.weightUnitID,
    levelProductID: product.levelProductID
  })) as DataType[];

  const getColumnSearchProps = (dataIndex: DataIndex, title?: string): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          className="text-st"
          placeholder={`ค้นหา ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            className="text-st"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            ค้นหา
          </Button>
          <Button
            className="text-st"
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            รีเซ็ต
          </Button>
          <Button
            type="link"
            size="small"
            className="text-st"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            กรอง
          </Button>
          <Button
            type="link"
            size="small"
            className="text-st"
            onClick={() => {
              close();
            }}
          >
            ยกเลิก
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (data) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          className='text-st'
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={data ? title === "ราคา" ? "฿" + data.toString() : data.toString() : ''}
        />
      ) :
        (
          <Ts>
            {title === "ราคา" ? <Tag style={{ fontSize: "15px" }} className='text-st' color={"blue"} key={"dddd"}>
              {currencyFormat(data)}
            </Tag> : data}
          </Ts>
        )
    ,
  });

  const onDelete = (id: any) => {
    AppSwal(
      {
        icon: "warning",
        onThen: (result: any) => { result.isConfirmed && dispatch(removeProductAsync(id)) },
        title: 'ลบสินค้าหรือไม่'
      }
    );
  };

  const columns: ColumnsType<DataType> = columnDatas.map(column => {

    if (column.key === "imageUrl") return {
      title: <Ts>{column.title}</Ts>,
      dataIndex: column.key,
      key: column.key,
      width: '30%',
      render: (data) => (
        <Image src={data} width={100} />
      )
    }
    if (column.key === "action") return {
      title: <Ts>{column.title}</Ts>,
      dataIndex: column.key,
      key: column.key,
      width: '30%',
      render: (_, _more) => {
        const items: MenuProps['items'] = [
          {
            label: 'แก้ไข',
            key: '1',
            icon: <EditFilled />,
            className: "text-st",
            style: { color: "#ffbe0b" },
            onClick: () => navigate("/private/product/form", { state: _more }),
          },
          {
            label: 'เพิ่มเติม',
            key: '2',
            icon: <InfoCircleFilled />,
            className: "text-st",
            style: { color: "#0077b6" },
            onClick: () => navigate(`/private/product/detail/${_more.key}`)
          },
          {
            label: 'ลบ',
            key: '3',
            icon: <DeleteFilled />,
            className: "text-st",
            style: { color: "#e63946" },
            onClick: () => onDelete(_more.key)
          },
        ];
        return <Dropdown.Button menu={{ items }} className="text-st">
          <Ts>เลือก</Ts>
        </Dropdown.Button>
      }
    };
    return {
      title: <Ts>{column.title}</Ts>,
      dataIndex: column.key,
      key: column.key,
      width: '30%',
      ...getColumnSearchProps(column.key as DataIndex, column.title),
    };
  }) as ColumnsType<DataType>;

  return (
    <LayoutPrivate>
      <Row  >
        <Col span={8}><h1 className='text-st'>สินค้าของฉัน</h1></Col>
        <Col span={8} offset={8} style={{ display: "flex", justifyContent: "end" }}>
          <h1>
            <Button className='text-st' type="primary" icon={<PlusCircleFilled />} onClick={() => navigate("/private/product/form")}>
              เพิ่มสินค้า
            </Button>
          </h1>
        </Col>
      </Row>
      <Divider />
      <Table columns={columns} dataSource={data} pagination={false} />
      {products.length > 0 && metaData && (
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

export default ProductPrivatePage