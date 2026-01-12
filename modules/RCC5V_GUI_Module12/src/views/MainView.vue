<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-09: New                                         -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <RccModule12 :x0="xB" :y0="yB" sid="bt1" :border="border" />
  </svg>
</template>

<script setup lang="ts">
  import { computed, watchEffect } from 'vue'
  import { Geof } from '../classes/Geo'
  import { ciMqttClientInstance } from '@/services/CiMqttClientInstance'
  import RccModule12, { m12 } from '@/components/RccModule12.vue'
  const border = 1

  // ---------waiting for MQTT connection, then get status------
  watchEffect(() => {
    if (ciMqttClientInstance.mqttState.connected) {
      ciMqttClientInstance.publish('rcc/module12/get', 'status', false, 0).catch((e) => { console.error('RccModule12: ERROR:', e) })
    }
  })

  // ---------width and height of one Element (to make a grid)--
  const xB = 0 // corner top left
  const yB = 0 // corner top left
  const geof = new Geof(0, 0, 1, 1)
  const dx = computed(() => geof.dxo()) // x width of a symbol in pixel (80)
  const dy = computed(() => geof.dyo()) // y heighth of a symbol in pixel (60)
  const nx = m12.nx // symbols in x direction
  const ny = m12.ny // symbols in x direction
  const x1 = computed(() => (-dx.value/2 - 2))  // x coordinates top left corner
  const y1 = computed(() => (-dy.value/2 - 2))  // y coordinates top left corner
  const w1 = computed(() => (nx * dx.value + 4))  // viewbox width in pixel
  const h1 = computed(() => ((ny + 0) * dy.value + 4))  // viewbox height in pixel
  const viewbox = computed(() => [x1.value, y1.value, w1.value, h1.value].join(" ")) // svg viewbox
</script>
