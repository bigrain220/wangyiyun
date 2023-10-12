<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" v-bind="attrObj"/>
  </div>
</template>

<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import {reactive } from 'vue'
const attrObj =reactive({
  attr1:'1',
  attr2:'2'
})
</script>
