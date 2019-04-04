function calcRem() {
  var baseFontSize = 12
  var baseWidth = 1440
  var baseHeight = 900
  var width = $('body').outerWidth()
  var height = $('body').outerHeight()
  var size = (width * baseFontSize) / baseWidth
  var hSize = (height * baseFontSize) / baseHeight
  $.globalData.rootSize = size > hSize ? hSize : size
  $('html').css('font-size', size + 'px')
}
function initDom() {
  $('.four-angle').each(function() {
    $(this).append('<div class="left-top"></div><div class="left-bottom"></div><div class="right-top"></div><div class="right-bottom"></div>')
  })
}
function getArrow(width, status) {
  let color = status === 'asc' ? '#FF4200' : '#00FFC0'
  let w = width
  let w1 = w / 4
  let w2 = w / 2
  let w3 = (w * 3) / 4
  let h = w * 2.5
  let h1 = h / 3
  let h2 = (h * 2) / 3
  let d = ''
  if (status === 'asc') {
    d = 'M' + w2 + ' 0 L' + w + ' ' + h1 + ' L' + w3 + ' ' + h1 + ' L' + w3 + ' ' + h + ' L' + w1 + ' ' + h + ' L' + w1 + ' ' + h1 + ' L0' + ' ' + h1 + ' Z'
  } else {
    d = 'M' + w1 + ' 0 L' + w3 + ' 0' + ' L' + w3 + ' ' + h2 + ' L' + w + ' ' + h2 + ' L' + w2 + ' ' + h + ' L0 ' + h2 + ' L' + w1 + ' ' + h2 + ' L' + w1 + ' 0 Z'
  }
  return '<path d="' + d + '" fill="' + color + '" />'
}

