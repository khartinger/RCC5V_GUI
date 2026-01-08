<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-06: New                                         -->
<template>
  <svg width="100%" viewBox="-45 -46 530 85">
    <rect class="ciBackground" x="-45" y="-46" width="530" height="85" />
    <text class="ciFont1" :x="-0.4*dx" :y="-0.55*dy">dir="1"</text>
    <text class="ciFont1" :x="0.7*dx" :y="-0.55*dy">dir="2"</text>
    <text class="ciFont1" :x="1.8*dx" :y="-0.55*dy">dir="8"</text>
    
    <RccUncoupler1 :x="0*dx"  :y="0*dy" sid="uc1" dir="1" :border="1"></RccUncoupler1>
    <RccUncoupler1 :x="1.1*dx"  :y="0*dy" sid="uc1" dir="2" :border="1"></RccUncoupler1>
    <RccUncoupler1 :x="2.2*dx"  :y="0*dy" sid="uc1" dir="8" :border="1"></RccUncoupler1>

    <RccUncoupler1 :x="3.3*dx"  :y="0*dy" sid="uc1" dir="1" footer="UNTEN" :border="1"></RccUncoupler1>
    <RccUncoupler1 :x="4.4*dx"  :y="0*dy" sid="uc1" dir="2" header="OBEN" :border="1"></RccUncoupler1>
    <RccUncoupler1 :x="5.5*dx"  :y="0*dy" sid="uc1" dir="8" label="3" :border="3"></RccUncoupler1>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Geo } from '../classes/Geo'
import RccUncoupler1 from '@/components/RccUncoupler1.vue'

// ------Width and height of one Element (to make a grid)-------
const geo = new Geo(0, 0)
const dx = computed(() => geo.dxo())
const dy = computed(() => geo.dyo())
</script>
