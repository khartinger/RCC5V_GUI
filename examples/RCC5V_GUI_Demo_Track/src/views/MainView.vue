<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2025-12-27: New                                         -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <!--Reihe 1-->
    <text class="ciFont1" :x="-0.4*dx" :y="-0.55*dy">dir="10"</text>
    <text class="ciFont1" :x="0.6*dx" :y="-0.55*dy">dir="20"</text>
    <text class="ciFont1" :x="1.6*dx" :y="-0.55*dy">dir="30"</text>
    <text class="ciFont1" :x="2.6*dx" :y="-0.55*dy">dir="40"</text>
    <text class="ciFont1" :x="3.6*dx" :y="-0.55*dy">dir="50"</text>
    <text class="ciFont1" :x="4.6*dx" :y="-0.55*dy">dir="60"</text>
    <text class="ciFont1" :x="5.6*dx" :y="-0.55*dy">dir="70"</text>
    <text class="ciFont1" :x="6.6*dx" :y="-0.55*dy">dir="80"</text>
    <RccTrack1 :x="0*dx"  :y="0*dy" sid="tk0" dir="10" :border="border"></RccTrack1>
    <RccTrack1 :x="1*dx"  :y="0*dy" sid="tk0" dir="20" :border="border"></RccTrack1>
    <RccTrack1 :x="2*dx"  :y="0*dy" sid="tk0" dir="30" :border="border"></RccTrack1>
    <RccTrack1 :x="3*dx"  :y="0*dy" sid="tk0" dir="40" :border="border"></RccTrack1>
    <RccTrack1 :x="4*dx"  :y="0*dy" sid="tk0" dir="50" :border="border"></RccTrack1>
    <RccTrack1 :x="5*dx"  :y="0*dy" sid="tk0" dir="60" :border="border"></RccTrack1>
    <RccTrack1 :x="6*dx"  :y="0*dy" sid="tk0" dir="70" :border="border"></RccTrack1>
    <RccTrack1 :x="7*dx"  :y="0*dy" sid="tk0" dir="80" :border="border"></RccTrack1>

    <!--Reihe 2-->
    <text class="ciFont1" :x="-0.4*dx" :y="0.95*dy">dir="14"</text>
    <text class="ciFont1" :x="0.6*dx" :y="0.95*dy">dir="15"</text>
    <text class="ciFont1" :x="1.6*dx" :y="0.95*dy">dir="16"</text>
    <text class="ciFont1" :x="3.6*dx" :y="0.95*dy">dir="24"</text>
    <text class="ciFont1" :x="4.6*dx" :y="0.95*dy">dir="25"</text>
    <text class="ciFont1" :x="5.6*dx" :y="0.95*dy">dir="26"</text>
    <text class="ciFont1" :x="6.6*dx" :y="0.95*dy">dir="28"</text>
    <RccTrack1 :x="0*dx"  :y="1.5*dy" sid="tk0" dir="14" :border="border"></RccTrack1>
    <RccTrack1 :x="1*dx"  :y="1.5*dy" sid="tk0" dir="15" :border="border"></RccTrack1>
    <RccTrack1 :x="2*dx"  :y="1.5*dy" sid="tk0" dir="16" :border="border"></RccTrack1>
    <RccTrack1 :x="4*dx"  :y="1.5*dy" sid="tk0" dir="24" :border="border"></RccTrack1>
    <RccTrack1 :x="5*dx"  :y="1.5*dy" sid="tk0" dir="25" :border="border"></RccTrack1>
    <RccTrack1 :x="6*dx"  :y="1.5*dy" sid="tk0" dir="26" :border="border"></RccTrack1>
    <RccTrack1 :x="7*dx"  :y="1.5*dy" sid="tk0" dir="28" :border="border"></RccTrack1>
    <!--Reihe 3-->
    <text class="ciFont1" :x="-0.4*dx" :y="2.45*dy">dir="48"</text>
    <text class="ciFont1" :x="0.6*dx" :y="2.45*dy">dir="58"</text>
    <text class="ciFont1" :x="1.6*dx" :y="2.45*dy">dir="68"</text>
    <text class="ciFont1" :x="2.6*dx" :y="2.45*dy">dir="46"</text>
    <text class="ciFont1" :x="3.6*dx" :y="2.45*dy">dir="13"</text>
    <text class="ciFont1" :x="4.6*dx" :y="2.45*dy">dir="17"</text>
    <text class="ciFont1" :x="5.6*dx" :y="2.45*dy">dir="35"</text>
    <text class="ciFont1" :x="6.6*dx" :y="2.45*dy">dir="57"</text>
    <RccTrack1 :x="0*dx"  :y="3*dy" sid="tk0" dir="48" :border="border"></RccTrack1>
    <RccTrack1 :x="1*dx"  :y="3*dy" sid="tk0" dir="58" :border="border"></RccTrack1>
    <RccTrack1 :x="2*dx"  :y="3*dy" sid="tk0" dir="68" :border="border"></RccTrack1>
    <RccTrack1 :x="3*dx"  :y="3*dy" sid="tk0" dir="46" :border="border"></RccTrack1>
    <RccTrack1 :x="4*dx"  :y="3*dy" sid="tk0" dir="13" :border="border"></RccTrack1>
    <RccTrack1 :x="5*dx"  :y="3*dy" sid="tk0" dir="17" :border="border"></RccTrack1>
    <RccTrack1 :x="6*dx"  :y="3*dy" sid="tk0" dir="35" :border="border"></RccTrack1>
    <RccTrack1 :x="7*dx"  :y="3*dy" sid="tk0" dir="57" :border="border"></RccTrack1>

    <!--Reihe 4 + 5-->
    <RccTrack1 :x="0*dx" :y="5*dy" sid="tk0" dir="15"></RccTrack1>
    <RccTrack1 :x="1*dx" :y="5*dy" sid="tk0" dir="58" :border="0"></RccTrack1>
    <RccTrack1 :x="2*dx" :y="6*dy" sid="tk1" dir="14" label="3" :border="border"></RccTrack1>
    <RccTrack1 :x="3*dx" :y="6*dy" sid="tk1" dir="25" con="2" footer="DCC 41" footeralign="C" :border="border"></RccTrack1>
    <RccTrack1 :x="4*dx" :y="5*dy" sid="tk1" dir="26" header="[ON]" headeralign="L" footer="[OFF]" footeralign="R" :border="border"></RccTrack1>
    <RccTrack1 :x="5*dx" :y="4*dy" sid="tk0" dir="68" :border="3"></RccTrack1>
    <RccTrack1 :x="6*dx" :y="5*dy" sid="tk0" dir="48" :border="border"></RccTrack1>
    <RccTrackIso1 :x="4.5*dx" :y="4.5*dy" sid="iso0" dir="2"></RccTrackIso1>
    <RccTrackCon1 :x="1.5*dx" :y="5.5*dy" sid="con0" dir="4" :color="geof.colorTrackOff"></RccTrackCon1>
    <RccTrackCon1 :x="5.5*dx" :y="4.5*dy" sid="con0" dir="4"></RccTrackCon1>
    <text class="ciFont1" :x="1.4*dx" :y="3.9*dy">dir= "4"|"1"|"2"</text>

    <RccTrack1 :x="2.5*dx" :y="4.7*dy" sid="tk0" dir="24" footer="4  1  2" footeralign="C" color="#BBBBBB"></RccTrack1>
    <RccTrackIso1 :x="2.5*dx" :y="4.7*dy" sid="iso0" dir="1"></RccTrackIso1>
    <RccTrackIso1 :x="3.0*dx" :y="4.2*dy" sid="iso0" dir="2"></RccTrackIso1>
    <RccTrackIso1 :x="2.0*dx" :y="4.2*dy" sid="iso0" dir="4"></RccTrackIso1>
    <RccTrackIso1 :x="1.5*dx" :y="4.7*dy" sid="iso0" dir="1" :color="geof.colorRoute"></RccTrackIso1>
  </svg>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { Geof } from '../classes/Geo'
