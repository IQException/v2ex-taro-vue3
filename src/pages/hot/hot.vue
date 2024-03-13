<template>
  <thread-list :loading="loading" :threads="threads" />
</template>

<script setup lang="ts">
import Taro from "@tarojs/taro";
import { ref, Ref, onMounted } from "vue";
import ThreadList from "@/components/thread_list.vue";
import { IThread } from "@/interfaces/thread";
import api from "@/utils/api";

import "./hot.css";

const loading = ref(true);
const threads: Ref<IThread[]> = ref([]);

onMounted(() => {
  Taro.request<IThread[]>({
    url: api.getHotTopics(),
    success: (res) => {
      threads.value = res.data;
      loading.value = false;
    },
    fail: (err) => {
      console.error(err);
      Taro.showToast({
        title: "载入远程数据错误",
      });
    },
  });
});
</script>

<style scoped></style>
