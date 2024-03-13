<template>
  <view class="thread" @tap="handleNavigate">
    <view class="info">
      <view>
        <image :src="member.avatar_large" class="avatar" />
      </view>
      <view class="middle">
        <view :class="usernameCls"> {{member.username}} </view>
        <view class="replies">
          <text class="mr10">{{time}}</text>
          <text>评论 {{replies}}</text>
        </view>
      </view>
      <view class="node">
        <text class="tag">{{node.title}}</text>
      </view>
    </view>
    <text class="title">{{title}}</text>
  </view>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { eventCenter } from '@tarojs/taro'
  import Taro from '@tarojs/taro'
  import { timeagoInst, Thread_DETAIL_NAVIGATE } from '../utils'
  import type { IThreadProps } from '@/interfaces/thread_props'

  import './thread.css'

  const props = withDefaults(defineProps<IThreadProps>(),{
    not_navi:false
  })

  const time = computed(()=>{
    timeagoInst.format(props.last_modified * 1000, 'zh')
  })

  const usernameCls = computed(()=>{

    'author '+ (props.not_navi ? 'bold' : '')
  })

  const handleNavigate = () => {
        if (props.not_navi) {
          return
        }
        eventCenter.trigger(Thread_DETAIL_NAVIGATE, props)
        // 跳转到帖子详情
        Taro.navigateTo({
          url: '/pages/thread_detail/thread_detail',
        })
  }


</script>
