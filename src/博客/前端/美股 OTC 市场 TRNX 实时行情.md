---
title: 美股OTC市场TRNX实时行情
category: 前端
tags:
  - JavaScript
cover: https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-1.2.1&auto=format&fit=crop&w=1383&q=80
---

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>争逐</title>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css" />
  <!-- 引入组件库 -->
  <script src="https://unpkg.com/element-ui/lib/index.js"></script>

</head>

<body>
  <div id="app">
    <div class="info">
      <div class="sc-htpNat jtWIOA sc-bdVaJa iHZvIS" class="sc-bdVaJa iHZvIS" v-for="(item, index) in info">
        <div class="_33MgosRhnB sc-htpNat pyeRb sc-bdVaJa bVTGsP">
          <h2>{{item.symbol}}</h2>
          <p class="_1rzoYNl62n">Taronis Technologies, Inc.</p>
          <div class="_3vXIKHhi6E" style="max-width: 24em;">Common Stock</div>
        </div>
        <div class="_3zTIWDO-Xv sc-htpNat pyeRb sc-bdVaJa bVTGsP">
          <div class="_2XxiZo8FrF _3M34ma34zV sc-htpNat dXhXYE sc-bdVaJa iHZvIS">
            <h2>{{item.lastSale}}</h2>
            <div class="_2GSkTrHRjv sc-htpNat pyeRb sc-bdVaJa iHZvIS" :class="{green:item.change>0,red:item.change<0}">
              <p>{{item.change}}</p>
              <p>{{item.percentChange}}%</p>
            </div>
          </div>
          <p class="_2VWvG6yWU0"><strong>{{item.bidPrice}} / {{item.askPrice}}</strong> <span>({{item.bidSize}} x
              {{item.askSize}})</span></p>
          <div class="_3vXIKHhi6E">
            <div>实时最佳买入价和卖出价: {{ item.insideTime|formatDate}}</div>
            <div>延迟（15 分钟）交易数据: {{item.lastTradeTime|formatDate}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <el-row type="flex" justify="center">
        <el-col :span="10" style=" margin:10px">
          <el-table border :data="montageBuyList" :default-sort="{prop: 'transTimeDisplay', order: 'descending'}">
            <el-table-column prop="mmId" label="市场参与者识别码" align="center"></el-table-column>
            <el-table-column prop="priceDisplay" label="买入" align="center"></el-table-column>
            <el-table-column prop="sizeDisplay" label="数量" align="center"> </el-table-column>
            <el-table-column prop="transTimeDisplay" label="时间" align="center" sortable> </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="10" style=" margin:10px">
          <el-table border :data=" montageSellList" :default-sort="{prop: 'transTimeDisplay', order: 'descending'}">
            <el-table-column prop="mmId" label="市场参与者识别码" align="center"></el-table-column>
            <el-table-column prop="priceDisplay" label="卖出" align="center"></el-table-column>
            <el-table-column prop="sizeDisplay" label="数量" align="center"> </el-table-column>
            <el-table-column prop="transTimeDisplay" label="时间" align="center" sortable> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

    <div id="container"></div>
  </div>

</body>
<script>
  new Vue({
    el: "#app",
    data() {
      return {
        info: [],
        montageBuyList: [],
        montageSellList: [],
        message: "Hello Vue!",
      };
    },
    created() {
      this.getInfo();
      this.gitData();
    },
    mounted() {
      setInterval(() => {
        this.getInfo();
        this.gitData();
      }, 5000);
    },
    filters: {
      formatDate(time) {
        var date = new Date(time - 4 * 3600 * 1000);
        return date.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, ".");
      },
    },
    methods: {
      getInfo() {
        var that = this;
        axios
          .get(
            "https://backend.otcmarkets.com/otcapi/stock/trade/inside/TRNX?symbol=TRNX"
          )
          .then(function (response) {
            that.info.splice(0, 1, response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      gitData() {
        axios
          .get(
            "https://backend.otcmarkets.com/otcapi/stock/level2/TRNX?symbol=TRNX"
          )
          .then(
            (response) => (
              (this.montageBuyList = response.data.montageBuyList),
              (this.montageSellList = response.data.montageSellList)
            )
          )
          .catch(function (error) {
            console.log(error);
          });
      },
      // gitData() {
      //   var that = this;
      //   axios
      //     .get(
      //       "https://backend.otcmarkets.com/otcapi/stock/level2/TRNX?symbol=TRNX"
      //     )
      //     .then(function (response) {
      //       that.montageBuyList = response.data.montageBuyList;
      //       that.montageSellList = response.data.montageSellList;
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      // },
    },
  });

</script>
<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #app {
    width: 100%;
    height: 100%;
  }

  html {
    color: white;
    background: url("https://wallbox.ru/wallpapers/main/201135/mir-karta-setka-5a6f923.jpg");
    background-repeat: repeat-x;
    background-size: cover;
    animation: run 40s linear infinite;
  }

  @keyframes run {
    from {
      background-position: -1920px 0;
    }

    to {
      background-position: 0 0;
    }
  }

  .red p {
    color: red;
  }

  .green p {
    color: green;
  }

  .card {
    margin-top: 20px;
  }

  .info {
    width: 848px;
    margin: 0 auto;
  }

  ._2ZkDSEkg6c * {
    font-family: inherit;
    line-height: 1.5em;
  }

  ._2ZkDSEkg6c h2 {
    font-size: 2.25em;
  }

  ._2XxiZo8FrF svg {
    font-size: 2.25em;

    height: 0.8em;
    width: 0.75em;
    margin-right: -0.2em;
  }

  .iHZvIS {
    box-sizing: border-box;
  }

  .jtWIOA {
    display: flex;
    flex-wrap: wrap;
  }

  .bVTGsP {
    box-sizing: border-box;
    width: 50%;
  }

  ._2ZkDSEkg6c h2 {
    font-size: 2.25em;
  }

  ._1rzoYNl62n {
    font-size: 1.3em;
    position: relative;
  }

  .pyeRb {
    display: inline;
    flex-direction: column;
  }

  ._2VWvG6yWU0 {
    font-size: 0.9em;
    line-height: 1.8em;
    padding: 0.2em;
  }

  .dXhXYE {
    justify-content: flex-end;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  ._3M34ma34zV p,
  ._3M34ma34zV svg {
    display: inline;
  }

  ._3zTIWDO-Xv {
    text-align: right;
  }

  ._3zTIWDO-Xv h2,
  ._18j_zIXZbQ p,
  ._33MgosRhnB h2 {
    margin: 0;
    display: inline;
  }

  ._3vXIKHhi6E {
    font-size: 0.75em;
    color: #1aff0b;
    display: inline-block;
    font-weight: 300;
    position: relative;
    line-height: 1.2em;
  }

  /* 替换element */
  .el-table,
  .el-table__expanded-cell {
    background-color: rgba(0, 0, 0, 0);
  }

  .el-table th,
  .el-table tr {
    background-color: rgba(0, 0, 0, 0);
  }

  .el-table thead {
    color: white;
  }

  .el-table {
    position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    color: white;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>

</html>
```
