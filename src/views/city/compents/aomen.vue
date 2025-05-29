<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div v-size-ob="handleResize" id="chartMacao"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";
// @ts-ignore
import macaojson from "@/assets/aomen.json";

// 注册澳门地图数据
echarts.registerMap("澳门", macaojson as any);

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

// 添加 handleResize 函数
const handleResize = () => {
  if (myChart) {
    myChart.resize();
  }
};

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartMacao"));
  myChart.showLoading();

  setTimeout(() => {
    if (myChart) {
      myChart.hideLoading();
      myChart.setOption(option, true)
    }
  }, 1000);

  // 添加鼠标交互事件
  myChart.on("mouseover", function (params) {
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
    if (index >= mapMacaoData.length) {
      index = 0;
    }
  }, 2000);

  myChart.on("mouseout", function (_params) {
    showTip && clearInterval(showTip);
    showTip = setInterval(function () {
      myChart?.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
      index++;
      if (index >= mapMacaoData.length) {
        index = 0;
      }
    }, 2000);
  });
});

var mapMacaoData = [
  {
    name: "全市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [113.549090, 22.198951],
  },
  {
    name: "花地玛堂区",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [113.552284, 22.207882],
  },
  {
    name: "花王堂区",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [113.549052, 22.199175],
  },
  {
    name: "望德堂区",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [113.550252, 22.194054],
  },
  {
    name: "大堂区",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [113.544308, 22.188539],
  },
  {
    name: "风顺堂区",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [113.541928, 22.187778],
  },
  {
    name: "嘉模堂区",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [113.558783, 22.154124],
  },
  {
    name: "路氹城",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [113.569137, 22.136546],
  },
  {
    name: "圣方济各堂区",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [113.559954, 22.123486],
  },
];

let option = {
  backgroundColor: "transparent",
  tooltip: {
    trigger: "item",
    position: function (point: any, _params: any, _dom: any, _rect: any, size: any) {
      var x = 0;
      var y = 0;
      var pointX = point[0];
      var pointY = point[1];
      var boxWidth = size.contentSize[0];
      var boxHeight = size.contentSize[1];

      if (boxWidth > pointX) {
        x = pointX + 10;
      } else {
        x = pointX - boxWidth - 10;
      }

      if (boxHeight > pointY) {
        y = 5;
      } else {
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
      return `
        <div class="ui-map-img">
          <div class='ui-maptxt'>${params.name}</div>
          <div class='ui-mapNum'>标段数:${params.data.tradeBidsectionCount}</div>
          <div class='ui-mapNum'>项目数:${params.data.tradeProjectCount}</div>
        </div>
      `;
    },
  },
  geo: [
    {
      map: "澳门",
      aspectScale: 1,
      zoom: 1.2,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      show: true,
      roam: true,
      scaleLimit: {
        min: 0.8,
        max: 2
      },
      label: {
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          borderColor: "#c0f3fb",
          borderWidth: 1,
          shadowColor: "rgba(58,149,253,0.8)",
          shadowOffsetY: 5,
          shadowBlur: 15,
          areaColor: "transparent",
        },
      },
    },
  ],
  series: [
    {
      name: "澳门数据",
      type: "map",
      map: "澳门",
      aspectScale: 1,
      zoom: 1.2,
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
          show: false,
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
                color: "rgba(3,27,78,0.75)",
              },
              {
                offset: 1,
                color: "rgba(58,149,253,0.75)",
              },
            ],
            global: true,
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
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      markPoint: {
        symbol: "none",
      },
      data: mapMacaoData,
      roam: true,
      scaleLimit: {
        min: 0.8,
        max: 2
      },
    },
  ],
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

#chartMacao {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 