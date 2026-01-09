<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-09: New                                         -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <RccBlocktester1 :x0="0" :y0="0" sid="bt1" :border="1" />
    <rect :x="x1" :y="y1" :width="w1" :height="h1" stroke="blue" stroke-width="4" fill="none" />
  </svg>
</template>

<script setup lang="ts">
import { Geof } from '../classes/Geo'
import RccBlocktester1 from '@/components/RccBlocktester1.vue'
// -----------viewbox and background values---------------------
const geof = new Geof(0, 0, 1, 1)
const dx=geof.dxo() // x width of a symbol in pixel (80)
const dy=geof.dyo() // y heighth of a symbol in pixel (60)
const nx = 4        // 4 symbols in x direction
const ny = 3        // 3 symbols in x direction
const x1=(-dx/2-2)  // x coordinates top left corner
const y1=(-dy/2-2)  // y coordinates top left corner
const w1=(nx*dx+4)  // viewbox width in pixel
const h1=(ny*dy+4)  // viewbox height in pixel
const viewbox=""+x1+" "+y1+" "+w1+" "+h1 // svg viewbox dimension
</script>
