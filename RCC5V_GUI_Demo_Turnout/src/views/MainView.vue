<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-06: New                                         -->
<template>
  <svg width="100%" viewBox="-45 -46 650 155">
    <rect class="ciBackground" x="-45" y="-46" width="650" height="155" />
    <text class="ciFont1" :x="-0.4*dx" :y="-0.55*dy">type="1L"</text>
    <text class="ciFont1" :x="0.6*dx" :y="-0.55*dy">type="1R"</text>
    <text class="ciFont1" :x="1.6*dx" :y="-0.55*dy">type="2R"</text>
    <text class="ciFont1" :x="2.6*dx" :y="-0.55*dy">type="8L"</text>
    <text class="ciFont1" :x="3.6*dx" :y="-0.55*dy">type="5R"</text>
    <text class="ciFont1" :x="4.6*dx" :y="-0.55*dy">type="5L"</text>
    <text class="ciFont1" :x="5.6*dx" :y="-0.55*dy">type="6R"</text>
    <text class="ciFont1" :x="6.6*dx" :y="-0.55*dy">type="4L"</text>
    <RccTurnout1 :x="0*dx"  :y="0*dy" sid="to1" type="1L" :border="1"></RccTurnout1>
    <RccTurnout1 :x="1*dx"  :y="0*dy" sid="to1" type="1R" :border="1"></RccTurnout1>
    <RccTurnout1 :x="2*dx"  :y="0*dy" sid="to1" type="2R" :border="1"></RccTurnout1>
    <RccTurnout1 :x="3*dx"  :y="0*dy" sid="to1" type="8L" :border="1"></RccTurnout1>
    <RccTurnout1 :x="4*dx"  :y="0*dy" sid="to1" type="5R" :border="1"></RccTurnout1>
    <RccTurnout1 :x="5*dx"  :y="0*dy" sid="to1" type="5L" :border="1"></RccTurnout1>
    <RccTurnout1 :x="6*dx"  :y="0*dy" sid="to1" type="6R" :border="1"></RccTurnout1>
    <RccTurnout1 :x="7*dx"  :y="0*dy" sid="to1" type="4L" :border="1"></RccTurnout1>

    <RccTurnout1 :x="0*dx"  :y="1.2*dy" sid="to1" type="1L" header="OBEN" :border="1"></RccTurnout1>
    <RccTurnout1 :x="1*dx"  :y="1.2*dy" sid="to1" type="1R" footer="UNTEN" :border="1"></RccTurnout1>
    <RccTurnout1 :x="2*dx"  :y="1.2*dy" sid="to1" type="2R" label="3" :border="1"></RccTurnout1>
    <RccTurnout1 :x="3*dx"  :y="1.2*dy" sid="to1" type="8L" label="3" footer="UNTEN" :border="3"></RccTurnout1>
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
