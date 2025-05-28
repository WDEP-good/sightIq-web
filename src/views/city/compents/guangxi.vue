<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chart_guangxi"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import guangxijson from "@/assets/450000.json";
var index = 0; //播放所在下标

let myChart: echarts.ECharts | null = null;

var mapGuangxiData = [
  {
    name: "全省",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [108.320004, 22.82402],
  },
  {
    name: "南宁市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [108.320004, 22.82402],
  },
  {
    name: "柳州市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [109.411703, 24.314617],
  },
  {
    name: "桂林市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [110.299121, 25.274215],
  },
  {
    name: "梧州市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [111.297604, 23.474803],
  },
  {
    name: "北海市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [109.119254, 21.473343],
  },
  {
    name: "防城港市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [108.345478, 21.614631],
  },
  {
    name: "钦州市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [108.624175, 21.967127],
  },
  {
    name: "贵港市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [109.602146, 23.0936],
  },
  {
    name: "玉林市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [110.154393, 22.63136],
  },
  {
    name: "百色市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [106.616285, 23.897742],
  },
  {
    name: "贺州市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [111.552056, 24.414141],
  },
  {
    name: "河池市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [108.062105, 24.695899],
  },
  {
    name: "来宾市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [109.229772, 23.733766],
  },
  {
    name: "崇左市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [107.353926, 22.404108],
  },
];

// 在组件初始化时就注册地图数据
echarts.registerMap("广西", guangxijson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chart_guangxi"));
  myChart.showLoading();

  setTimeout(() => {
    if (myChart) {
      myChart.hideLoading();
      myChart.setOption(option, true);
      
      window.addEventListener("resize", handleResize);
    }
  }, 1000);

  myChart.on("mouseover", function (params) {
    console.log(params);
    clearInterval(showTip);
    myChart?.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: params.dataIndex,
    });
  });
  var showTip = setInterval(function () {
    myChart?.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: index,
    });
    index++;
    if (index >= 14) {
      index = 0;
    }
  }, 2000);
  myChart.on("mouseout", function (_params: any) {
    showTip && clearInterval(showTip);
    showTip = setInterval(function () {
      myChart?.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
      index++;
      if (index >= 14) {
        index = 0;
      }
    }, 2000);
  });
});

const handleResize = () => {
  if (myChart) {
    myChart.resize();
  }
};

onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
  window.removeEventListener("resize", handleResize);
});

let option = {
  tooltip: {
    trigger: "item",
    position: function (
      point: any,
      _params: any,
      _dom: any,
      _rect: any,
      size: any
    ) {
      var x = 0; // x坐标位置
      var y = 0; // y坐标位置
      // 当前鼠标位置
      var pointX = point[0];
      var pointY = point[1];
      // 提示框大小
      var boxWidth = size.contentSize[0];
      var boxHeight = size.contentSize[1];

      // boxWidth > pointX 说明鼠标左边放不下提示框
      if (boxWidth > pointX) {
        x = pointX + 10;
      } else {
        // 左边放的下
        x = pointX - boxWidth - 10;
      }

      // boxHeight > pointY 说明鼠标上边放不下提示框
      if (boxHeight > pointY) {
        y = 5;
      } else {
        // 上边放得下
        y = pointY - boxHeight;
      }
      return [x, y];
    },
    show: true,
    enterable: true,
    textStyle: {
      fontSize: 13,
      color: "#fff",
    },
    backgroundColor: "rgba(0,2,89,0.8)",
    formatter: function (params: any) {
      // console.log(params)
      var tipHtml = "";
      tipHtml = `
                    <div class="ui-map-img">
                        <div class='ui-maptxt'>${params.name}</div>
                        <div class='ui-mapNum'>标段数:${params.data.tradeBidsectionCount}</div>
                        <div class='ui-mapNum'>项目数:${params.data.tradeProjectCount}</div>
                    </div>
                `;
      return tipHtml;
    },
  },
  geo: [
    {
      map: "广西",
      aspectScale: 0.75,
      zoom: 1.0,
      layoutCenter: ["50%", "50%"],
      layoutSize: "95%",
      show: true,
      roam: false,
      label: {
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          borderColor: "#c0f3fb",
          borderWidth: 1,
          shadowColor: "#8cd3ef",
          shadowOffsetY: 10,
          shadowBlur: 120,
          areaColor: "transparent",
        },
      },
    }
  ],
  series: [
    {
      name: "广西市数据",
      type: "map",
      map: "广西",
      aspectScale: 0.75,
      zoom: 1.0,
      layoutCenter: ["50%", "50%"],
      layoutSize: "95%",
      showLegendSymbol: true,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: "120%",
          },
        },
        emphasis: {
          // show: false,
        },
      },
      itemStyle: {
        normal: {
          areaColor: {
            type: "linear",
            x: 1200,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "rgba(3,27,78,0.75)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(58,149,253,0.75)", // 50% 处的颜色
              },
            ],
            global: true, // 缺省为 false
          },
          borderColor: "#fff",
          borderWidth: 0.2,
        },
        emphasis: {
          show: false,
          color: "#fff",
          areaColor: "rgba(0,254,233,0.6)",
        },
      },
      markPoint: {
        symbol: "none",
      },
      data: mapGuangxiData,
    }
  ]
};
</script>

<style scoped lang="less">
.map-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-row {
  flex: 1;
  position: relative;
  min-height: 0;
  height: 100vh;
}

#chart_guangxi {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
