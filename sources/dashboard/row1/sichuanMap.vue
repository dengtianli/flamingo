<template>
  <div class="map-chart">
    <el-card class="box-card">
      <div class=" map-title">
        <span>四川省行政许可受理情况</span>
      </div>
      <div class="clearfix chart">
        <div class="time-position">
          <div class="block">
            <span class="demonstration">统计时间</span>
            <el-date-picker v-model="value" type="datetimerange" placeholder="选择时间范围">
            </el-date-picker>
          </div>
        </div>
        <div class="map-chart-content"></div>
      </div>
    </el-card>
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
        value: [new Date('2014'), new Date('2017')],
      }
    },
    mounted() {
      const vm = this;
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
      showChart (data){
        echarts.dispose(document.querySelector(".map-chart-content"));
        const echart =echarts.init(document.querySelector(".map-chart-content"));
          echart.showLoading({
          maskColor: '#292742',
          textColor: '#DBDAEA'
        });
        var name = 'sichuan';
        Http.fetch({
          method: "get",
          url: "http://localhost:5001/dashboard",
          // url:  master + "/dashboard",
        }).then(function(result) {
          echart.hideLoading();
          echarts.registerMap(name, result.data.body[0]);
          echart.setOption({
            backgroundColor: '#292742',
            tooltip: {
              trigger: 'item',
              formatter: '{b}<br/>{c} (件)'
            },
            visualMap: [{
              type: 'piecewise',
              splitNumber: 7,
              pieces: [{
                  min: 500,
                  color: '#E60046',
                  label: '500以上'
                },
                {
                  min: 400,
                  max: 499,
                  color: '#FF256F'
                },
                {
                  min: 300,
                  max: 399,
                  color: '#FF5990'
                },
                {
                  min: 100,
                  max: 199,
                  color: '#FF8EB3'
                },
                {
                  min: 50,
                  max: 99,
                  color: '#FFB7CF'
                },
                {
                  min: 20,
                  max: 49,
                  color: '#FFD1E0'
                },
                {
                  min: 0,
                  max: 19,
                  color: ' #FFE8EF'
                },
              ],
              bottom: '1.6%',
              left: '1.4%',
              textStyle: {
                fontFamily: 'PingFangSC-Medium',
                color: '#52547D',
                fontSize: 14
              }
            }],
            series: [{
              name: '四川省行政许可受理情况',
              type: 'map',
              mapType: name,
              itemStyle: {
                normal: {
                  label: {
                    show: true
                  }
                },
                emphasis: {
                  areaColor: '#58B7FF',
                  label: {
                    show: true
                  }
                }
              },
              label: {
                normal: {
                  show: 'true',
                  textStyle: {
                    fontFamily: 'PingFangSC-Medium',
                    color: '#ffffff'
                  }
                }
              },
              // data: [{
              //     name: '甘孜藏族自治州',
              //     value: 100,
              //   },
              //   {
              //     name: '阿坝藏族羌族自治州',
              //     value: 350
              //   },
              //   {
              //     name: '广元市',
              //     value: 410
              //   },
              //   {
              //     name: '绵阳市',
              //     value: 415
              //   },
              //   {
              //     name: '德阳市',
              //     value: 199
              //   },
              //   {
              //     name: '成都市',
              //     value: 600
              //   },
              //   {
              //     name: '雅安市',
              //     value: 410
              //   },
              //   {
              //     name: '凉山彝族自治州',
              //     value: 400
              //   },
              //   {
              //     name: '攀枝花市',
              //     value: 470
              //   },
              //   {
              //     name: '乐山市',
              //     value: 420
              //   },
              //   {
              //     name: '眉山市',
              //     value: 180
              //   },
              //   {
              //     name: '资阳市',
              //     value: 185
              //   },
              //   {
              //     name: '遂宁市',
              //     value: 70
              //   },
              //   {
              //     name: '内江市',
              //     value: 470
              //   },
              //   {
              //     name: '自贡市',
              //     value: 300
              //   },
              //   {
              //     name: '宜宾市',
              //     value: 340
              //   },
              //   {
              //     name: '泸州市',
              //     value: 330
              //   },
              //   {
              //     name: '广安市',
              //     value: 150
              //   }, {
              //     name: '南充市',
              //     value: 480
              //   }, {
              //     name: '巴中市',
              //     value: 70
              //   }, {
              //     name: '达州市',
              //     value: 420
              //   }
              // ]
              data:data
            }]
          });
        });
      },
      getCharts(beginTime,endTime){
        const vm = this;
        Http.fetch({
          method: "get",
          url: master + "/sichuan_region/department_accepts",
          params: {
             beginTime:beginTime ,
             endTime: endTime
          }
        }).then(
          function (result) {
            if(result.data.head.status==200){
              //  console.log(result.data)
               vm.showChart(result.data.body);
            }else{
              Notification ({
                type:"error",
                title: '四川省行政许可受理情况',
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
  .map-chart {
    width: 100%;
    height: 100%;
    .map-title {
      color: @color-font-light;
      font-size: @size-title-small;
      display: flex;
      flex-direction: row;
      justify-content: center;
      span {
        display: inline-block;
        line-height: 1.38rem;
      }
    }
    .chart {
      color: @color-font-deep;
      font-size: @size-text-large;
      .time-position {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 1.25rem;
        margin-bottom: -1rem;
        .block {z-index: 999;}
      }
      .map-chart-content {
        height: 31.38rem;
        font-size: @size-text-small;
        background: @color-primary;
        color: @white
      }
    }
  }
</style>
