<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-06: New                                         -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <text class="ciFont1" :x="-0.4*dx" :y="-0.55*dy">dir="1"</text>
    <text class="ciFont1" :x="0.8*dx" :y="-0.55*dy">dir="4"</text>
    <RccTurnout3Way1 :x="0*dx"  :y="0*dy" sid="t3w1" dir="1" :border="border"></RccTurnout3Way1>
    <RccTurnout3Way1 :x="1.2*dx"  :y="0*dy" sid="t3w1" dir="4" :border="border"></RccTurnout3Way1>
    <RccTurnout3Way1 :x="2.8*dx"  :y="0*dy" sid="t3w1" dir="1" footer="UNTEN" :border="border"></RccTurnout3Way1>
    <RccTurnout3Way1 :x="4*dx"  :y="0*dy" sid="t3w1" dir="4" header="        OBEN" :border="border"></RccTurnout3Way1>
    <RccTurnout3Way1 :x="5.2*dx"  :y="0*dy" sid="t3w1" dir="4" label="3" :border="3"></RccTurnout3Way1>
  </svg>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { Geof } from '../classes/Geo'
import { rccMqttClientInstance } from '@/services/RccMqttClientInstance'

import RccTurnout3Way1 from '@/components/RccTurnout3Way1.vue'
const border = 1

// -----------waiting for MQTT connection, then get status------
watchEffect(() => {
  if (rccMqttClientInstance.mqttState.connected) {
    rccMqttClientInstance.publish('rcc/demo1/get', 'status', false, 0).catch((e) => { console.error('Demo_Turnout3Way1: ERROR:', e) })
  }
})

// ------Width and height of one Element (to make a grid)-------
const geof = new Geof(0, 0, 1, 1)
const dx = computed(() => geof.dxo()) // x width of a symbol in pixel (80)
const dy = computed(() => geof.dyo()) // y heighth of a symbol in pixel (60)
const nx = 6.5 //                        symbols in x direction
const ny = 1 //                          symbols in x direction
const x1 = computed(() => (-dx.value / 2 - 2)) // x coordinates top left corner
const y1 = computed(() => (-dy.value - 2)) //     y coordinates top left corner
const w1 = computed(() => (nx * dx.value + 4)) // viewbox width in pixel
const h1 = computed(() => ((ny + 0.5) * dy.value + 4)) // viewbox height in pixel
const viewbox = computed(() => [x1.value, y1.value, w1.value, h1.value].join(' ')) // svg viewbox
</script>
