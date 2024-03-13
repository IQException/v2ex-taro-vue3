<template>
  <thread-list :loading="loading" :threads="threads" />
</template>

<script setup lang="ts">
import Taro from "@tarojs/taro";
import { ref, Ref, onMounted } from "vue";
import ThreadList from "@/components/thread_list.vue";
import { IThread } from "@/interfaces/thread";
import api from "@/utils/api";
import { failCallback } from "@/utils";

const loading = ref(true);
const threads: Ref<IThread[]> = ref([]);

//Taro.getCurrentInstance().router.params
onMounted(() => {
  const params = Taro.getCurrentInstance().router!.params;
  Taro.setNavigationBarTitle({
    title: decodeURIComponent(params["title"]!),
  });
  Taro.request<IThread[]>({
    url: api.getTopics({
      node_id: params["id"],
    }),
    success: (res) => {
      loading.value = false;
      threads.value = res.data;
    },
    fail: failCallback,
  });
});
</script>

<style scoped></style>
