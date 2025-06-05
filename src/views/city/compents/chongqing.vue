<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartChongQing"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import chongqingjson from "@/assets/chongqing.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

echarts.registerMap("重庆", chongqingjson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartChongQing"));
  myChart.showLoading();

  setTimeout(() => {
    if (myChart) {
      myChart.hideLoading();
      myChart.setOption(option, true);

      window.addEventListener("resize", handleResize);
    }
  }, 1000);

  // 鼠标交互事件
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
    if (index >= 38) {
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
      if (index >= 38) {
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

var mapChongQingData = [
  {
    name: "重庆市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [106.504962, 29.533155],
  },
  {
    name: "万州区",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [108.380246, 30.807807],
  },
  {
    name: "涪陵区",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [107.394905, 29.703652],
  },
  {
    name: "渝中区",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [106.571301, 29.55186],
  },
  {
    name: "大渡口区",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [106.482347, 29.484527],
  },
  {
    name: "江北区",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [106.574271, 29.606703],
  },
  {
    name: "沙坪坝区",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [106.456878, 29.541145],
  },
  {
    name: "九龙坡区",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [106.510676, 29.502272],
  },
  {
    name: "南岸区",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [106.644447, 29.500292],
  },
  {
    name: "北碚区",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [106.395612, 29.805108],
  },
  {
    name: "綦江区",
    tradeBidsectionCount: 45,
    tradeProjectCount: 90,
    coordinate: [106.651417, 29.028091],
  },
  {
    name: "大足区",
    tradeBidsectionCount: 40,
    tradeProjectCount: 80,
    coordinate: [105.721733, 29.707032],
  },
  {
    name: "渝北区",
    tradeBidsectionCount: 95,
    tradeProjectCount: 190,
    coordinate: [106.631187, 29.718143],
  },
  {
    name: "巴南区",
    tradeBidsectionCount: 35,
    tradeProjectCount: 70,
    coordinate: [106.540257, 29.402408],
  },
  {
    name: "黔江区",
    tradeBidsectionCount: 30,
    tradeProjectCount: 60,
    coordinate: [108.770654, 29.533557],
  },
  {
    name: "长寿区",
    tradeBidsectionCount: 25,
    tradeProjectCount: 50,
    coordinate: [107.080735, 29.857996],
  },
  {
    name: "江津区",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [106.259281, 29.290069],
  },
  {
    name: "合川区",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [106.276036, 29.972084],
  },
  {
    name: "永川区",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [105.927094, 29.356104],
  },
  {
    name: "南川区",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [107.099266, 29.157891],
  },
  {
    name: "璧山区",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [106.227305, 29.592024],
  },
  {
    name: "铜梁区",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [106.056404, 29.844811],
  },
  {
    name: "潼南区",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [105.840556, 30.191013],
  },
  {
    name: "荣昌区",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [105.594623, 29.405002],
  },
  {
    name: "开州区",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [108.393135, 31.160711],
  },
  {
    name: "梁平区",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [107.769568, 30.654233],
  },
  {
    name: "武隆区",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [107.760025, 29.325601],
  },
  {
    name: "城口县",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [108.664902, 31.946293],
  },
  {
    name: "丰都县",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [107.73248, 29.866424],
  },
  {
    name: "垫江县",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [107.348694, 30.330011],
  },
  {
    name: "忠县",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [108.039002, 30.299559],
  },
  {
    name: "云阳县",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [108.697324, 30.930612],
  },
  {
    name: "奉节县",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [109.463987, 31.018498],
  },
  {
    name: "巫山县",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [109.879153, 31.074834],
  },
  {
    name: "巫溪县",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [109.570062, 31.398604],
  },
  {
    name: "石柱土家族自治县",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [108.114069, 29.99853],
  },
  {
    name: "秀山土家族苗族自治县",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [109.007094, 28.447997],
  },
  {
    name: "酉阳土家族苗族自治县",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [108.767747, 28.841244],
  },
  {
    name: "彭水苗族土家族自治县",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [108.166551, 29.293856],
  },
];

let option = {
  backgroundColor: "transparent",
  tooltip: {
    trigger: "item",
    position: function (
      point: any,
      _params: any,
      _dom: any,
      _rect: any,
      size: any
    ) {
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
      var tipHtml = `
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
      map: "重庆",
      aspectScale: 0.75,
      zoom: 1.1,
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
      name: "重庆数据",
      type: "map",
      map: "重庆",
      aspectScale: 0.75,
      zoom: 1.1,
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
      layoutSize: "95%",
      markPoint: {
        symbol: "none",
      },
      data: mapChongQingData,
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

#chartChongQing {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
