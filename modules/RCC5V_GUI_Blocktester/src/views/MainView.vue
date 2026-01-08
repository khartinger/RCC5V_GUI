<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-08: New                                         -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <RccBlocktester1 :x0="0" :y0="0" sid="bt1" :border="1" />
  </svg>
</template>

<script setup lang="ts">
import { Geof } from '../classes/Geo'
import RccBlocktester1 from '@/components/RccBlocktester1.vue'
// -----------viewbox and background values---------------------
const geof = new Geof(0, 0, 1, 1)
const dx=geof.dxo()
const dy=geof.dyo()
const x1=(-dx/2-1)
const y1=(-dy/2-1)
const w1=(4*dx+2)
const h1=(3*dy+2)
const viewbox=""+x1+" "+y1+" "+w1+" "+h1
</script>
