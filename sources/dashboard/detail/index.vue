<template>
  <div class="detail">
    <div class="row">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/layout/dashboard' }">返回上一级</el-breadcrumb-item>
        <el-breadcrumb-item>首页 &nbsp; &gt; &nbsp;<span>{{name}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="row row1">
      <el-card class="box-card">
        <div slot="header" class="clearfix row1-title">
          <span>各单位行政审批办件情况</span>
        </div>
        <div class="clearfix chart">
          <div class="time-position">
            <div class="block">
              <span class="demonstration">统计时间</span>
              <el-date-picker v-model="value" type="datetimerange" placeholder="选择时间范围">
              </el-date-picker>
            </div>
          </div>
          <div class=" detail-management-chart"></div>
        </div>
      </el-card>
      </div>
      <div class="row row2">
        <el-card class="box-card">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="regionName" label="地区名称" fixed width="150">
            </el-table-column>
            <el-table-column prop="applyNum" label="申请件数" width="95">
            </el-table-column>
            <el-table-column prop="acceptNum" label="受理件数" width="95">
            </el-table-column>
            <el-table-column prop="managedNum" label="办结件数" width="95">
            </el-table-column>
            <el-table-column prop="managedRate" label="办结率" width="90">
            </el-table-column>
            <el-table-column prop="backoutNUm" label="撤销件数" width="95">
            </el-table-column>
            <el-table-column prop="delayNum" label="延时件数" width="95">
            </el-table-column>
            <el-table-column prop="timelyRate" label="即办比例" width="95">
            </el-table-column>
            <el-table-column prop="promiseSpeedup" label="承诺提速" width="95">
            </el-table-column>
            <el-table-column prop="manageSpeedup" label="办理提速" width="95">
            </el-table-column>
            <el-table-column prop="currentManagedRate" label="当日受理办结率" width="135">
            </el-table-column>
            <el-table-column prop="advancesManagedRate" label="提前办结率" width="120">
            </el-table-column>
            <el-table-column prop="punctualManagedRate" label="按时办结率" width="120">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
</template>
<script>
  import Http from "../../common/http.js";
  import echarts from "echarts";
  import { Notification  } from 'element-ui';
  import Moment from "moment";
  const master = Http.url.master;
  export default {
    data() {
      return {
        name:"部门排名详情",
        value: [new Date('2014'), new Date('2017')],
        tableData: []
      }
    },
    mounted() {
      const vm = this;
      // console.log(vm.$route.params)
      vm._data.name =vm.$route.params.name;
      const beginTime =Moment(vm._data.value[0]).format('YYYY-MM-DD HH:mm:ss')
      const endTime =Moment(vm._data.value[1]).format('YYYY-MM-DD HH:mm:ss')
      // console.log(beginTime,endTime);
      vm.getCharts(beginTime,endTime)
    },
    watch :{
      value :function (value,oldVal){
        const vm = this;
        const beginTime =Moment(value[0]).format('YYYY-MM-DD HH:mm:ss')
        const endTime =Moment(value[1]).format('YYYY-MM-DD HH:mm:ss')
        // console.log(beginTime,endTime);
        vm.getCharts(beginTime,endTime)
      }
    },
    methods: {
      showChart (regionName,acceptNum,managedRate){
        // console.log(regionName)
        echarts.dispose(document.querySelector(".detail-management-chart"));
        const chart =echarts.init(document.querySelector(".detail-management-chart"));
        chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            data: ['受理件数', '办结率'],
            right: 10,
            textStyle: {
              color: '#52547D',
              fontSize: 12
            },
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '5%',
            containLabel: true,
          },
          textStyle: {
            color: '#52547D',
            fontSize: 12
          },
          xAxis: [{
            type: 'category',
            // data: ['交通厅', '林业厅', '文化厅', '社保厅', '广电局', '国土厅', '省卫计委', '省工商局', '省级纪委', '民政厅', '司法厅', '环境保护厅', '住建厅', '商务厅', '省地税局', '省旅游局', '省质监局', '省体育局', '省统计局', '省食药监'],
            data:regionName,
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              align: 'left'
            }
          }],
          yAxis: [{
              type: 'value',
              name: '受理件数',
              min: 0,
              max: 2000,
              interval: 250,
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#52547D',
                }
              },
            },
            {
              type: 'value',
              name: '办结率',
              min: 0,
              max: 100,
              interval: 30,
              axisLabel: {
                formatter: '{value} %',
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#52547D',
                }
              },
            }
          ],
          series: [{
              name: '受理件数',
              type: 'bar',
              barWidth: '50%',
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: '#04E8C9' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#292742' // 100% 处的颜色
                    }],
                  }
                }
              },
              // data: [750, 1450, 490, 1875, 900, 800, 1050, 650, 1650, 1200, 1950, 1450, 490, 1100, 1240, 1700, 300, 1300, 1950, 800]
              data:acceptNum
            },
            {
              name: '办结率',
              type: 'line',
              yAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: '#4880FD' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#473CB4' // 100% 处的颜色
                    }],
                  }
                }
              },
              // data: [70, 90, 77, 80, 68, 72, 65, 85, 92, 78, 82, 75, 50, 61, 55, 75, 40, 85, 80, 58]
              data:managedRate
            }
          ]
      });
      },
      getCharts(beginTime,endTime){
        const vm = this;
        Http.fetch({
          method: "get",
          url: master + "/departments_manage_items",
          params: {
             beginTime:beginTime ,
             endTime: beginTime,endTime
          }
        }).then(
          function (result) {
            if(result.data.head.status==200){
              //  console.log(result.data)
               let data = result.data.body;
               vm.tableData =result.data.body;
               let regionName =[]; //部门名字
               let acceptNum =[];//受理件数
               let managedRate =[];//办结率
               for(let i in data ){
                 regionName.push(data[i].regionName);
                 acceptNum.push(data[i].acceptNum);
                 let length =data[i].managedRate.length;
                 let rate =data[i].managedRate;
                 managedRate.push(rate.substring(0,length-1))
               }
               vm.showChart(regionName,acceptNum,managedRate);
            }else{
              Notification ({
                type:"error",
                title: '各单位行政审批情况',
                message: result.data.head.message,
              });
            }
           
          });
      }

    }
  };
</script>
<style lang="less" scoped>
  @import "../../common/base.less";
  .detail {
    display: flex;
    flex-direction: column;
    .el-breadcrumb {
      font-size: @size-text-large;
      color: @color-font-regular;
      line-height: 1.25rem;
    }
    .row1 {
      width: 100%;
      height: 37.5rem;
      display: flex;
      flex-direction: row;
      .row1-title {
        text-align: center;
        font-size: @size-title-small;
        color: @color-font-light;
        line-height: 1.38rem;
      }
      .chart {
        color: @color-font-deep;
        font-size: @size-text-large;
        .time-position {
          margin-bottom: -2rem;
          padding-bottom: 0.6rem;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
        }
        .detail-management-chart {
          padding: 0;
          width: 100%;
          height: 32rem;
        }
      }
    }
    .row2 {
      width: 100%;
      height: 76rem;
      background: @color-backgound-regular;
      display: flex;
      flex-direction: row;
      .el-table {}
    }
  }
</style>