import React from 'react'
interface Props {
    ReactFC: any;
    data: any;
  }
const Column3D = ({ ReactFC, data }: Props) => {
    const chartConfigs = {
        type: "column3d",
        width: "100%",
        height: "400",
        dataFormat: "json",
        dataSource: {
            chart: {
                caption: "",
                subCaption: "",
                xAxisName: "Month",
                yAxisName: "",
                theme: "fusion"
            },
          data
        }
      };
  return (
    <ReactFC  {...chartConfigs} />
  )
}

export default Column3D