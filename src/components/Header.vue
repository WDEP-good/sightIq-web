<template>
  <div class="header-container">
    <el-row justify="space-around" align="middle">
      <el-col :span="4.5" class="text-center" @click="goto('lvyu')">
        <div class="demo">
          <img
            src="/logo.svg"
            alt=""
            width="30"
            height="30"
          />SightIQ
        </div>
      </el-col>
      <el-col :span="4.5" @click="goto('analysis')" class="text-center">
        <span class="nav-text">路线规划</span>
      </el-col>
      <el-col :span="4.5" @click="goto('forecast')" class="text-center">
        <span class="nav-text">预测预警</span>
      </el-col>
      <el-col :span="4.5" @click="goto('report')" class="text-center">
        <span class="nav-text">统计报表</span>
      </el-col>
      <el-col :span="4.5" class="text-center">
        {{ dayt.timeMonth }} {{ dayt.timemiao }}
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
// import { ElMessage } from "element-plus";
import { reactive } from "vue";
import { daytime } from "@/utils/time";
import router from "@/router/index";
// const dayarr = ["日", "一", "二", "三", "四", "五", "六"];
let dayt = reactive({
  timemiao: "",
  timeMonth: "",
  timexinqi: "",
});
const goto = (gowhere: string) => {
  if (gowhere == "lvyu") router.push("/home");
  if (gowhere == "analysis") router.push("/analysis");
  if (gowhere == "forecast") router.push("/forecast");
  if (gowhere == "report") router.push("/report");
  if (gowhere == "search") router.push("/");
};

// const guanli = () => {
//   ElMessage({
//     message: "账号管理",
//     type: "success",
//   });
// };
// const exit_login = () => {
//   ElMessage({
//     message: "退出登录成功！请重新登录",
//     type: "success",
//   });
// };
const headerTime = () => {
  dayt.timemiao = daytime(Date.now()).timemiao;
  dayt.timeMonth = daytime(Date.now()).timeMonth;
  dayt.timexinqi = daytime(Date.now()).timexinqi;
};
// const timeformat = () => {
//   var num = ~~dayt.timexinqi;
//   return `${dayt.timeMonth}  |  星期${dayarr[num]}`;
// };

setInterval(() => {
  headerTime();
}, 1000);
</script>

<style scoped lang="less">
.header-container {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 15px 0;
}

.demo {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: scale(1.02);
  }

  .demotext {
    margin-left: 10px;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.homeBg-img {
  display: flex;
  align-items: center;
  object-fit: contain;
}

.demo2 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  .demo2text {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
}

.demo3 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  padding: 0 20px;

  .demo3text {
    color: #fff;
    font-size: 16px;
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.text-center {
  display: flex;
  text-align: center;
  color: #fff;
}

.nav-text {
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
}
</style>
