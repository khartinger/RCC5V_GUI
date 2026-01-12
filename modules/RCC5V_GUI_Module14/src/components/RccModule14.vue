<!-- RccModule14.vue ------------------------khartinger----- -->
<!-- 2026-01-11: new                                         -->
<template>
  <g>
  <!-- empty fields ---------------------------------------- -->
  <RccTrack1    :x="x0+1*dx" :y="y0+0*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <RccTrack1    :x="x0+0*dx" :y="y0+2*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <RccTrack1    :x="x0+1*dx" :y="y0+2*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <!-- row 1 ----------------------------------------------- -->
  <RccTrack1     :x="x0+0*dx" :y="y0+0*dy" sid="tk0" dir="58" :border="border"></RccTrack1>
  <!-- row 2 ----------------------------------------------- -->
  <RccTrack1     :x="x0+0*dx" :y="y0+1*dy" sid="tk0" dir="15" :border="border"></RccTrack1>
  <RccTurnout1   :x="x0+1*dx" :y="y0+1*dy" sid="to141" type="5R" header="141 " headeralign="R" :border="border"></RccTurnout1>
  <!-- row 3 ----------------------------------------------- -->
  <!-- rail connectors, isolators, module name and border--- -->
  <RccTrackCon1 :x="x0+0.5*dx" :y="y0+0.5*dy" sid="con0" dir="8"></RccTrackCon1>
  <rect :x="x0-0.5*dx" :y="y0-0.5*dy" :width="m14.nx*dx" :height="m14.ny*dy" stroke="blue" stroke-width="4" fill="none" />
  <text class="ciFont1" :x="x0-0.47*dx" :y="y0-0.27*dy">Module 14</text>
</g>
</template>

<script lang="ts">
export const m14 = {
  nx: 2,
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
    ciMqttClientInstance.publish('rcc/module14/get', 'status', false, 0).catch((e) => { console.error('RccModule14: ERROR:', e) })
  }
})

// ------Width and height of one Element (to make a grid)-------
const geo = new Geo(0, 0)
const dx = computed(() => geo.dxo())
const dy = computed(() => geo.dyo())
</script>

