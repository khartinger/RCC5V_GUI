<!-- RccModule11.vue ------------------------khartinger----- -->
<!-- 2026-01-11: new                                         -->
<template>
  <g>
  <!-- empty fields ---------------------------------------- -->
  <RccTrack1    :x="x0+2*dx" :y="y0+0*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <RccTrack1    :x="x0+0*dx" :y="y0+2*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <RccTrack1    :x="x0+1*dx" :y="y0+2*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <RccTrack1    :x="x0+2*dx" :y="y0+2*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <!-- row 1 ----------------------------------------------- -->
  <RccUncoupler1 :x="x0+0*dx" :y="y0+0*dy" sid="uc113" dir="15" footer="113 [OFF]" footeralign="C" :border="border"></RccUncoupler1>
  <RccTrack1     :x="x0+1*dx" :y="y0+0*dy" sid="tk112" dir="58" header="[ON]" headeralign="R" footer=" 112 [OFF]" footeralign="L" :border="border"></RccTrack1>
  <!-- row 2 ----------------------------------------------- -->
  <RccTrack1     :x="x0+0*dx" :y="y0+1*dy" sid="tk0" dir="15" :border="border"></RccTrack1>
  <RccTrack1     :x="x0+1*dx" :y="y0+1*dy" sid="tk0" dir="15" :border="border"></RccTrack1>
  <RccTurnout1   :x="x0+2*dx" :y="y0+1*dy" sid="to111" type="5R" header="111 " headeralign="R" :border="border"></RccTurnout1>
  <!-- row 3 ----------------------------------------------- -->
  <!-- rail connectors, isolators, module name and border--- -->
  <RccTrackIso1 :x="x0+1.5*dx" :y="y0+0.5*dy" sid="con0" dir="8"></RccTrackIso1>
  <rect :x="x0-0.5*dx" :y="y0-0.5*dy" :width="m11.nx*dx" :height="m11.ny*dy" stroke="blue" stroke-width="4" fill="none" />
  <text class="ciFont1" :x="x0-0.47*dx" :y="y0-0.27*dy">Module 11</text>
</g>
</template>

<script lang="ts">
export const m11 = {
  nx: 3,
  ny: 3
}
</script>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { Geo } from '../classes/Geo'
import RccTrack1 from './RccTrack1.vue'
//import RccTrackCon1 from './RccTrackCon1.vue'
import RccTrackIso1 from './RccTrackIso1.vue'
import RccTurnout1 from './RccTurnout1.vue'
//import RccTurnout3Way1 from './RccTurnout3Way1.vue'
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
    ciMqttClientInstance.publish('rcc/module11/get', 'status', false, 0).catch((e) => { console.error('RccModule11: ERROR:', e) })
  }
})

// ------Width and height of one Element (to make a grid)-------
const geo = new Geo(0, 0)
const dx = computed(() => geo.dxo())
const dy = computed(() => geo.dyo())
</script>

