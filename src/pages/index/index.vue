<template>
  <view class="index">
    <thread-list :threads="threads" :loading="loading" />
  </view>
</template>

<script setup lang="ts">
import Taro from "@tarojs/taro";
import { ref, onMounted, Ref } from "vue";
import ThreadList from "@/components/thread_list.vue";
import api from "../../utils/api";
import { failCallback } from "../../utils";
import { IThread } from "@/interfaces/thread";
import "./index.scss";

const loading: Ref<boolean> = ref(true);
const threads: Ref<IThread[]> = ref([]);

onMounted(() => {
  Taro.request<IThread[]>({
    url: api.getLatestTopic(),
    success: (res) => {
      threads.value = res.data;
      loading.value = false;
    },
    fail: failCallback,
  });
});
</script>
