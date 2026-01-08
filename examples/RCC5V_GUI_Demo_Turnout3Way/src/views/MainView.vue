<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-06: New                                         -->
<template>
  <svg width="100%" viewBox="-45 -46 505 100">
    <rect class="ciBackground" x="-45" y="-46" width="505" height="100" />
    <text class="ciFont1" :x="-0.4*dx" :y="-0.55*dy">dir="1"</text>
    <text class="ciFont1" :x="0.8*dx" :y="-0.55*dy">dir="4"</text>
    <RccTurnout3Way1 :x="0*dx"  :y="0*dy" sid="t3w1" dir="1" :border="1"></RccTurnout3Way1>
    <RccTurnout3Way1 :x="1.2*dx"  :y="0*dy" sid="t3w1" dir="4" :border="1"></RccTurnout3Way1>
    <RccTurnout3Way1 :x="2.8*dx"  :y="0*dy" sid="t3w1" dir="1" footer="UNTEN" :border="1"></RccTurnout3Way1>
    <RccTurnout3Way1 :x="4*dx"  :y="0*dy" sid="t3w1" dir="4" header="        OBEN" :border="1"></RccTurnout3Way1>
    <RccTurnout3Way1 :x="5.2*dx"  :y="0*dy" sid="t3w1" dir="4" label="3" :border="3"></RccTurnout3Way1>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Geo } from '../classes/Geo'
import RccTurnout3Way1 from '@/components/RccTurnout3Way1.vue'

// ------Width and height of one Element (to make a grid)-------
const geo = new Geo(0, 0)
const dx = computed(() => geo.dxo())
const dy = computed(() => geo.dyo())
</script>
