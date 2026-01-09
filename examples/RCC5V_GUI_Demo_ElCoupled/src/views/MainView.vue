<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-06: New                                         -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <text class="ciFont1" :x="-0.4*dx" :y="-0.7*dy">Electrically coupled components</text>

    <RccTrack1   :x="0*dx" :y="0*dy" sid="to2" dir="01" header="TO2-to2" :border="border"></RccTrack1>
    <RccTrack1   :x="1*dx" :y="0*dy" sid="to2" dir="15" header="TO2-to2" :border="border"></RccTrack1>
    <RccTurnout1 :x="2*dx" :y="0*dy" sid="to2" type="5L" header="TO2B" :border="border"></RccTurnout1>
    <RccTurnout1 :x="1*dx" :y="1*dy" sid="to2" type="1L" header="TO2A" :border="border"></RccTurnout1>

    <RccTurnout1 :x="0*dx" :y="1*dy" sid="to1" type="1R" header="TO1A" :border="border"></RccTurnout1>
    <RccTrack1   :x="1*dx" :y="2*dy" sid="to1" dir="48" label="3" :border="border"></RccTrack1>
    <RccTurnout1 :x="2*dx" :y="3*dy" sid="to1i" type="4L" footer="TO1B" :border="border"></RccTurnout1>
    <RccTrack1   :x="3*dx" :y="3*dy" sid="tr0" dir="2" :border="border"></RccTrack1>

    <RccTrack1   :x="3*dx" :y="0*dy" sid="tr0" dir="15" :border="border"></RccTrack1>
    <RccTurnout3Way1 :x="4*dx" :y="0*dy" sid="t3w1" dir="1" :border="border"></RccTurnout3Way1>
    <RccTrack1   :x="2*dx" :y="1*dy" sid="tr0" dir="15" :border="border"></RccTrack1>
    <RccTrack1   :x="3*dx" :y="1*dy" sid="tr0" dir="15" :border="border"></RccTrack1>
    <RccTrack1   :x="4*dx" :y="1*dy" sid="tr0" dir="15" :border="border"></RccTrack1>
    <RccTurnout3Way1 :x="5*dx" :y="1*dy" sid="t3w1" dir="4" footer="  TO3A" footeralign="C" :border="border"></RccTurnout3Way1>
    <RccTurnout1 :x="4*dx" :y="2*dy" sid="to3i" type="2R" header="TO3B" headeralign="C" :border="border"></RccTurnout1>
  </svg>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { Geof } from '../classes/Geo'
import { ciMqttClientInstance } from '@/services/CiMqttClientInstance'

import RccTurnout1 from '@/components/RccTurnout1.vue'
import RccTrack1 from '@/components/RccTrack1.vue'
import RccTurnout3Way1 from '@/components/RccTurnout3Way1.vue'
const border = 1

// -----------waiting for MQTT connection, then get status------
watchEffect(() => {
  if (ciMqttClientInstance.mqttState.connected) {
    ciMqttClientInstance.publish('rcc/demo1/get', 'status', false, 0).catch((e) => { console.error('RccBlocktester1: ERROR:', e) })
  }
})
// ------Width and height of one Element (to make a grid)-------
// const x0 = 0 // corner top left
// const y0 = 0 // corner top left
const geof = new Geof(0, 0, 1, 1)
const dx = computed(() => geof.dxo()) // x width of a symbol in pixel (80)
const dy = computed(() => geof.dyo()) // y heighth of a symbol in pixel (60)
const nx = 6            // 4 symbols in x direction
const ny = 4            // 3 symbols in x direction
const x1 = computed(() => (-dx.value/2 - 2))  // x coordinates top left corner
const y1 = computed(() => (-dy.value - 2))  // y coordinates top left corner
const w1 = computed(() => (nx * dx.value + 4))  // viewbox width in pixel
const h1 = computed(() => ((ny + 0.5) * dy.value + 4))  // viewbox height in pixel
// const viewbox = computed(() => (x1.value + " " + y1.value + " " + w1.value + " " + h1.value)) // svg viewbox dimension
const viewbox = computed(() => [x1.value, y1.value, w1.value, h1.value].join(" ")) // svg viewbox
// const viewbox = computed(() => `${x1.value} ${y1}`) // svg viewbox dimension

</script>
