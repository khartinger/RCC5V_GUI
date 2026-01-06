<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-04: New                                         -->
<template>
  <svg width="100%" viewBox="-45 -46 250 100">
    <rect class="ciBackground" x="-45" y="-46" width="250" height="100" />
    <RccTurnout3Way1 :x="0*dx"  :y="0*dy" sid="t3w1" dir="1" :border="1"></RccTurnout3Way1>
    <RccTurnout3Way1 :x="2*dx"  :y="0*dy" sid="t3w1" dir="4" :border="1"></RccTurnout3Way1>
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
