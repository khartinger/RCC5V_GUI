<!-- RccBlocktester1.vue --------------------khartinger----- -->
<!-- 2026-01-12: new                                         -->
<template>
  <g>
  <!-- empty fields ---------------------------------------- -->
  <RccTrack1    :x="x0+2*dx" :y="y0+0*dy" sid="tk0" dir="0" :border="border"></RccTrack1>
  <!-- row 1 ----------------------------------------------- -->
  <RccTrack1    :x="x0+0*dx" :y="y0+0*dy" sid="tk0" dir="15" :border="border"></RccTrack1>
  <RccTrack1    :x="x0+1*dx" :y="y0+0*dy" sid="tk0" dir="58" :border="border"></RccTrack1>
  <!-- row 2 ----------------------------------------------- -->
  <RccUncoupler1   :x="x0+0*dx" :y="y0+1*dy" sid="uc1" dir="15" header="[ON]" headeralign="C" footer="DCC 11" footeralign="C" :border="border"></RccUncoupler1>
  <RccTrack1       :x="x0+1*dx" :y="y0+1*dy" sid="tk0" dir="15" :border="border"></RccTrack1>
  <RccTurnout3Way1 :x="x0+2*dx" :y="y0+1*dy" sid="t3w1" dir="4" header="DCC 32" headeralign="R" footer="DCC 31" footeralign="R" :border="border"></RccTurnout3Way1>
  
  <RccTrack1    :x="x0+0*dx" :y="y0+2*dy" sid="tk0" dir="15" :border="border"></RccTrack1>
  <RccTurnout1  :x="x0+1*dx" :y="y0+2*dy" sid="to1" type="1L" footer="DCC 21" :border="border"></RccTurnout1>  
  <RccTrack1    :x="x0+2*dx" :y="y0+2*dy" sid="tk1" dir="15" footer="DCC 41" footeralign="C" label="3" :border="border"></RccTrack1>
  <!-- rail connectors, isolators, module name and border--- -->
  <RccTrackCon1 :x="x0+1.5*dx" :y="y0+0.5*dy" sid="con0" dir="8"></RccTrackCon1>
  <RccTrackCon1 :x="x0+1.5*dx" :y="y0+1.5*dy" sid="con0" dir="2"></RccTrackCon1>
  <RccTrackIso1 :x="x0+1.5*dx" :y="y0+2*dy" sid="iso0" dir="1"></RccTrackIso1>
  <rect :x="x0-0.5*dx" :y="y0-0.5*dy" :width="bt1.nx*dx" :height="bt1.ny*dy" stroke="blue" stroke-width="4" fill="none" />
  <text class="ciFont1" :x="x0-0.47*dx" :y="y0-0.27*dy">Blocktester</text>

</g>
</template>

<script lang="ts">
export const bt1 = {
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
    ciMqttClientInstance.publish('rcc/demo1/get', 'status', false, 0).catch((e) => { console.error('RccBlocktester1: ERROR:', e) })
  }
})

// ------Width and height of one Element (to make a grid)-------
const geo = new Geo(0, 0)
const dx = computed(() => geo.dxo())
const dy = computed(() => geo.dyo())
</script>

