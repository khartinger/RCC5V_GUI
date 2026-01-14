<!-- RccModule13.vue ------------------------khartinger----- -->
<!-- 2026-01-10: new                                         -->
<template>
  <g>
  <!-- empty fields ---------------------------------------- -->
  <RccTrack1    :x="x0+0*dx" :y="y0+0*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <RccTrack1    :x="x0+2*dx" :y="y0+0*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <RccTrack1    :x="x0+0*dx" :y="y0+2*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <RccTrack1    :x="x0+2*dx" :y="y0+2*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <!-- row 1 ----------------------------------------------- -->
  <RccTrack1    :x="x0+1*dx" :y="y0+0*dy" sid="m13b0" dir="48" :border="border"></RccTrack1>
  <!-- row 2 ----------------------------------------------- -->
  <RccTrack1     :x="x0+0*dx" :y="y0+1*dy" sid="tk133" dir="15" header="[ON]" headeralign="C" footer="133" footeralign="C" :border="border"></RccTrack1>
  <RccUncoupler1 :x="x0+1*dx" :y="y0+1*dy" sid="uc134" dir="15" header="[ON]" headeralign="C" footer="134" footeralign="C" :border="border"></RccUncoupler1>
  <RccTurnout3Way1 :x="x0+2*dx" :y="y0+1*dy" sid="tt132" dir="4" header="132" headeralign="R" footer="131" footeralign="R" :border="border"></RccTurnout3Way1>
  <!-- row 3 ----------------------------------------------- -->
  <RccTrack1    :x="x0+1*dx" :y="y0+2*dy" sid="m13b2" dir="26" :border="border"></RccTrack1>
  <!-- rail connectors, isolators, module name and border--- -->
  <RccTrackCon1 :x="x0+1.5*dx" :y="y0+0.5*dy" sid="con0" dir="8"></RccTrackCon1>
  <RccTrackCon1 :x="x0+1.5*dx" :y="y0+1.5*dy" sid="con0" dir="2"></RccTrackCon1>
  <RccTrackIso1 :x="x0+1.5*dx" :y="y0+1*dy" sid="iso0" dir="1"></RccTrackIso1>
  <rect :x="x0-0.5*dx" :y="y0-0.5*dy" :width="m13.nx*dx" :height="m13.ny*dy" stroke="blue" stroke-width="4" fill="none" />
  <text class="ciFont1" :x="x0-0.47*dx" :y="y0-0.27*dy">Module 13</text>
</g>
</template>

<script lang="ts">
export const m13 = {
  nx: 3,
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
    ciMqttClientInstance.publish('rcc/module13/get', 'status', false, 0).catch((e) => { console.error('RccModule13: ERROR:', e) })
  }
})

// ------Width and height of one Element (to make a grid)-------
const geo = new Geo(0, 0)
const dx = computed(() => geo.dxo())
const dy = computed(() => geo.dyo())
</script>