import { rccMqttClientInstance } from '@/services/RccMqttClientInstance'

import RccTrack1 from '@/components/RccTrack1.vue'
import RccTrackIso1 from '@/components/RccTrackIso1.vue'
import RccTrackCon1 from '@/components/RccTrackCon1.vue'
const border = 1

// -----------waiting for MQTT connection, then get status------
watchEffect(() => {
  if (rccMqttClientInstance.mqttState.connected) {
    rccMqttClientInstance.publish('rcc/demo1/get', 'status', false, 0).catch((e) => { console.error('Demo_Track1: ERROR:', e) })
  }
})

// ------Width and height of one Element (to make a grid)-------
const geof = new Geof(0, 0, 1, 1)
const dx = computed(() => geof.dxo()) // x width of a symbol in pixel (80)
const dy = computed(() => geof.dyo()) // y heighth of a symbol in pixel (60)
const nx = 8 //                          symbols in x direction
const ny = 9 //                          symbols in x direction
const x1 = computed(() => (-dx.value / 2 - 2)) // x coordinates top left corner
const y1 = computed(() => (-dy.value - 2)) //     y coordinates top left corner
const w1 = computed(() => (nx * dx.value + 4)) // viewbox width in pixel
const h1 = computed(() => ((ny + 0.5) * dy.value + 4)) // viewbox height in pixel
const viewbox = computed(() => [x1.value, y1.value, w1.value, h1.value].join(' ')) // svg viewbox

</script>
