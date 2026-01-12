<!-- RccModule12.vue ------------------------khartinger----- -->
<!-- 2026-01-10: new                                         -->
<template>
  <g>
  <!-- empty fields ---------------------------------------- -->
  <RccTrack1    :x="x0+0*dx" :y="y0+2*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <RccTrack1    :x="x0+3*dx" :y="y0+0*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <!-- row 1 ----------------------------------------------- -->
  <RccTrack1    :x="x0+0*dx" :y="y0+0*dy" sid="tk12529" dir="1" footer=" 129  [OFF]" footeralign="L" :border="border"></RccTrack1>
  <RccTurnout1  :x="x0+1*dx" :y="y0+0*dy" sid="to123" type="5L" header="123" headeralign="C" :border="border"></RccTurnout1>
  <RccTrack1    :x="x0+2*dx" :y="y0+0*dy" sid="tk125" dir="58" header="125  [ON]" headeralign="R" footer="[OFF]" :border="border"></RccTrack1>
  <!-- row 2 ----------------------------------------------- -->
  <RccTurnout3Way1 :x="x0+0*dx" :y="y0+1*dy" sid="t3121" dir="1" header=" 121" headeralign="L" footer=" 122" footeralign="L" :border="border"></RccTurnout3Way1>
  <RccTrack1    :x="x0+1*dx" :y="y0+1*dy" sid="tk126" dir="15" header="126" headeralign="C" footer="[OFF]" footeralign="C" :border="border"></RccTrack1>
  <RccTrack1    :x="x0+2*dx" :y="y0+1*dy" sid="tk126" dir="15" header="126" headeralign="C" footer="[OFF]" footeralign="C" :border="border"></RccTrack1>
  <RccTurnout1  :x="x0+3*dx" :y="y0+1*dy" sid="to128" type="5R" header="  128" headeralign="C" :border="border"></RccTurnout1>
  <!-- row 3 ----------------------------------------------- -->
  <RccTrack1     :x="x0+1*dx" :y="y0+2*dy" sid="tk127" dir="14" footer="127    [OFF]" footeralign="R" header="[ON]" headeralign="R" :border="border"></RccTrack1>
  <RccUncoupler1 :x="x0+2*dx" :y="y0+2*dy" sid="uc124" dir="15" header="Uncoupler [ON]" headeralign="C" footer="124" footeralign="C" :border="border"></RccUncoupler1>
  <RccTrack1     :x="x0+3*dx" :y="y0+2*dy" sid="tk127" dir="5" header="[ON]" headeralign="C" footer="127  [OFF]" footeralign="L" :border="border"></RccTrack1>
  <!-- rail connectors, isolators, module name and border--- -->
  <RccTrackIso1 :x="x0+0.5*dx" :y="y0+0.0*dy" sid="iso0" dir="1"></RccTrackIso1>
  <RccTrackIso1 :x="x0+0.5*dx" :y="y0+0.5*dy" sid="iso0" dir="2"></RccTrackIso1>
  <RccTrackIso1 :x="x0+2.5*dx" :y="y0+0.5*dy" sid="iso0" dir="4"></RccTrackIso1>
  <RccTrackIso1 :x="x0+0.5*dx" :y="y0+1.0*dy" sid="iso0" dir="1"></RccTrackIso1>
  <RccTrackIso1 :x="x0+2.5*dx" :y="y0+1.0*dy" sid="iso0" dir="1"></RccTrackIso1>
  <RccTrackIso1 :x="x0+0.5*dx" :y="y0+1.5*dy" sid="iso0" dir="4"></RccTrackIso1>
  <rect :x="x0-0.5*dx" :y="y0-0.5*dy" :width="m12.nx*dx" :height="m12.ny*dy" stroke="blue" stroke-width="4" fill="none" />
  <text class="ciFont1" :x="x0-0.47*dx" :y="y0-0.27*dy">Module 12</text>
</g>
</template>

<script lang="ts">
export const m12 = {
  nx: 4,
  ny: 3
}
</script>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { Geo } from '../classes/Geo'
import RccTrack1 from './RccTrack1.vue'
import RccTrackCon1 from './RccTrackCon1.vue'
import RccTrackIso1 from './RccTrackIso1.vue'
import RccTurnout1 from './RccTurnout1.vue'
import RccTurnout3Way1 from './RccTurnout3Way1.vue'
import RccUncoupler1 from './RccUncoupler1.vue'
import { ciMqttClientInstance } from '@/services/CiMqttClientInstance';

const props = defineProps<{
  x0: number;
  y0: number;
  sid: string;
  border: number;
}>()

// -----------waiting for MQTT connection, then get status------
watchEffect(() => {
  if(ciMqttClientInstance.mqttState.connected) {
    ciMqttClientInstance.publish('rcc/module12/get', 'status', false, 0).catch((e) => { console.error('RccModule12: ERROR:', e) })
  }
})

// ------Width and height of one Element (to make a grid)-------
const geo = new Geo(0, 0)
const dx = computed(() => geo.dxo())
const dy = computed(() => geo.dyo())
</script>

