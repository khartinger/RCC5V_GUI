<!-- RccDemo1.vue ---------------------------khartinger----- -->
<!-- 2026-01-01: new                                         -->

<script setup lang="ts">
import RccTrack1 from './RccTrack1.vue'

// const props = defineProps<{
defineProps<{
  dx: number;
  dy: number;
}>()

// import { computed, ref, watch, watchEffect } from 'vue';
// import RccTrack1 from './RccTrack1.vue'

// const myref = ref('444')
// const myrefO = ref({ x: 1 })
// myrefO.value = { x: 2 }

// // myref.value = 'dsfsdf'

// const props = withDefaults(defineProps<{
//   dx?: number;
//   dy: number;
// }>(), {
//   dx: 1,
// })

// const b = props.dx;

// const comp = computed(() => { return 1 })

// watchEffect(() => {
//   console.log(myref.value)
// })

</script>

<template>
  <g>
  <RccTrack1 :x="0 * dx" :y="12 * dy" sid="tk0" dir="52" :border="1"></RccTrack1>
  <RccTrack1 :x="0 * dx" :y="12 * dy" sid="tk0" dir="12" :border="1"></RccTrack1>
  <RccTrack1 :x="1 * dx" :y="11 * dy" sid="tk1" dir="16" :border="1" :xAxis="true"></RccTrack1>
  <RccTrack1 :x="2 * dx" :y="11 * dy" sid="tk1" dir="15" :border="1" :xAxis="true"></RccTrack1>
  <RccTrack1 :x="3 * dx" :y="11 * dy" sid="tk0" dir="18" :border="0"></RccTrack1>
  <RccTrack1 :x="3 * dx" :y="11 * dy" sid="tk1" dir="58" :border="1" :xAxis="true"></RccTrack1>
  <RccTrack1 :x="4 * dx" :y="12 * dy" sid="tk0" dir="14" :border="1"></RccTrack1>
  </g>
</template>
