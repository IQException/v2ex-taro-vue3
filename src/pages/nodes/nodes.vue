<template>
  <view class="node-container">
    <view v-for="item in allNodes" :key="item.title" class="container">
      <view class="title">
        <text style="margin-left: 5px">{{ item.title }}</text>
      </view>
      <view class="nodes">
        <navigator
          v-for="node in item.nodes"
          :key="node.id"
          class="tag"
          :url="getURL(node)"
        >
          <text>{{ node.title }}</text>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import _ from "lodash";
import Taro from "@tarojs/taro";
import { failCallback } from "@/utils";
import { ref, onMounted, Ref } from "vue";
import api from "../../utils/api";
import type { INode } from "@/interfaces/node";
import "./nodes.css";

const getURL = function (node: INode): string {
  return (
    "/pages/node_detail/node_detail" +
    api.queryString({
      title: node.title,
      id: node.id,
    })
  );
};
const nullOrEmpty = function (str: string | null): boolean {
  return str === null || _.isEmpty(str);
};
const allNodes: Ref<INode[]> = ref([]);

onMounted(() => {
  Taro.request<INode[]>({
    url: api.getAllNode(),
    success: (res) => {

      let nodeMap = _.groupBy(res.data, (e) =>
        nullOrEmpty(e.parent_node_name) ? "others" : e.parent_node_name
      );
      let nodeClass: INode[] = [];

      Object.keys(nodeMap).forEach((k) => {
        nodeClass.push({
          name: k,
          title: k,
          nodes: nodeMap[k],
        } as INode);
      });

      allNodes.value = nodeClass;
    },
    fail: failCallback,
  });
});
</script>
