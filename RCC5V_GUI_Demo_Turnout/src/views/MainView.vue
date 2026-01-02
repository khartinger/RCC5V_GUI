<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2025-12-27: New                                         -->
<template>
  <svg width="100%" viewBox="-45 -46 650 810">
    <rect class="ciBackground" x="-45" y="-46" width="650" height="810" />
    <!--Reihe 1-->
    <text class="ciFont1" :x="-0.4*dx" :y="-0.55*dy">dir="10"</text>
    <text class="ciFont1" :x="0.6*dx" :y="-0.55*dy">dir="20"</text>
    <text class="ciFont1" :x="1.6*dx" :y="-0.55*dy">dir="30"</text>
    <text class="ciFont1" :x="2.6*dx" :y="-0.55*dy">dir="40"</text>
    <text class="ciFont1" :x="3.6*dx" :y="-0.55*dy">dir="50"</text>
    <text class="ciFont1" :x="4.6*dx" :y="-0.55*dy">dir="60"</text>
    <text class="ciFont1" :x="5.6*dx" :y="-0.55*dy">dir="70"</text>
    <text class="ciFont1" :x="6.6*dx" :y="-0.55*dy">dir="80"</text>
    <RccTurnout1 :x="0*dx"  :y="0*dy" sid="tk0" dir="10" :border="1"></RccTurnout1>
    <RccTurnout1 :x="1*dx"  :y="0*dy" sid="tk0" dir="20" :border="1"></RccTurnout1>
    <RccTurnout1 :x="2*dx"  :y="0*dy" sid="tk0" dir="30" :border="1"></RccTurnout1>
    <RccTurnout1 :x="3*dx"  :y="0*dy" sid="tk0" dir="40" :border="1"></RccTurnout1>
    <RccTurnout1 :x="4*dx"  :y="0*dy" sid="tk0" dir="50" :border="1"></RccTurnout1>
    <RccTurnout1 :x="5*dx"  :y="0*dy" sid="tk0" dir="60" :border="1"></RccTurnout1>
    <RccTurnout1 :x="6*dx"  :y="0*dy" sid="tk0" dir="70" :border="1"></RccTurnout1>
    <RccTurnout1 :x="7*dx"  :y="0*dy" sid="tk0" dir="80" :border="1"></RccTurnout1>

    <!--Reihe 2-->
    <text class="ciFont1" :x="-0.4*dx" :y="0.95*dy">dir="14"</text>
    <text class="ciFont1" :x="0.6*dx" :y="0.95*dy">dir="15"</text>
    <text class="ciFont1" :x="1.6*dx" :y="0.95*dy">dir="16"</text>
    <text class="ciFont1" :x="3.6*dx" :y="0.95*dy">dir="24"</text>
    <text class="ciFont1" :x="4.6*dx" :y="0.95*dy">dir="25"</text>
    <text class="ciFont1" :x="5.6*dx" :y="0.95*dy">dir="26"</text>
    <text class="ciFont1" :x="6.6*dx" :y="0.95*dy">dir="28"</text>
    <RccTurnout1 :x="0*dx"  :y="1.5*dy" sid="tk0" dir="14" :border="1"></RccTurnout1>
    <RccTurnout1 :x="1*dx"  :y="1.5*dy" sid="tk0" dir="15" :border="1"></RccTurnout1>
    <RccTurnout1 :x="2*dx"  :y="1.5*dy" sid="tk0" dir="16" :border="1"></RccTurnout1>
    <RccTurnout1 :x="4*dx"  :y="1.5*dy" sid="tk0" dir="24" :border="1"></RccTurnout1>
    <RccTurnout1 :x="5*dx"  :y="1.5*dy" sid="tk0" dir="25" :border="1"></RccTurnout1>
    <RccTurnout1 :x="6*dx"  :y="1.5*dy" sid="tk0" dir="26" :border="1"></RccTurnout1>
    <RccTurnout1 :x="7*dx"  :y="1.5*dy" sid="tk0" dir="28" :border="1"></RccTurnout1>
    <!--Reihe 3-->
    <text class="ciFont1" :x="-0.4*dx" :y="2.45*dy">dir="48"</text>
    <text class="ciFont1" :x="0.6*dx" :y="2.45*dy">dir="58"</text>
    <text class="ciFont1" :x="1.6*dx" :y="2.45*dy">dir="68"</text>
    <text class="ciFont1" :x="2.6*dx" :y="2.45*dy">dir="46"</text>
    <text class="ciFont1" :x="3.6*dx" :y="2.45*dy">dir="13"</text>
    <text class="ciFont1" :x="4.6*dx" :y="2.45*dy">dir="17"</text>
    <text class="ciFont1" :x="5.6*dx" :y="2.45*dy">dir="35"</text>
    <text class="ciFont1" :x="6.6*dx" :y="2.45*dy">dir="57"</text>
    <RccTurnout1 :x="0*dx"  :y="3*dy" sid="tk0" dir="48" :border="1"></RccTurnout1>
    <RccTurnout1 :x="1*dx"  :y="3*dy" sid="tk0" dir="58" :border="1"></RccTurnout1>
    <RccTurnout1 :x="2*dx"  :y="3*dy" sid="tk0" dir="68" :border="1"></RccTurnout1>
    <RccTurnout1 :x="3*dx"  :y="3*dy" sid="tk0" dir="46" :border="1"></RccTurnout1>
    <RccTurnout1 :x="4*dx"  :y="3*dy" sid="tk0" dir="13" :border="1"></RccTurnout1>
    <RccTurnout1 :x="5*dx"  :y="3*dy" sid="tk0" dir="17" :border="1"></RccTurnout1>
    <RccTurnout1 :x="6*dx"  :y="3*dy" sid="tk0" dir="35" :border="1"></RccTurnout1>
    <RccTurnout1 :x="7*dx"  :y="3*dy" sid="tk0" dir="57" :border="1"></RccTurnout1>

    <!--Reihe 4 + 5-->
    <RccTurnout1 :x="0*dx" :y="5*dy"  sid="tk0" dir="58" :border="1"></RccTurnout1>
    <text class="ciFont1" :x="0.55*dx" :y="5.45*dy">label="1"</text>
    <RccTurnout1 :x="1*dx" :y="6*dy" sid="tk1" dir="14" :border="1" label="1"></RccTurnout1>
    <text class="ciFont1" :x="1.55*dx" :y="5.45*dy">label="3"</text>
    <RccTurnout1 :x="2*dx" :y="6*dy" sid="tk1" dir="15" :border="1" label="3"></RccTurnout1>
    <text class="ciFont1" :x="2.55*dx" :y="5.45*dy">label="2"</text>
    <RccTurnout1 :x="3*dx" :y="6*dy" sid="tk1" dir="25" :border="1" label="2"></RccTurnout1>
    <RccTurnout1 :x="4*dx" :y="5*dy"  sid="tk0" dir="16" :border="1"></RccTurnout1>

    <!--Reihe 6 + 7-->
    <RccTurnout1 :x="0*dx" :y="8*dy" sid="tk0" dir="52" :border="0"></RccTurnout1>
    <RccTurnout1 :x="1*dx" :y="7*dy" sid="tk1" dir="16" :border="0" label="1"></RccTurnout1>
    <RccTurnout1 :x="2*dx" :y="7*dy" sid="tk1" dir="15" :border="0" label="3"></RccTurnout1>
    <RccTurnout1 :x="3*dx" :y="7*dy" sid="tk1" dir="58" :border="0" label="1"></RccTurnout1>
    <RccTurnout1 :x="4*dx" :y="8*dy" sid="tk0" dir="14" :border="0"></RccTurnout1>
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
