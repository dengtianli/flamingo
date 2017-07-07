<template>
  <div class="">
    <el-card class="box-card">
      <div class="test">
        <h4>四川省行政许可办件人来源分析</h4>
      </div>
    </el-card>
  </div>
</template>

<script>
import Http from "../../common/http.js";
import { chart } from "../../common/helper.js";
export default {
  mounted() {
    // chart(".test", {
    // });
  }
};
</script>

<style lang="less" scoped>
h4 {
  text-align: center;
}
</style>
