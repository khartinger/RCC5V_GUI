<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-09: New                                         -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <text class="ciFont1" :x="-0.4*dx" :y="-0.55*dy">type="1L"</text>
    <text class="ciFont1" :x="0.6*dx" :y="-0.55*dy">type="1R"</text>
    <text class="ciFont1" :x="1.6*dx" :y="-0.55*dy">type="2R"</text>
    <text class="ciFont1" :x="2.6*dx" :y="-0.55*dy">type="8L"</text>
    <text class="ciFont1" :x="3.6*dx" :y="-0.55*dy">type="5R"</text>
    <text class="ciFont1" :x="4.6*dx" :y="-0.55*dy">type="5L"</text>
    <text class="ciFont1" :x="5.6*dx" :y="-0.55*dy">type="6R"</text>
    <text class="ciFont1" :x="6.6*dx" :y="-0.55*dy">type="4L"</text>
    <RccTurnout1 :x="0*dx"  :y="0*dy" sid="to1" type="1L" :border="border"></RccTurnout1>
    <RccTurnout1 :x="1*dx"  :y="0*dy" sid="to1" type="1R" :border="border"></RccTurnout1>
    <RccTurnout1 :x="2*dx"  :y="0*dy" sid="to1" type="2R" :border="border"></RccTurnout1>
    <RccTurnout1 :x="3*dx"  :y="0*dy" sid="to1" type="8L" :border="border"></RccTurnout1>
    <RccTurnout1 :x="4*dx"  :y="0*dy" sid="to1" type="5R" :border="border"></RccTurnout1>
    <RccTurnout1 :x="5*dx"  :y="0*dy" sid="to1" type="5L" :border="border"></RccTurnout1>
    <RccTurnout1 :x="6*dx"  :y="0*dy" sid="to1" type="6R" :border="border"></RccTurnout1>
    <RccTurnout1 :x="7*dx"  :y="0*dy" sid="to1" type="4L" :border="border"></RccTurnout1>

    <RccTurnout1 :x="0*dx"  :y="1.2*dy" sid="to1" type="1L" header="OBEN" :border="border"></RccTurnout1>
    <RccTurnout1 :x="1*dx"  :y="1.2*dy" sid="to1" type="1R" footer="UNTEN" :border="border"></RccTurnout1>
    <RccTurnout1 :x="2*dx"  :y="1.2*dy" sid="to1" type="2R" label="3" :border="border"></RccTurnout1>
    <RccTurnout1 :x="3*dx"  :y="1.2*dy" sid="to1" type="8L" label="3" footer="UNTEN" :border="3"></RccTurnout1>

    <RccTurnout1 :x="5*dx"  :y="1.2*dy" sid="to1" type="1L" header="TOP" footer="BOTTOM_R" footeralign="R" :border="border"></RccTurnout1>
    <RccTurnout1 :x="6*dx"  :y="1.2*dy" sid="to1" type="1L" header="TOP_C" headeralign="C" footer="BOTTOM_C" footeralign="C" :border="border"></RccTurnout1>
  </svg>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { Geof } from '../classes/Geo'
import { ciMqttClientInstance } from '@/services/CiMqttClientInstance'
import RccTurnout1 from '@/components/RccTurnout1.vue'
const border = 1

// -----------waiting for MQTT connection, then get status------
watchEffect(() => {
  if (ciMqttClientInstance.mqttState.connected) {
    ciMqttClientInstance.publish('rcc/demo1/get', 'status', false, 0).catch((e) => { console.error('Demo_Track1: ERROR:', e) })
  }
})

// ------Width and height of one Element (to make a grid)-------
const geof = new Geof(0, 0, 1, 1)
const dx = computed(() => geof.dxo()) // x width of a symbol in pixel (80)
const dy = computed(() => geof.dyo()) // y heighth of a symbol in pixel (60)
const nx = 8 //                          symbols in x direction
const ny = 2.3 //                          symbols in x direction
const x1 = computed(() => (-dx.value / 2 - 2)) // x coordinates top left corner
const y1 = computed(() => (-dy.value - 2)) //     y coordinates top left corner
const w1 = computed(() => (nx * dx.value + 4)) // viewbox width in pixel
const h1 = computed(() => ((ny + 0.5) * dy.value + 4)) // viewbox height in pixel
const viewbox = computed(() => [x1.value, y1.value, w1.value, h1.value].join(' ')) // svg viewbox

</script>
