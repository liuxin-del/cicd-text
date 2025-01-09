import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import './css/echarts.css'
export default function EchartsComponent() {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);
  const chartRef5 = useRef(null);
  // 定义ECharts的配置选项
  const option1 = {
    title: {
      // text: 'Referer of a Website',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 200, name: '宋浩然' },
          { value: 735, name: '钟凯' },
          { value: 580, name: '张晓' },
          { value: 484, name: '张研' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  const option2 = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '现有客户' },
          { value: 735, name: '网络平台' },
          { value: 580, name: '外出拜访' },
          { value: 484, name: '供应商' },
          { value: 300, name: '推广' }
        ]
      }
    ]
  };
  const option3 = {
    title: {
      // text: 'Referer of a Website',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 200, name: '较低' },
          { value: 735, name: '很高' },
          { value: 580, name: '一般' },
          { value: 484, name: '较低' },
          { value: 600, name: '较高' },
          { value: 100, name: '保底' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  const option4 = {
    xAxis: {
      type: 'category',
      data: ['食品', '直接客户', '医院', '代理商', '加盟商', '零售商', '安装工程']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [
          120,
          {
            value: 200,
            itemStyle: {
              color: '#a90000'
            }
          },
          {
            value: 150,
            itemStyle: {
              color: '#a70123'
            }
          },
          80,
          70,
          110,
          130,
          120,
         
        ],
        type: 'bar'
      }
    ]
  };
  const option5 = {
    xAxis: {
      type: 'category',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '30%']
    },
    visualMap: {
      type: 'piecewise',
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: [
        {
          gt: 1,
          lt: 3,
          color: 'rgba(0, 0, 180, 0.4)'
        },
        {
          gt: 5,
          lt: 7,
          color: 'rgba(0, 0, 180, 0.4)'
        }
      ]
    },
    series: [
      {
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5
        },
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
          data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
        },
        areaStyle: {},
        data: [
          ['2019-10-10', 200],
          ['2019-10-11', 560],
          ['2019-10-12', 750],
          ['2019-10-13', 580],
          ['2019-10-14', 250],
          ['2019-10-15', 300],
          ['2019-10-16', 450],
          ['2019-10-17', 300],
          ['2019-10-18', 100]
        ]
      }
    ]
  };
  useEffect(() => {
    let myChart1, myChart2, myChart3, myChart4,myChart5;
    if (chartRef1.current) {
      myChart1 = echarts.init(chartRef1.current);
      myChart1.setOption(option1);
    }
    if (chartRef2.current) {
      myChart2 = echarts.init(chartRef2.current);
      myChart2.setOption(option2);
    }
    if (chartRef3.current) {
      myChart3 = echarts.init(chartRef3.current);
      myChart3.setOption(option3);
    }
    if (chartRef4.current) {
      myChart4 = echarts.init(chartRef4.current);
      myChart4.setOption(option4);
    }
    if (chartRef5.current) {
      myChart5 = echarts.init(chartRef5.current);
      myChart5.setOption(option5);
    }
    // 清理函数
    return () => {
      if (myChart1) {
        myChart1.dispose();
      }
      if (myChart2) {
        myChart2.dispose();
      }
      if (myChart3) {
        myChart3.dispose();
      }
      if (myChart4) {
        myChart4.dispose();
      }
      if (myChart5) {
        myChart5.dispose();
      }
    };
  }, []);
  return (
    <div>
      <div className="box">
      <div className='ox2'>
        <p>客户来源分布</p>
        <hr />
        <div ref={chartRef2} style={{ width: '350px', height: '250px', backgroundColor: 'pink' }}>
        </div>
      </div>
      <div className='ox1'>
        <p>领用人员分布</p>
        <hr />
        <div ref={chartRef1} style={{ width: '350px', height: '250px', backgroundColor: 'pink' }}>
        </div>
      </div>
      <div className='ox3'>
        <p>价值评估统计</p>
        <hr />
        <div ref={chartRef3} style={{ width: '350px', height: '250px', backgroundColor: 'pink' }}>
        </div>
      </div>
      <div className="ox5">
      <div ref={chartRef4} style={{ width: '670px', height: '300px', backgroundColor: 'pink' }}>
      </div>
      </div>
      <div className="ox6">
      <div ref={chartRef5} style={{ width: '670px', height: '300px', backgroundColor: 'pink' }}></div>
        </div>
      </div>
    </div>
  )
}
