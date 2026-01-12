<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-12: New                                         -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <RccModule13 :x0="0*dx" :y0="0*dy" sid="m13" :border="border" />
    <RccModule12 :x0="(m13.nx)*dx" :y0="0*dy" sid="m12" :border="border" />
    <RccModule11 :x0="(m13.nx+m12.nx)*dx" :y0="0*dy" sid="m11" :border="border" />
    
    <RccModule01 :x0="1*dx" :y0="(1+m13.ny)*dy" sid="m01" :border="border" />
    <RccModule14 :x0="(1+m01.nx)*dx" :y0="(1+m13.ny)*dy" sid="m01" :border="border" />
    <RccModule10 :x0="(1+m01.nx+m14.nx)*dx" :y0="(1+m13.ny)*dy" sid="m01" :border="border" />
  </svg>
</template>

<script setup lang="ts">
  import { computed, watchEffect } from 'vue'
  import { Geof } from '../classes/Geo'
  import { ciMqttClientInstance } from '@/services/CiMqttClientInstance'
  import RccModule13, { m13 } from '@/components/RccModule13.vue'
  import RccModule12, { m12 } from '@/components/RccModule12.vue'
  import RccModule11, { m11 } from '@/components/RccModule11.vue'
  import RccModule01, { m01 } from '@/components/RccModule01.vue'
  import RccModule14, { m14 } from '@/components/RccModule14.vue'
  import RccModule10, { m10 } from '@/components/RccModule10.vue'
  
  const border = 1

  // ---------waiting for MQTT connection, then get status------
  watchEffect(() => {
    if (ciMqttClientInstance.mqttState.connected) {
      ciMqttClientInstance.publish('rcc/module13/get', 'status', false, 0).catch((e) => { console.error('RccModule13: ERROR:', e) })
    }
  })

  // ---------width and height of one Element (to make a grid)--
  // const xB = 0 // corner top left
  // const yB = 0 // corner top left
  const geof = new Geof(0, 0, 1, 1)
  const dx = computed(() => geof.dxo()) // x width of a symbol in pixel (80)
  const dy = computed(() => geof.dyo()) // y heighth of a symbol in pixel (60)
  const nx = m13.nx + m12.nx + m11.nx //   symbols in x direction
  const ny = 1 + 2 * m13.ny //             symbols in x direction
  const x1 = computed(() => (-dx.value/2 - 2))  // x coordinates top left corner
  const y1 = computed(() => (-dy.value/2 - 2))  // y coordinates top left corner
  const w1 = computed(() => (nx * dx.value + 4))  // viewbox width in pixel
  const h1 = computed(() => ((ny + 0) * dy.value + 4))  // viewbox height in pixel
  const viewbox = computed(() => [x1.value, y1.value, w1.value, h1.value].join(" ")) // svg viewbox
</script>