$.fn.numbers = function(options) {
  function getNumberDom(number, dec) {
    var dom = ''
    while (number--) {
      dom += getDom()
    }
    return dom
  }
  function getDom() {
    var s = $.globalData.rootSize
    var w = s * 0.8
    var h = w / 4
    var h2 = h / 2
    var w1 = w / 8
    var w2 = (w * 7) / 8
    var path = 'M0 ' + h / 2 + ' L' + w1 + ' ' + h + ' L' + w2 + ' ' + h + ' L' + w + ' ' + h2 + ' L' + w2 + ' 0' + ' L' + w1 + ' 0 Z'
    var dom = '<div class="number">'
    for (var i = 1; i <= 7; i++) {
      dom += '<div class="line type-' + i + '">' + '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="' + path + '" style="fill:rgb(252,183,84);stroke:rgb(252,183,84);" /> </svg></div>'
    }
    dom += '</div>'
    return dom
  }

  $(this).each(function(i) {
    var number = $(this).data('int')
    var dec = $(this).data('dec')
    $(this).html(getNumberDom(number, dec))
  })
}
$.fn.table = function(options) {
  var data = [
    {
      school: '模拟1学院',
      consume: 10235,
      total: 13393,
      status: 'asc'
    },
    {
      school: '测试大学',
      consume: 7356,
      total: 11945,
      status: 'desc'
    },
    {
      school: '随机大学某个校区',
      consume: 8657,
      total: 11034,
      status: 'asc'
    },
    {
      school: '稳定学院',
      consume: 5853,
      total: 10498,
      status: 'desc'
    },
    {
      school: '科技学院',
      consume: 4532,
      total: 10075,
      status: 'asc'
    },
    {
      school: '理工学院',
      consume: 6278,
      total: 9771,
      status: 'desc'
    },
    {
      school: '工业大学',
      consume: 6054,
      total: 9643,
      status: 'asc'
    },
    {
      school: '理工学院',
      consume: 5436,
      total: 9613,
      status: 'asc'
    },
    {
      school: '轻工大学',
      consume: 3245,
      total: 5603,
      status: 'desc'
    },
    {
      school: '职业学院',
      consume: 3012,
      total: 5450,
      status: 'asc'
    }
  ]
  function getLines(perc) {
    let dom = ''
    let n = parseInt(perc / 10, 10)
    for (let i = 0; i < 10; i++) {
      dom += '<span class="' + (i < n ? 'active' : '') + '"></span>'
    }
    return dom
  }
  function getItem(info, index) {
    var rate = $.globalData.rootSize
    var arrowWidth = rate * 0.4
    return (
      '<div class="table-row">' +
      '<div class="row-school"><span>' +
      (index + 1) +
      '</span>' +
      info.school +
      '</div>' +
      '<div class="row-users">' +
      '<div class="user-text">' +
      '人数: <span class="text-active">' +
      info.consume +
      '</span><span class="text-total">/' +
      info.total +
      '</span>' +
      '</div>' +
      '<div class="user-line">' +
      getLines(info.perc) +
      '</div>' +
      '</div>' +
      '<div class="row-status ' +
      info.status +
      '">' +
      info.perc +
      '<span>%</span><svg version="1.1" style="width:' +
      arrowWidth +
      'px;height: 1rem;" xmlns="http://www.w3.org/2000/svg">' +
      getArrow(arrowWidth, info.status) +
      '</svg></div>' +
      '</div>'
    )
  }
  function getList(data) {
    let dom = ''
    data.sort((a, b) => {
      return b.consume / b.total - a.consume / a.total
    })
    data.forEach((i, index) => {
      i.perc = ((i.consume * 100) / i.total).toFixed(0)
      dom += getItem(i, index)
    })
    return dom
  }
  setInterval(() => {
    let list = JSON.parse(JSON.stringify(data))
    list.forEach(d => {
      let n = (Math.random() - 0.5) * 400
      d.consume += parseInt(n, 10)
    })
    let users = 259468 + parseInt((Math.random() - 0.5) * 2000, 10)
    $('#online').text(users)
    $(this).html(getList(list))
  }, 3600)
  $(this).html(getList(data))
}
function initCharge() {
  var rate = $.globalData.rootSize
  var data = [
    { value: 32, name: '5元', index: 0 },
    { value: 1, name: 'gap' },
    { value: 23, name: '10元', index: 1 },
    { value: 1, name: 'gap' },
    { value: 15, name: '20元', index: 2 },
    { value: 1, name: 'gap' },
    { value: 10, name: '30元', index: 3 },
    { value: 1, name: 'gap' },
    { value: 6, name: '50元', index: 4 },
    { value: 1, name: 'gap' },
    { value: 4, name: '100元', index: 5 },
    { value: 1, name: 'gap' }
  ]
  var chart = echarts.init($('.chart.charge')[0])
  var linearColors = [
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(234,45,46,0.2)'
        },
        {
          offset: 1,
          color: 'rgba(234,45,46,1)'
        }
      ]
    },
    {
      type: 'linear',
      x: 1,
      y: 0,
      x2: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(243,136,40,0.2)'
        },
        {
          offset: 1,
          color: 'rgba(243,136,40,1)'
        }
      ]
    },
    {
      type: 'linear',
      x: 0.5,
      y: 1,
      x2: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(243,188,40,0.2)'
        },
        {
          offset: 1,
          color: 'rgba(243,188,40,1)'
        }
      ]
    },
    {
      type: 'linear',
      x: 0,
      y: 1,
      x2: 0.5,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(40,243,226,0.2)'
        },
        {
          offset: 1,
          color: 'rgba(40,243,226,1)'
        }
      ]
    },
    {
      type: 'linear',
      x: 0,
      y: 0.3,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(40,131,243,0.2)'
        },
        {
          offset: 1,
          color: 'rgba(40,131,243,1)'
        }
      ]
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(140,40,243,0.2)'
        },
        {
          offset: 1,
          color: 'rgba(140,40,243,1)'
        }
      ]
    }
  ]
  var option = {
    color: ['#EA2D2E', '#F38828', '#F3BC28', '#28F3E2', '#2883F3', '#8C28F3'],
    legend: {
      orient: 'vertical',
      itemGap: 0.8 * rate,
      formatter: function(name) {
        let value = data.find(d => d.name === name).value
        return '金额: ' + name + '  {a|—}{b| ' + value + '}{c|%}'
      },
      textStyle: {
        fontSize: rate,
        color: '#fff',
        rich: {
          a: {
            color: '#004948',
            fontSize: rate
          },
          b: {
            fontSize: rate,
            color: '#007e7c'
          },
          c: {
            fontSize: rate * 0.7,
            color: '#007e7c'
          }
        }
      },
      itemHeight: rate,
      x: 'left',
      top: '15%',
      left: '55%',
      height: '70%',
      data: [
        { name: '5元', icon: 'circle' },
        { name: '10元', icon: 'circle' },
        { name: '20元', icon: 'circle' },
        { name: '30元', icon: 'circle' },
        { name: '50元', icon: 'circle' },
        { name: '100元', icon: 'circle' }
      ]
    },
    series: [
      {
        name: '金额种类',
        type: 'pie',
        center: ['30%', '50%'],
        radius: ['50%', '70%'],
        // roseType: "radius",
        hoverOffset: rate * 0.6,
        itemStyle: {
          normal: {
            color: function(params) {
              if (params.data.name === 'gap') {
                return 'rgb(0,0,0,0)'
              }
              return linearColors[params.data.index]
            }
          }
        },
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{a|6}{b|种充值金额}',
            rich: {
              a: {
                color: '#fff',
                verticalAlign: 'bottom',
                fontSize: rate * 1.5,
                fontWeight: 'lighter'
              },
              b: {
                color: '#fff',
                verticalAlign: 'bottom',
                fontSize: rate,
                fontWeight: 'lighter'
              }
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: data
      }
    ]
  }
  setInterval(() => {
    let num = parseInt($('#charge').text(), 10)
    $('#charge').text(num + parseInt(Math.random() * 10, 10))
  }, 2200)
  chart.setOption(option)
}
function initWater() {
  var rate = $.globalData.rootSize
  var data = [3200, 6120, 8528, 7012, 9201, 14234, 17002, 23810, 25926, 16303, 13483, 3292]
  var chart = echarts.init($('.chart.water')[0])
  var option = {
    grid: {
      top: 30,
      bottom: 20,
      right: 30,
      left: 40
    },
    xAxis: {
      name: '(点)',
      nameTextStyle: {
        fontSize: 0.8 * rate
      },
      axisLine: {
        lineStyle: {
          color: '#007E7C'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
        fontSize: 0.8 * rate,
        color: '#007E7C'
      },
      type: 'category',
      data: ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
    },
    yAxis: {
      name: '(升)',
      nameTextStyle: {
        fontSize: 0.8 * rate
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#007E7C'
        }
      },
      axisLabel: {
        fontSize: 0.8 * rate,
        color: '#007E7C'
      },
      splitLine: {
        show: false
      },
      type: 'value'
    },
    series: [
      {
        symbol: 'circle',
        symbolSize: 0.3 * rate,
        itemStyle: {
          normal: {
            color: '#010813',
            borderColor: '#08c2ff'
          }
        },
        lineStyle: {
          normal: {
            color: '#00a4AD'
          }
        },
        areaStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(8,194,255,0.6)'
                },
                {
                  offset: 1,
                  color: 'rgba(8,194,255,0)'
                }
              ]
            }
          }
        },
        data: data,
        type: 'line'
      }
    ]
  }
  setInterval(() => {
    let num = parseInt($('#useWater').text(), 10)
    $('#useWater').text((num + Math.random()).toFixed(2))

    let newData = data.map((d, i) => {
      let n = (Math.random() - 0.5) * 5000
      return d + n < 500 ? 500 : d + n
    })
    option.series[0].data = newData
    chart.setOption(option)
  }, 3500)
  chart.setOption(option)
}
function initRepair() {
  var rate = $.globalData.rootSize
  var chart = echarts.init($('.chart.repair')[0])
  var outerBorder = new Array(50).fill(1).map((x, i) => {
    if (i % 2 === 0) {
      return [0.02 * (i + 1), 'rgba(0,126,124,0.4)']
    } else {
      return [0.02 * (i + 1), 'rgba(0,0,0,0)']
    }
  })
  var common = {
    type: 'gauge',
    startAngle: 90,
    endAngle: -269.9,
    splitNumber: 1,
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    pointer: {
      show: false
    },
    title: {
      show: false
    },
    radius: '30%',
    detail: {
      formatter: function(value) {
        return value + '{a|%}'
      },
      fontFamily: 'Digiface',
      fontSize: rate * 1.3,
      offsetCenter: [0, 0],
      color: '#ffa738',
      fontWeight: 'bold',
      rich: {
        a: {
          fontSize: 0.7 * rate,
          color: '#ffa738',
          verticalAlign: 'bottom'
        }
      }
    }
  }
  var borderCommon = {
    type: 'gauge',
    startAngle: 90,
    endAngle: -269.9,
    splitNumber: 1,
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    pointer: {
      show: false
    },
    title: {
      show: false
    },
    detail: {
      show: false
    },
    data: []
  }
  var option = {
    series: [
      {
        center: ['20%', '50%'],
        axisLine: {
          lineStyle: {
            width: rate * 0.4,
            color: [[0.88, new echarts.graphic.RadialGradient(1, 0, 1.5, [{ offset: 0, color: '#08FFFC' }, { offset: 1, color: '#085FFF' }], false)], [1, '#0C405C']]
          }
        },
        ...common,
        axisLabel: {
          formatter: function(value) {
            return value ? '18%{a|⬆}' : ''
          },
          rich: {
            a: {
              color: '#FF4200'
            }
          },
          color: '#007E7C',
          fontSize: rate * 1,
          distance: rate * 5
        },
        name: '工单派发及时率',
        title: {
          color: '#007E7C',
          fontSize: rate * 0.8,
          offsetCenter: [0, '-160%']
        },
        data: [{ value: 88.5, name: '工单派发及时率' }]
      },
      {
        ...borderCommon,
        center: ['20%', '50%'],
        axisLine: {
          lineStyle: {
            width: rate * 0.1,
            color: [[1, '#007E7C']]
          }
        },
        radius: '23%',
        name: '工单派发及时率'
      },
      {
        ...borderCommon,
        center: ['20%', '50%'],
        axisLine: {
          lineStyle: {
            width: rate * 0.1,
            color: outerBorder
          }
        },
        radius: '35%',
        name: '工单派发及时率'
      },
      {
        center: ['50%', '50%'],
        axisLine: {
          lineStyle: {
            width: rate * 0.4,
            color: [[0.75, new echarts.graphic.RadialGradient(1, 0, 1.5, [{ offset: 0, color: '#08FFFC' }, { offset: 1, color: '#085FFF' }], false)], [1, '#0C405C']]
          }
        },
        ...common,
        axisLabel: {
          formatter: function(value) {
            return value ? '22%{a|⬆}' : ''
          },
          rich: {
            a: {
              color: '#FF4200'
            }
          },
          color: '#007E7C',
          fontSize: rate * 1,
          distance: rate * 5
        },
        name: '维修员到岗及时率',
        title: {
          color: '#007E7C',
          fontSize: rate * 0.8,
          offsetCenter: [0, '-160%']
        },
        data: [{ value: 75.2, name: '维修员到岗及时率' }]
      },
      {
        ...borderCommon,
        center: ['50%', '50%'],
        axisLine: {
          lineStyle: {
            width: rate * 0.1,
            color: [[1, '#007E7C']]
          }
        },
        radius: '23%',
        name: '维修员到岗及时率'
      },
      {
        ...borderCommon,
        center: ['50%', '50%'],
        axisLine: {
          lineStyle: {
            width: rate * 0.1,
            color: outerBorder
          }
        },
        radius: '35%',
        name: '维修员到岗及时率'
      },
      {
        center: ['80%', '50%'],
        axisLine: {
          lineStyle: {
            width: rate * 0.4,
            color: [[0.68, new echarts.graphic.RadialGradient(1, 0, 1.5, [{ offset: 0, color: '#08FFFC' }, { offset: 1, color: '#085FFF' }], false)], [1, '#0C405C']]
          }
        },
        ...common,
        axisLabel: {
          formatter: function(value) {
            return value ? '13%{a|⬆}' : ''
          },
          rich: {
            a: {
              color: '#FF4200'
            }
          },
          color: '#007E7C',
          fontSize: rate * 1,
          distance: rate * 5
        },
        name: '服务质量满意度',
        title: {
          color: '#007E7C',
          fontSize: rate * 0.8,
          offsetCenter: [0, '-160%']
        },
        data: [{ value: 68.8, name: '服务质量满意度' }]
      },
      {
        ...borderCommon,
        center: ['80%', '50%'],
        axisLine: {
          lineStyle: {
            width: rate * 0.1,
            color: [[1, '#007E7C']]
          }
        },
        radius: '23%',
        name: '服务质量满意度'
      },
      {
        ...borderCommon,
        center: ['80%', '50%'],
        axisLine: {
          lineStyle: {
            width: rate * 0.1,
            color: outerBorder
          }
        },
        radius: '35%',
        name: '服务质量满意度'
      }
    ]
  }
  setInterval(() => {
    let num = parseInt($('#repair').text(), 10)
    if (num > 10000) {
      num = 8482
    }
    $('#repair').text(num + parseInt(Math.random() * 10, 10))
  }, 5000)
  chart.setOption(option)
}
function initTempStatus() {
  var rate = $.globalData.rootSize
  var chart = echarts.init($('.chart.temp-status')[0])
  var option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        splitNumber: 1,
        axisLine: {
          lineStyle: {
            width: rate * 0.4,
            color: getColor(55)
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        pointer: {
          show: false
        },
        title: {
          show: false
        },
        radius: '100%',
        name: '业务指标',
        detail: {
          formatter: ['{a|状态}', '{b|常温}{c|⬆}'].join('\n'),
          fontSize: rate * 1.5,
          offsetCenter: [0, '-25%'],
          color: '#FFBE4E',
          fontWeight: 'bold',
          lineHeight: rate * 1.2,
          rich: {
            a: {
              fontSize: 0.7 * rate,
              color: '#999999',
              align: 'center'
            },
            b: {
              fontSize: rate,
              color: '#FFBE4E',
              align: 'center'
            },
            c: {
              fontSize: 0.8 * rate,
              color: '#FF4200'
            }
          }
        },
        data: [{ value: 55, name: '完成率' }]
      }
    ]
  }
  function getColor(value) {
    return [[value / 100, new echarts.graphic.RadialGradient(0, 1, 1, [{ offset: 0, color: '#FFC000' }, { offset: 1, color: '#FF4200' }], false)], [1, '#0C405C']]
  }
  setInterval(() => {
    let rnd = (Math.random() - 0.5) / 10
    let value = 55 + 55 * rnd
    let color = getColor(parseInt(value, 10))
    option.series[0].axisLine.lineStyle.color = color
    option.series[0].data[0].value = value
    chart.setOption(option)
    $('#temp').text(value.toFixed(1))
  }, 2000)
  chart.setOption(option)
}
function initTemp() {
  initTempStatus()
  var rate = $.globalData.rootSize
  var chart = echarts.init($('.chart.temp')[0])
  var dataAxis = ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  var data = [33, 37, 40, 44, 38, 40, 42, 43, 44, 45, 40, 21, 13, 10, 7, 2, 1, 1, 1, 2, 5, 12, 18, 27]

  var option = {
    grid: {
      top: 15,
      bottom: 20
    },
    xAxis: {
      name: '(点)',
      nameGap: 0,
      nameTextStyle: {
        color: '#007E7C',
        fontSize: 0.8 * rate
      },
      data: dataAxis,
      boundaryGap: true,
      axisLabel: {
        interval: 2,
        fontSize: 0.8 * rate,
        color: '#007E7C'
      },
      axisTick: {
        alignWithLabel: true,
        interval: 0,
        lineStyle: {
          color: 'rgba(255,255,255,0.6)'
        }
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      name: '(°C)',
      nameGap: 0,
      nameTextStyle: {
        color: '#007E7C',
        fontSize: 0.8 * rate
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 0.8 * rate,
        color: '#007E7C'
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        type: 'bar',
        barWidth: rate * 0.4,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#FF5216' }, { offset: 0.1, color: '#FF7316' }, { offset: 1, color: '#00ADAA' }])
          }
        },
        data: data
      }
    ]
  }
  setInterval(() => {
    let newData = data.map(d => {
      let rnd = (Math.random() - 0.5) / 10
      let value = d + d * rnd
      return parseInt(value < 0 ? 0 : value, 10)
    })
    option.series[0].data = newData
    chart.setOption(option)
  }, 2000)
  chart.setOption(option)
}
function initMap() {
  var rate = $.globalData.rootSize
  var chart = echarts.init($('.chart.map')[0])
  var mapCommon = {
    type: 'map',
    mapType: 'china',
    geoIndex: 1,
    selectedMode: true,
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      normal: {
        areaColor: '#04203d',
        borderType: 'solid',
        borderWidth: 1,
        borderColor: '#007E7C'
      },
      emphasis: {
        areaColor: '#1a4974',
        borderColor: '#00f2ff',
        borderType: 'solid',
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowBlur: rate,
        shadowOffsetX: -2 * rate,
        shadowOffsetY: 0,
        opacity: 1
      }
    }
  }
  var scatterCommon = {
    type: 'effectScatter',
    coordinateSystem: 'geo',
    symbolSize: rate * 0.7,
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: false
      }
    }
  }
  var option = {
    color: ['#00FFCC', '#00FFCC', '#FFC000', '#FFC000', '#FF4200', '#FF4200'],
    legend: {
      bottom: rate * 3,
      right: 0,
      itemHeight: rate,
      selected: { 健康: true, 异常: false, 报警: false },
      selectedMode: 'single',
      textStyle: {
        color: '#FFF',
        fontSize: rate
      },
      data: [{ name: '健康', icon: 'circle' }, { name: '异常', icon: 'circle' }, { name: '报警', icon: 'circle' }]
    },
    geo: {
      map: 'china',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      }
    },
    series: [
      {
        name: '健康',
        ...mapCommon,
        data: [{ name: '广东', selected: true }, { name: '贵州', selected: true }, { name: '湖北', selected: true }, { name: '山西', selected: true }, { name: '山东', selected: true }]
      },
      {
        name: '健康',
        ...scatterCommon,
        data: [
          {
            name: '',
            value: [113.23, 23.16]
          },
          {
            name: '',
            value: [106.71, 26.57]
          },
          {
            name: '',
            value: [114.31, 30.52]
          },
          {
            name: '',
            value: [112.53, 37.87]
          },
          {
            name: '',
            value: [117, 36.65]
          }
        ],
        itemStyle: {
          normal: {
            color: '#00FFCC'
          }
        }
      },
      {
        name: '异常',
        ...mapCommon,
        data: [{ name: '湖南', selected: true }, { name: '江苏', selected: true }]
      },
      {
        name: '异常',
        ...scatterCommon,
        data: [
          {
            name: '',
            value: [113, 28.21]
          },
          {
            name: '',
            value: [118.78, 32.04]
          }
        ],
        itemStyle: {
          normal: {
            color: '#FFC000'
          }
        }
      },
      {
        name: '报警',
        ...mapCommon,
        data: [{ name: '四川', selected: true }, { name: '河南', selected: true }, { name: '浙江', selected: true }]
      },
      {
        name: '报警',
        ...scatterCommon,
        data: [
          {
            name: '',
            value: [104.06, 30.67]
          },
          {
            name: '',
            value: [113.65, 34.76]
          },
          {
            name: '',
            value: [120.19, 30.26]
          }
        ],
        itemStyle: {
          normal: {
            color: '#FF4200'
          }
        }
      }
    ]
  }
  setInterval(function() {
    let types = ['健康', '异常', '报警']
    let selected = option.legend.selected
    let current = 0
    types.forEach((t, i) => {
      if (selected[t]) {
        current = i + 1
      }
      selected[t] = false
    })
    if (current >= types.length) {
      current = 0
    }
    selected[types[current]] = true
    chart.setOption(option)
  }, 4000)
  chart.setOption(option)
}
function initDeviceStatus() {
  var rate = $.globalData.rootSize
  var data = [
    { value: 86, name: '正常状态' },
    { value: 3, name: '设备故障' },
    {
      value: 11,
      name: '预警状态'
    }
  ]
  var chart = echarts.init($('.chart.device')[0])
  var option = {
    color: ['#08C2FF', '#0C405C', '#FF4200'],
    legend: {
      orient: 'vertical',
      x: 'left',
      top: '15%',
      left: '50%',
      height: '70%',
      itemGap: 0.5 * rate,
      itemHeight: 0.8 * rate,
      formatter: function(name) {
        let value = data.find(d => d.name === name).value
        return name + '  {a|—}{b| ' + value + '}{c|%}'
      },
      textStyle: {
        color: '#fff',
        fontSize: rate,
        rich: {
          a: {
            fontSize: rate,
            color: '#004948'
          },
          b: {
            fontSize: rate,
            color: '#007E7C'
          },
          c: {
            fontSize: rate * 0.7,
            color: '#007E7C'
          }
        }
      },
      data: [{ name: '正常状态', icon: 'circle' }, { name: '设备故障', icon: 'circle' }, { name: '预警状态', icon: 'circle' }]
    },
    series: [
      {
        name: '设备状态分布',
        type: 'pie',
        selectedOffset: 0,
        legendHoverLink: false,
        hoverAnimation: false,
        center: ['25%', '50%'],
        radius: ['60%', '70%'],
        // roseType: "radius",
        hoverOffset: rate * 0.6,
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: data
      }
    ]
  }
  function warn(time) {
    setTimeout(() => {
      let num = parseInt($('#warn').text(), 10)
      $('#warn').text(num + 1)
      warn(parseInt(Math.random() * 10 + 3, 10))
    }, time * 1000)
  }
  warn(3.7)
  chart.setOption(option)
}
function initAbnormal() {
  var rate = $.globalData.rootSize
  var chart = echarts.init($('.chart.abnormal')[0])
  var dataAxis = ['人为破坏', '设备故障', '网络中断', '设备报错', '监控失效', '数据异常', '未知异常']
  var data = [1023, 4695, 1538, 3192, 1923, 2732, 1163]

  var option = {
    grid: {
      top: 15,
      right: 10,
      bottom: 20
    },
    xAxis: {
      data: dataAxis,
      boundaryGap: true,
      axisLabel: {
        interval: 0,
        formatter: v => '{a|' + v + '}',
        showMinLabel: true,
        showMaxLabel: true,
        margin: 0.5 * rate,
        color: '#007E7C',
        rich: {
          a: {
            width: rate,
            fontSize: 0.8 * rate
          }
        }
      },
      axisTick: {
        show: false,
        alignWithLabel: true,
        interval: 0,
        lineStyle: {
          color: 'rgba(255,255,255,0.6)'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#007E7C'
        }
      },
      z: 10
    },
    yAxis: {
      name: '(次)',
      nameTextStyle: {
        fontSize: rate * 0.8
      },
      nameGap: 0,
      axisLine: {
        lineStyle: {
          color: '#007E7C'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        margin: 5,
        fontSize: 0.8 * rate,
        color: '#007E7C'
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        type: 'bar',
        barWidth: rate * 0.8,
        itemStyle: {
          normal: {
            barBorderRadius: [rate, rate, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#08C2FF' }, { offset: 1, color: 'rgba(8,194,255,0)' }])
          }
        },
        data: data
      }
    ]
  }
  function abnormal(time) {
    setTimeout(() => {
      let num = parseInt($('#abnormal').text(), 10)
      $('#abnormal').text(num + 1)
      abnormal(parseInt(Math.random() * 10 + 5, 10))
    }, time * 1000)
  }
  abnormal(5)
  chart.setOption(option)
}
