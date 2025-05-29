<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartGuangDong"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import guangdongjson from "@/assets/guangdong.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

echarts.registerMap("广东", guangdongjson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartGuangDong"));
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
    if (index >= 21) {
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
      if (index >= 21) {
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

var mapGuangDongData = [
  {
    name: "广州市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [113.280637, 23.125178],
  },
  {
    name: "韶关市",
    tradeBidsectionCount: 95,
    tradeProjectCount: 190,
    coordinate: [113.591544, 24.801322],
  },
  {
    name: "深圳市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [114.085947, 22.547],
  },
  {
    name: "珠海市",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [113.552724, 22.255899],
  },
  {
    name: "汕头市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [116.708463, 23.37102],
  },
  {
    name: "佛山市",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [113.122717, 23.028762],
  },
  {
    name: "江门市",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [113.094942, 22.590431],
  },
  {
    name: "湛江市",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [110.364977, 21.274898],
  },
  {
    name: "茂名市",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [110.919229, 21.659751],
  },
  {
    name: "肇庆市",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [112.472529, 23.051546],
  },
  {
    name: "惠州市",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [114.412599, 23.079404],
  },
  {
    name: "梅州市",
    tradeBidsectionCount: 45,
    tradeProjectCount: 90,
    coordinate: [116.117582, 24.299112],
  },
  {
    name: "汕尾市",
    tradeBidsectionCount: 40,
    tradeProjectCount: 80,
    coordinate: [115.364238, 22.774485],
  },
  {
    name: "河源市",
    tradeBidsectionCount: 35,
    tradeProjectCount: 70,
    coordinate: [114.697802, 23.746266],
  },
  {
    name: "阳江市",
    tradeBidsectionCount: 30,
    tradeProjectCount: 60,
    coordinate: [111.975107, 21.859222],
  },
  {
    name: "清远市",
    tradeBidsectionCount: 25,
    tradeProjectCount: 50,
    coordinate: [113.051227, 23.685022],
  },
  {
    name: "东莞市",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [113.746262, 23.046237],
  },
  {
    name: "中山市",
    tradeBidsectionCount: 15,
    tradeProjectCount: 30,
    coordinate: [113.382391, 22.521113],
  },
  {
    name: "潮州市",
    tradeBidsectionCount: 10,
    tradeProjectCount: 20,
    coordinate: [116.632301, 23.661701],
  },
  {
    name: "揭阳市",
    tradeBidsectionCount: 5,
    tradeProjectCount: 10,
    coordinate: [116.355733, 23.543778],
  },
  {
    name: "云浮市",
    tradeBidsectionCount: 1,
    tradeProjectCount: 2,
    coordinate: [112.044439, 22.929801],
  }
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
      map: "广东",
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
      name: "广东数据",
      type: "map",
      map: "广东",
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
      data: mapGuangDongData,
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

#chartGuangDong {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 