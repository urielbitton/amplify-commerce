import React from 'react'
import ApexCharts from "react-apexcharts"

export function ApexChart(props) {

  const {type, dataArray, series: serie, height, legendPos="top", legendAlign="center"} = props

  const options = {
    chart: {
      id: type,
      toolbar: {
        show: false
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.2
      }
    },
    colors: ['var(--theme2)', 'var(--theme3)', 'var(--theme4)'],
    fill: {
      type: 'solid',
      opacity: 1
    },
    stroke: {
      show: true,
      curve: 'smooth',
      width: 1,   
      lineCap: 'round',  
      opacity: [0.1,0.1]
    },
    legend:  {
      show: true,
      position: legendPos,
      horizontalAlign: legendAlign,
    },
    xaxis: {
      categories: serie
    },
    dataLabels: {
      background: {
        opacity: 0.7
      }
    },
    responsive: [{
      breakpoint: 500,
      options: {
        chart: {
          width: '100%',
        },
        legend: {
          show: true,
          position: legendPos,
          horizontalAlign: legendAlign
        }
      }
    }]
  }
  const series = dataArray

  return (
    <ApexCharts
      options={options}
      series={series}
      type={type}
      height={height}
    />
  )
}

export function ApexChartPie(props) {

  const {type, series, labels, legendPos="top", legendAlign="center"} = props

  const options = {
      chart: {
        type: type,
      },
      legend: {
        position: legendPos,
        horizontalAlign: legendAlign
      },
      colors: ['var(--theme2)', 'var(--theme3)', 'var(--theme4)'],
      fill: {
        type: 'solid',
        opacity: [1,1,1]
      },
      responsive: [{
        breakpoint: 600,
        options: {
          chart: {
            width: '100%'
          },
          legend: {
            position: 'top'
          }
        }
      }],
      labels
    } 

    return (
      <ApexCharts 
        options={options} 
        series={series} 
        type={type} 
      />
    )
  }