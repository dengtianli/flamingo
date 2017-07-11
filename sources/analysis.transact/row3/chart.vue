<template>
 <div class="row3-chart">
   <div slot="header" class="clearfix title">
    <span>{{title}}</span>
  </div>
  <div :class="flag" class="chart1">
  </div>
 </div>
  
</template>
<script>
  import Http from "../../common/http.js";
  import {
    chart
  } from "../../common/helper.js";
  export default {
    props:["title","rate","flag"],
    mounted(rate) {
      // console.log(this.rate)
      chart("."+this.flag, {
        tooltip: {
          formatter: "{a} <br/>{c} {b}"
        },
        series: [{
          name: '承诺提速',
          type: 'gauge',
          min: 0,
          max: 100,
          splitNumber: 10,
          radius: '93%',
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              color: [
                [0.2, '#618FFD'],
                [0.8, '#FFD652'],
                [1, '#FF5C91']
              ],
              width: 3,
              shadowColor: '#fff', //默认透明
              shadowBlur: 10
            }
          },
          axisTick: { // 坐标轴小标记
            length: 5, // 属性length控制线长
            lineStyle: { // 属性lineStyle控制线条样式
              color: 'auto',
              shadowColor: '#fff', //默认透明
              shadowBlur: 10
            }
          },
          splitLine: { // 分隔线
            length: 15, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              width: 3,
              color: '#fff',
              shadowColor: '#fff', //默认透明
              shadowBlur: 10
            }
          },
          pointer: { // 分隔线
            shadowColor: '#fff', //默认透明
            shadowBlur: 5,
            width: 3,
            length: "50%"
          },
          title: {
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontSize: 16,
              color: 'auto',
              shadowColor: '#fff', //默认透明
              shadowBlur: 10
            }
          },
          detail: {
            shadowColor: 'auto', //默认透明
            shadowBlur: 5,
            offsetCenter: [0, '20%'], // x, y，单位px
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontSize: 16,
              color: 'auto'
            }
          },
          data: [{
            value: this.rate,
            name: '%'
          }]
        }, ]
      });
    }
  };
</script>

<style lang="less" scoped>
  @import "../../common/base.less";
  .row3-chart {
    .fill;
    .title {
      text-align: center;
      font-size:@size-text-large;
      color:@color-font-regular
    }
    .chart1 {
      height:13.14rem;
    }
  }
  
</style>
