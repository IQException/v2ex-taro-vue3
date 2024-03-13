<template>
      <view class='loading'>
        <image :src="url" class='img' />
      </view>
</template>

<script setup lang="ts">
import url from '../resource/spiner.gif'
import './loading.css'
</script>


