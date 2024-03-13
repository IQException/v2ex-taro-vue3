<template>
  <view class="detail">
    <thread
      :node="topic.node"
      :title="topic.title"
      :last_modified="topic.last_modified"
      :replies="topic.replies"
      :tid="topic.tid"
      :member="topic.member"
      :not_navi="true"
    />
    <loading v-if="loading" />
    <view v-else>
      <view class="main-content">
        <rich-text :nodes="content" />
      </view>
      <view class="replies">
        <view v-for="(reply, index) in replies" class="reply" :key="reply.id">
          <image :src="reply.member.avatar_large" class="avatar" />
          <view class="main">
            <view class="author"> {{ reply.member.username }} </view>
            <view class="time"> {{ time(reply.last_modified) }} </view>
            <rich-text :nodes="html(reply.content_rendered)" class="content" />
            <view class="floor"> {{ index + 1 }} 楼 </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import Taro from "@tarojs/taro";
import api from "../../utils/api";
import Loading from "@/components/loading.vue";
import Thread from "@/components/thread.vue";
import type { IThread } from "@/interfaces/thread";

import { timeagoInst, GlobalState, prettyHTML } from "../../utils/index";
import "./index.css";

const topic = GlobalState.thread;
const loading = ref(true);
const replies: Ref<IThread[]> = ref([]);
const content = ref("");

const time = (val: number): string => timeagoInst.format(val * 1000);
const html = (val: string): string => prettyHTML(val);

onMounted(() => {
  const id = GlobalState.thread.tid;
  let succeed = true;
  let tempReplies: IThread[] = [];
  let tempContent = "";

  const p1 = Taro.request<IThread[]>({
    url: api.getReplies({
      topic_id: id,
    }),
    success: (res) => {
      tempReplies = res.data;
    },
    fail: (err) => {
      console.error(err);
      succeed = false;
    },
  });
  const p2 = Taro.request<IThread[]>({
    url: api.getTopics({
      id: id,
    }),
    success: (res) => {
      tempContent = res.data[0].content_rendered;
    },
    fail: (err) => {
      console.error(err);
      succeed = false;
    },
  });
  Promise.all([p1, p2]).then(() => {
    if (!succeed) {
      Taro.showToast({
        title: "载入远程数据错误",
      });
    } else {
      loading.value = false;
      replies.value = tempReplies;
      content.value = html(tempContent);
    }
  });
});
</script>
