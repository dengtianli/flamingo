<template>
  <div class="total-chart">
    <el-card class="box-card">
      <div class="body">
        <el-tabs v-model="activeName">
          <el-tab-pane label="昨天" name="yesterday">
            <div class="date-container">
              <div class="acceptance">
                <div>受理数(件)</div>
                <div class="num">2099</div>
              </div>
              <div class="transaction">
                 <div>办结数(件)</div>
                 <div class="num">2578</div>
              </div>
              <div class="visitors">
                <div>人流量(人次)</div>
                <div class="num">3441</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="最近一周" name="lastWeek">
            <div class="date-container">
              <div class="acceptance">
                <div>受理数(件)</div>
                <div class="num">2099</div>
              </div>
              <div class="transaction">
                 <div>办结数(件)</div>
                 <div class="num">2578</div>
              </div>
              <div class="visitors">
                <div>人流量(人次)</div>
                <div class="num">3441</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="最近一月" name="lastMonth">
            <div class="date-container">
              <div class="acceptance">
                <div>受理数(件)</div>
                <div class="num">2099</div>
              </div>
              <div class="transaction">
                 <div>办结数(件)</div>
                 <div class="num">2578</div>
              </div>
              <div class="visitors">
                <div>人流量(人次)</div>
                <div class="num">3441</div>
              </div>
            </div>
          </el-tab-pane>
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
        activeName:'yesterday'
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/base.less";
  .total-chart {
    width: 100%;
    height: 100%;
    .date-container {
      display: flex;
      //  margin: 0 1.81rem;
       > div {
        color: @color-font-deep;
        font-size: @size-text-large;
        width: 8rem;
        margin: 2.5rem 1.5rem;
        flex-flow: row nowrap;
        align-content:flex-start;
        justify-content: space-around;
        text-align:center;
        .num {
          margin: 1.25rem 0;
          color: @color-font-light;
          font-size: @size-title-large;
          line-height:1.25rem;
          letter-spacing: 0.5px;
          text-align:center;
        }
        
      }
      .acceptance {
          border-bottom:0.13rem solid #FF5C91;
      }
      .transaction {
          border-bottom:0.13rem solid #FFD652;
      }
      .visitors {
          border-bottom:0.13rem solid #00FFD9 ;
      }
    }
  }
</style>
