<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-09: New                                         -->
<!-- 2026-01-15: Improve, add button, set/release a route    -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <RccModule13 :x0="xB" :y0="yB" sid="m13" :border="border" :color="color" :route="routeXm13" />
  </svg>
<br>
<table><tr><td>
<button
  v-for="p in routesOn"
  :key="p.id"
  @click="onClkRouteOn(p.id)"
  class="my-button"
> Weichenstraße {{ p.label }} durchschalten
</button><br>
</td><td>
<button
  v-for="p in routesOff"
  :key="p.id"
  @click="onClkRouteOff(p.id)"
  class="my-button"
> Weichenstraße {{ p.label }} aufl&ouml;sen
</button><br>
</td></tr></table>
</template>

<script setup lang="ts">
  import { ref, computed, watchEffect } from 'vue'
  import { Geof } from '../classes/Geo'
  import { ciMqttClientInstance } from '@/services/CiMqttClientInstance'

  // ***********************************************************
  //     Customize data for the module here
  // ***********************************************************
  import RccModule13, { m13 } from '@/components/RccModule13.vue'
  
  const topicGet = 'rcc/module13/get'
  const topicSet = 'rcc/module13/set/'

  const route1dcc = '132/0'
  const route1m13 = ' 2/1,1/0'
  const route2dcc = '131/1,132/1,133/1'
  const route2m13 = '0/1,1/1,2/1'
  const route3dcc = '131/0'
  const route3m13 = '2/1,1/2'

  const routesOn = [
    { id: 1, label: '1 (Nord)', sRouteMxx: route1m13, sRouteDcc: route1dcc },
    { id: 2, label: '2 (Gerade)', sRouteMxx: route2m13, sRouteDcc: route2dcc },
    { id: 3, label: '3 (Süd)', sRouteMxx: route3m13, sRouteDcc: route3dcc },
  ]
  const routesOff = [
    { id: 1, label: '1', sRouteMxx: route1m13, sRouteDcc: route1dcc },
    { id: 2, label: '2', sRouteMxx: route2m13, sRouteDcc: route2dcc },
    { id: 3, label: '3', sRouteMxx: route3m13, sRouteDcc: route3dcc },
  ]
  
  // ***********************************************************
  //     Usually the same for all modules
  // ***********************************************************
  
  const border = 1
  const geof = new Geof(0, 0, 1, 1)
  const routeXm13 = ref('') //         Route for <RCCModule13 ..>
  const color = ref(geof.colorNone) // Color for <RCCModule13 ..>
  // ---------width and height of one Element (to make a grid)--
  const xB = 0 // corner top left
  const yB = 0 // corner top left
  const dx = computed(() => geof.dxo()) // x width of a symbol in pixel (80)
  const dy = computed(() => geof.dyo()) // y heighth of a symbol in pixel (60)
  const nx = m13.nx // symbols in x direction
  const ny = m13.ny // symbols in x direction
  const x1 = computed(() => (-dx.value/2 - 2)) //   x coordinates top left corner
  const y1 = computed(() => (-dy.value/2 - 2)) //   y coordinates top left corner
  const w1 = computed(() => (nx * dx.value + 4)) // viewbox width in pixel
  const h1 = computed(() => ((ny + 0) * dy.value + 4))  // viewbox height in pixel
  const viewbox = computed(() => [x1.value, y1.value, w1.value, h1.value].join(" "))

  // ____Sleep/Delay function___________________________________
  function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // ____Send MQTT messages with delay__________________________
  async function sendRouteWithDelay(aRoute1: string[]): Promise<void> {
    for (const msg of aRoute1) {
      const aMsg = msg.split('/').map(p => p.trim()).filter(p => p.length > 0)
      const topic = topicSet + aMsg[0]
      try {
        await ciMqttClientInstance.publish(topic, aMsg[1], false, 0)
      } catch (e) {
        console.error('Module13: ERROR:', e)
      }
      // wait 0,2 secs------------------------------------------
      await sleep(200)
    }
  }

  // ____turn on route # n______________________________________
  function onClkRouteOn(n: number): void {
    // --prepare cells numbers and color for route # n----------
    const sRouteXY = routesOn.find(p => p.id === n)?.sRouteMxx
    if(!sRouteXY) return
    // console.log('Button clicked:', n + ', sRouteXY=' + sRouteXY)
    routeXm13.value = sRouteXY // for <RCCModule 13 ..>
    color.value = geof.colorRoute // for <RCCModule 13 ..>
    // --get DCC commands (topic + payload) to set route # n----
    const sRouteDcc = routesOn.find(p => p.id === n)?.sRouteDcc
    if(!sRouteDcc) return
    const aRoute1 = sRouteDcc.split(',').map(p => p.trim()).filter(p => p.length > 0)
    // --send MQTT commands to set components for route # n-----
    sendRouteWithDelay(aRoute1)
  }

  // ____turn off route # n_____________________________________
  function onClkRouteOff(n: number): void {
    // --prepare cells numbers and color for route # n----------
    const sRouteXY = routesOff.find(p => p.id === n)?.sRouteMxx
    if(!sRouteXY) return
    // console.log('Button clicked:', n + ', sRouteXY=' + sRouteXY)
    routeXm13.value = sRouteXY // Route for <RCCModule13 ..>
    color.value = '-' //          Color for <RCCModule13 ..>
  }
/*
  // ____waiting for MQTT connection, then get status___________
  watchEffect(() => {
    if (ciMqttClientInstance.mqttState.connected) {
      ciMqttClientInstance.publish(topicGet, 'status', false, 0).catch((e) => { console.error('Module13: ERROR:', e) })
    }
  })
*/
</script>

<!--
<style scoped>
.my-button {
  display: block;
  margin-bottom: 8px;
}
</style>
-->