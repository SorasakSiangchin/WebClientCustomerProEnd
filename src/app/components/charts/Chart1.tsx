import React from 'react';

interface Props {
  ReactFC: any;
  data: any;
  typeChart: string;
  perspective : string;
}

const Chart1 = ({ ReactFC, data, typeChart , perspective}: Props) => {
  const chartConfigs = {
    className: "text-st" ,
    type: `${typeChart}${perspective}`,
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        numberPrefix: "$",
        theme: "fusion"
      },
      data
    }
  };
  
  return (
    <ReactFC   {...chartConfigs} />
  )
}

export default Chart1;