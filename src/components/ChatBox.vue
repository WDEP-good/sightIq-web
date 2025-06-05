<template>
  <BubbleList :list="list" max-height="100%" />
  <Welcome
    icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
    title="欢迎使用查询旅游路线规划"
    extra="旅游路线规划系统"
    description="本系统提供了旅游路线规划、景点查询等功能，旨在帮助用户更好地规划旅行行程。"
  />
  <Sender
    ref="senderRef"
    v-model="senderValue"
    :submit-btn-disabled="submitBtnDisabled"
    :loading="senderLoading"
    clearable
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template>

<script setup lang="ts">
import { Welcome, Sender, BubbleList } from "vue-element-plus-x";
import type {
  BubbleListItemProps,
  BubbleListProps,
} from "vue-element-plus-x/types/BubbleList";
import { ref } from "vue";
import { ElMessage } from "element-plus";
const senderRef = ref();
const timeValue = ref<NodeJS.Timeout | null>(null);
const senderValue = ref("");
const senderLoading = ref(false);

const submitBtnDisabled = ref(true);
function handleSubmit(value: string) {
  ElMessage.info(`发送中`);
  senderLoading.value = true;
  timeValue.value = setTimeout(() => {
    // 可以在控制台 查看打印结果
    console.log("submit-> value：", value);
    console.log("submit-> senderValue", senderValue.value);
    senderLoading.value = false;
    ElMessage.success(`发送成功`);
  }, 3500);
}

function handleCancel() {
  senderLoading.value = false;
  if (timeValue.value) clearTimeout(timeValue.value);
  timeValue.value = null;
  ElMessage.info(`取消发送`);
}

type listType = BubbleListItemProps & {
  key: number;
  role: "user" | "ai";
};

// 示例调用
const list: BubbleListProps<listType>["list"] = generateFakeItems(5);

function generateFakeItems(count: number): listType[] {
  const messages: listType[] = [];
  for (let i = 0; i < count; i++) {
    const role = i % 2 === 0 ? "ai" : "user";
    const placement = role === "ai" ? "start" : "end";
    const key = i + 1;
    const content =
      role === "ai"
        ? "💖 感谢使用 Element Plus X ! 你的支持，是我们开源的最强动力 ~".repeat(
            5
          )
        : `哈哈哈，让我试试`;
    const loading = false;
    const shape = "corner";
    const variant = role === "ai" ? "filled" : "outlined";
    const isMarkdown = false;
    const typing = role === "ai" ? i === count - 1 : false;
    const avatar =
      role === "ai"
        ? "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        : "https://avatars.githubusercontent.com/u/76239030?v=4";

    messages.push({
      key, // 唯一标识
      role, // user | ai 自行更据模型定义
      placement, // start | end 气泡位置
      content, // 消息内容 流式接受的时候，只需要改这个值即可
      loading, // 当前气泡的加载状态
      shape, // 气泡的形状
      variant, // 气泡的样式
      isMarkdown, // 是否渲染为 markdown
      typing, // 是否开启打字器效果 该属性不会和流式接受冲突
      isFog: role === "ai", // 是否开启打字雾化效果，该效果 v1.1.6 新增，且在 typing 为 true 时生效，该效果会覆盖 typing 的 suffix 属性
      avatar,
      avatarSize: "24px", // 头像占位大小
      avatarGap: "12px", // 头像与气泡之间的距离
    });
  }
  return messages;
}
</script>

<style scoped lang="less"></style>
