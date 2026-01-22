<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-06: New                                         -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <rect class="ciBackground" x="-45" y="-46" width="530" height="85" />
    <text class="ciFont1" :x="-0.4*dx" :y="-0.55*dy">dir="1"</text>
    <text class="ciFont1" :x="0.7*dx" :y="-0.55*dy">dir="2"</text>
    <text class="ciFont1" :x="1.8*dx" :y="-0.55*dy">dir="8"</text>
    
    <RccUncoupler1 :x="0*dx"  :y="0*dy" sid="uc1" dir="1" :border="border"></RccUncoupler1>
    <RccUncoupler1 :x="1.1*dx"  :y="0*dy" sid="uc1" dir="2" header="HEADER" :border="border"></RccUncoupler1>
    <RccUncoupler1 :x="2.2*dx"  :y="0*dy" sid="uc1" dir="8" footer="BOTTOM" :border="border"></RccUncoupler1>

    <RccUncoupler1 :x="3.3*dx"  :y="0*dy" sid="uc1" dir="1" footer="FOOTER_C" footeralign="C" :border="border"></RccUncoupler1>
    <RccUncoupler1 :x="4.4*dx"  :y="0*dy" sid="uc1" dir="2" header="TOP" :border="border"></RccUncoupler1>
    <RccUncoupler1 :x="5.5*dx"  :y="0*dy" sid="uc1" dir="8" label="3" :border="3"></RccUncoupler1>
  </svg>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { Geof } from '../classes/Geo'
import { rccMqttClientInstance } from '@/services/RccMqttClientInstance'
import RccUncoupler1 from '@/components/RccUncoupler1.vue'
const border = 1

// -----------waiting for MQTT connection, then get status------
watchEffect(() => {
  if (rccMqttClientInstance.mqttState.connected) {
    rccMqttClientInstance.publish('rcc/demo1/get', 'status', false, 0).catch((e) => { console.error('RccBlocktester1: ERROR:', e) })
  }
})
// ------Width and height of one Element (to make a grid)-------
const geof = new Geof(0, 0, 1, 1)
const dx = computed(() => geof.dxo()) // x width of a symbol in pixel (80)
const dy = computed(() => geof.dyo()) // y heighth of a symbol in pixel (60)
const nx = 6.5            // 4 symbols in x direction
const ny = 1.1            // 3 symbols in x direction
const x1 = computed(() => (-dx.value/2 - 2))  // x coordinates top left corner
const y1 = computed(() => (-dy.value - 2))  // y coordinates top left corner
const w1 = computed(() => (nx * dx.value + 4))  // viewbox width in pixel
const h1 = computed(() => ((ny + 0.5) * dy.value + 4))  // viewbox height in pixel
const viewbox = computed(() => [x1.value, y1.value, w1.value, h1.value].join(" ")) // svg viewbox

</script>
