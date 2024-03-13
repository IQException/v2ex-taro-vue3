<template>
  <view class="thread-list">
    <loading v-if="loading" />
    <thread
      v-else
      v-for="t in threads"
      :key="t.id"
      :node="t.node"
      :title="t.title"
      :last_modified="t.last_modified"
      :replies="t.replies"
      :tid="t.id"
      :member="t.member"
    />
  </view>
</template>

<script setup lang="ts">
  import type { IThread } from '@/interfaces/thread'
  import Loading from './loading.vue'
  import Thread from './thread.vue'
  import './thread.css'

  export interface IProps{
    threads:IThread[],
    loading:boolean
  }
 const props = defineProps<IProps>()

</script>
