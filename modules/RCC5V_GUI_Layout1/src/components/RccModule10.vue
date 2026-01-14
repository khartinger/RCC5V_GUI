<!-- RccModule10.vue ------------------------khartinger----- -->
<!-- 2026-01-09: new                                         -->
<template>
  <g>
  <!-- empty fields ---------------------------------------- -->
  <RccTrack1       :x="x0+0*dx" :y="y0+0*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <RccTrack1       :x="x0+0*dx" :y="y0+2*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <RccTrack1       :x="x0+2*dx" :y="y0+2*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <RccTrack1       :x="x0+4*dx" :y="y0+2*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <!-- station bypass -------------------------------------- -->
  <RccTrack1       :x="x0+1*dx" :y="y0+0*dy" sid="tk0" dir="26" :border="border"></RccTrack1>
  <RccTurnout3Way1 :x="x0+0*dx" :y="y0+1*dy" sid="tt101" dir="1" header="101" headeralign="C" footer="102" footeralign="C" :border="border"></RccTurnout3Way1>
  <RccTrack1       :x="x0+1*dx" :y="y0+2*dy" sid="tk0" dir="48" :border="border"></RccTrack1>
  <!-- entrance to the station ----------------------------- -->
  <RccTrack1       :x="x0+1*dx" :y="y0+1*dy" sid="tk106" dir="15" footer="106" footeralign="C" :border="border"></RccTrack1>
  <!-- Platform 1 ------------------------------------------ -->
  <RccTurnout3Way1 :x="x0+2*dx" :y="y0+1*dy" sid="tt103" dir="1" header="103" headeralign="C" footer="104" footeralign="C" :border="border"></RccTurnout3Way1>
  <RccTurnout1     :x="x0+3*dx" :y="y0+0*dy" sid="to105" type="5L" header="105" headeralign="C" :border="border"></RccTurnout1>  
  <RccTrack1       :x="x0+2*dx" :y="y0+0*dy" sid="tk106" dir="1" header="106" headeralign="C" :border="border"></RccTrack1>
  <RccUncoupler1   :x="x0+4*dx" :y="y0+0*dy" sid="uc108" dir="15" header="[ON]" headeralign="C" footer="108" footeralign="C" :border="border"></RccUncoupler1>
  <!-- Platform 2 ------------------------------------------ -->
  <RccTrack1       :x="x0+3*dx" :y="y0+1*dy" sid="tk106" dir="15" footer="106" footeralign="C" :border="border"></RccTrack1>
  <RccTrack1       :x="x0+4*dx" :y="y0+1*dy" sid="tk106" dir="15" footer="106" footeralign="C" :border="border"></RccTrack1>
  <!-- Platform 3: Locomotive shed -------------------------- -->
  <RccTrack1       :x="x0+3*dx" :y="y0+2*dy" sid="tk107" dir="48" footer="107" footeralign="C" :border="border"></RccTrack1>
  <!-- rail connectors, isolators, module name and border--- -->
  <RccTrackCon1    :x="x0+0.5*dx" :y="y0+0.5*dy" sid="con0" dir="2"></RccTrackCon1>
  <RccTrackCon1    :x="x0+0.5*dx" :y="y0+1.5*dy" sid="con0" dir="4"></RccTrackCon1>
  <RccTrackIso1    :x="x0+0.5*dx" :y="y0+1*dy" sid="iso0" dir="1"></RccTrackIso1>
  <RccTrackCon1    :x="x0+2.5*dx" :y="y0+0.5*dy" sid="con0" dir="2"></RccTrackCon1>
  <RccTrackIso1    :x="x0+2.5*dx" :y="y0+1.5*dy" sid="iso0" dir="4"></RccTrackIso1>
  <rect :x="x0-0.5*dx" :y="y0-0.5*dy" :width="m10.nx*dx" :height="m10.ny*dy" stroke="blue" stroke-width="4" fill="none" />
  <text class="ciFont1" :x="x0-0.47*dx" :y="y0-0.27*dy">Module 10</text>
</g>
</template>

<script lang="ts">
export const m10 = {
  nx: 5,
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
    ciMqttClientInstance.publish('rcc/module10/get', 'status', false, 0).catch((e) => { console.error('RccModule10: ERROR:', e) })
  }
})

// ------Width and height of one Element (to make a grid)-------
const geo = new Geo(0, 0)
const dx = computed(() => geo.dxo())
const dy = computed(() => geo.dyo())
</script>

