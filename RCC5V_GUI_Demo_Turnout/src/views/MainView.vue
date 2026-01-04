<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2025-12-27: New                                         -->
<template>
  <svg width="100%" viewBox="-45 -46 650 100">
    <rect class="ciBackground" x="-45" y="-46" width="650" height="100" />
    <RccTurnout1 :x="0*dx"  :y="0*dy" sid="to1" type="1L" :border="1"></RccTurnout1>
    <RccTurnout1 :x="1*dx"  :y="0*dy" sid="to1" type="1R" :border="1"></RccTurnout1>
    <RccTurnout1 :x="2*dx"  :y="0*dy" sid="to1" type="2R" :border="1"></RccTurnout1>
    <RccTurnout1 :x="3*dx"  :y="0*dy" sid="to1" type="8L" :border="1"></RccTurnout1>
    <RccTurnout1 :x="4*dx"  :y="0*dy" sid="to1" type="5R" :border="1"></RccTurnout1>
    <RccTurnout1 :x="5*dx"  :y="0*dy" sid="to1" type="5L" :border="1"></RccTurnout1>
    <RccTurnout1 :x="6*dx"  :y="0*dy" sid="to1" type="6R" :border="1"></RccTurnout1>
    <RccTurnout1 :x="7*dx"  :y="0*dy" sid="to1" type="4L" :border="1"></RccTurnout1>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Geo } from '../classes/Geo'
import RccTurnout1 from '@/components/RccTurnout1.vue'

// ------Width and height of one Element (to make a grid)-------
const geo = new Geo(0, 0)
const dx = computed(() => geo.dxo())
const dy = computed(() => geo.dyo())
</script>
