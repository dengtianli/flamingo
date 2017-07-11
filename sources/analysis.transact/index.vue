<template>
  <div class="analysis-transact">
    <div class="left">
      <el-tree :data="departments" :props="defaultProps"  accordion @node-click="handleNodeClick">
      </el-tree>
    </div>
    <div class="right">
      <div class="row block">
        <span class="demonstration">统计时间</span>
        <el-date-picker v-model="year" type="year" format="yyyy年" placeholder="选择年份">
        </el-date-picker>
      </div>
      <div class="row row1">
        <div class="chart1">
          <row1-chart1 :year="yearFormat" :organ="organ"></row1-chart1>
        </div>
        <div class="chart2">
          <row1-chart2 :year="yearFormat" :organ="organ"></row1-chart2>
        </div>
      </div>
      <div class="row row2">
        <div class="chart1">
          <row2-chart1 :year="yearFormat" :organ="organ"></row2-chart1>
        </div>
        <div class="chart2">
          <row2-chart2 :year="yearFormat" :organ="organ"></row2-chart2>
        </div>
      </div>
      <div class="row row3">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>效能分析</span>
          </div>
          <div class="instruments">
            <div class="instrument">
              <row3-chart title="承诺提速" :rate="analysis.promise" flag="row3chart1"></row3-chart>
            </div>
            <div class="instrument">
              <row3-chart title="办理提速" :rate="analysis.management" flag="row3chart2"></row3-chart>
            </div>
            <div class="instrument">
              <row3-chart title="当日受理办结率" :rate="analysis.currentManagent" flag="row3chart3"></row3-chart>
            </div>
            <div class="instrument">
              <row3-chart title="提前办结率" :rate="analysis.advancesManagent" flag="row3chart4"></row3-chart>
            </div>
            <div class="instrument">
              <row3-chart title="按时办结率" :rate="analysis.punctualManagent" flag="row3chart5"></row3-chart>
            </div>
            <div class="instrument">
              <row3-chart title="现场办结率" :rate="analysis.siteManagent" flag="row3chart6"></row3-chart>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  import Http from "../common/http.js";
  // row1
  import Row1Chart1 from "./row1/chart1.vue";
  import Row1Chart2 from "./row1/chart2.vue";
  // row2
  import Row2Chart1 from "./row2/chart1.vue";
  import Row2Chart2 from "./row2/chart2.vue";
  // row3
  import Row3Chart from "./row3/chart.vue";
  import {
    Notification
  } from 'element-ui';
  import Moment from "moment";
  const master = Http.url.master;
  export default {
    components: {
      // row1
      Row1Chart1,
      Row1Chart2,
      // row2
      Row2Chart1,
      Row2Chart2,
      // row3
      Row3Chart,
    },
    data() {
      return {
        yearFormat: "2016",
        year: new Date("2016"),
        organ: 78,
        departments: [{
          id: 1,
          label: '四川省政务大厅',
          children: [{
              id: 4,
              label: '省经济信息化委'
            },
            {
              id: 5,
              label: '民政厅'
            },
            {
              id: 6,
              label: '司法厅'
            },
            {
              label: '人力资源社会保障厅'
            },
            {
              label: '国土资源厅'
            },
            {
              label: '环境保护厅'
            },
            {
              label: '住房城乡建设厅'
            },
            {
              label: '交通运输厅'
            },
            {
              label: '水利厅'
            },
            {
              label: '林业厅'
            },
            {
              label: '商务厅'
            },
            {
              label: '文化厅'
            },
            {
              label: '省卫生计生委'
            },
            {
              label: '四川省地方税务局'
            },
            {
              label: '省工商厅'
            },
            {
              label: '省质监局'
            }
          ]
        }],
        defaultProps: {
          children: 'children',
          id:'TableIdOfGscOrgan',
          label: 'GscOrganName'
        },
        analysis: {
          promise:47,
          management:71.68,
          currentManagent:30.99,
          advancesManagent:98.56,
          punctualManagent:100,
          siteManagent:98
        }
      }
    },
    mounted() {
      const vm = this;
      vm.getdepartmentTree();
      vm.performanceAnalysis(vm._data.yearFormat, vm._data.organ);
    },
    watch: {
      year: function(val, oldVal) {
        console.log(Moment(val).format('YYYY'))
        this.yearFormat = Moment(val).format('YYYY').toString();
        this.performanceAnalysis(this.yearFormat, this.organ);
      },
      organ: function(val, oldVal) {
        this.performanceAnalysis(this.yearFormat, this.organ);
      }
    },
    methods: {
      handleNodeClick(data) {
        const vm = this;
        console.log(data);
        vm.organ =data.TableIdOfGscOrgan;
      },
      getdepartmentTree() {
        const vm = this;
        Http.fetch({
          method: "get",
          url: master + "/analysis/projects/gsc_organs",
        }).then(function(result) {
          if (result.data.head.status == 200) {
             console.log(result.data)
             vm.departments =result.data.body; 
          } else {
            Notification({
              type: "error",
              title: '行政权力部门信息',
              message: result.data.head.message,
            });
          }
        });
      },
      performanceAnalysis(yearFormat, organ) {
        const vm = this;
        Http.fetch({
          method: "get",
          url: master + "/analysis/projects/efficiency_analysis",
          params: {
            year: yearFormat,
            organ: organ
          }
        }).then(function(result) {
          if (result.data.head.status == 200) {
             console.log(result.data)
             vm.analysis.promise =result.data.body[0].promise; 
             vm.analysis.management =result.data.body[0].management; 
             vm.analysis.currentManagent =result.data.body[0].currentManagent; 
             vm.analysis.advancesManagent =result.data.body[0].advancesManagent; 
             vm.analysis.punctualManagent =result.data.body[0].punctualManagent; 
             vm.analysis.siteManagent =result.data.body[0].siteManagent; 
          } else {
            Notification({
              type: "error",
              title: '效能分析',
              message: result.data.head.message,
            });
          }
        });
      },

    }
  }
</script>

<style lang="less" scoped>
  @import "../common/base.less";
  .analysis-transact {
    display: flex;
    flex-direction: row;
    .left {
      width: 15%;
      height:80rem;
      overflow:auto;
      margin-right: 0.5rem;
    }
    .right {
      width: 85%;
      display: flex;
      align-content: flex-start;
      flex-direction: column;
      .block {
        height: 2rem;
        color: @color-font-deep;
        font-size: @size-text-large;
      }
      .row1 {
        width: 100%;
        height: 27.06rem;
        display: flex;
        flex-direction: row;
        .chart1 {
          width: 50%;
          margin-right: 0.63rem;
          >div {
            height: 100%;
          }
        }
        .chart2 {
          width: 50%;
          >div {
            height: 100%;
          }
        }
      }
      .row2 {
        width: 100%;
        height: 27.06rem;
        display: flex;
        flex-direction: row;
        .chart1 {
          width: 50%;
          margin-right: 0.63rem;
          >div {
            height: 100%;
          }
        }
        .chart2 {
          width: 50%;
          >div {
            height: 100%;
          }
        }
      }
      .row3 {
        width: 100%;
        height: 19.5rem;
        .instruments {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .instrument {
            min-width: 10rem;
            height: 13.14rem;
          }
        }
      }
    }
  }
</style>
