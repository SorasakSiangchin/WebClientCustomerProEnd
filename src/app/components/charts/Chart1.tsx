import { InputNumber } from 'antd';

interface Props {
  ReactFC: any;
  data: any;
  typeChart: string;
  perspective: string;
  setNumber: any;
  dataAll:any;
}

const Chart1 = ({ ReactFC, data, typeChart, perspective, setNumber , dataAll}: Props) => {
  const chartConfigs = {
    className: "text-st",
    type: `${typeChart}${perspective}`,
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        numberPrefix: "%",
        theme: "fusion"
      },
      data
    }
  };

  return (
    <>
      <h4 className='center'>
        สินค้าขายดี
        <InputNumber
          className='text-st'
          style={{ width: "6rem"}}
          min={1}
          onChange={(e) => setNumber(e)}
          max={dataAll?.length}
          defaultValue={data?.length}
          bordered={false}
        /> อันดับแรก
      </h4>

      <ReactFC   {...chartConfigs} /></>
  )
}

export default Chart1;