<template>
  <div class="hot-chart">
    <el-card class="box-card">
      <div class="body">
        <el-tabs v-model="activeName">
          <el-tab-pane label="热点办理事项" name="management">
            <div class=" chart">
              <div class="time-position">
                <div class="block">
                  <span class="demonstration">统计时间</span>
                  <el-date-picker v-model="value" type="month" format="yyyy 年 MM 月"  placeholder="选择月份">
                  </el-date-picker>
                </div>
              </div>
              <div class="management-chart-content"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="热点关注事项" name="attention">热点关注事项</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script>
  import Http from "../../common/http.js";
  import {
    chart
  } from "../../common/helper.js";
  export default {
    data() {
      return {
        activeName: 'management',
        value: ''
      }
    },
    mounted() {
      chart(".management-chart-content", {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          position: 'top',
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            textStyle: {
              color: '#52547D',
              fontSize: 12
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#52547D',
              fontSize: 12
            }
          },
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#52547D',
              fontSize: 12
            }
          },
          data: ['移动是压力容器 气瓶充装许可', '固定资产投资项目（新建、扩建）节能评估和审查', '特种设备生产许可', '工业产品生产许可证核发（总局发证）', '放射性同为素转让审批', '分公司变更登记', '营业性涉外和涉港澳台演出审批', '公路、水运建设安全生产管理人员资格认定']
        },
        series: [{
          name: '事项件数',
          type: 'bar',
          barWidth: '50%',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 1,
                  color: '#FFD652'
                }, {
                  offset: 0,
                  color: '#292742'
                }]
              }
            }
          },
          data: [240, 140, 80, 140, 180, 220, 125, 205]
        }]
      });
    }
  };
</script>
<style lang="less" scoped>
  @import "../../common/base.less";
  .hot-chart {
    width: 100%;
    height: 100%;
    .chart {
      color: @color-font-deep;
      font-size: @size-text-large;
      .time-position {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
      .management-chart-content {
        height: 42rem;
        font-size: @size-text-small;
      }
    }
  }
</style>