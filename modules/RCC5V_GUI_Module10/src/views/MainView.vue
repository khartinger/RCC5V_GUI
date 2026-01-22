<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-09: New                                         -->
<!-- 2026-01-15: Improve, add button, set/release a route    -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <RccModule10 :x0="xB" :y0="yB" sid="m10" :border="border" :color="color" :route="routeXm10" />
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
  import { rccMqttClientInstance } from '@/services/RccMqttClientInstance'

  // ***********************************************************
  //     Customize data for the module here
  // ***********************************************************
  import RccModule10, { m10 } from '@/components/RccModule10.vue'
  
  const topicGet = 'rcc/module10/get'
  const topicSet = 'rcc/module10/set/'

  const route1dcc = '101/1,102/1,106/1,103/0,105/0'
  const route1m10 = '0/1,1/1,2/1,3/0,4/0'
  const route2dcc = '101/1,102/1,106/1,103/1,104/1'
  const route2m10 = '0/1,1/1,2/1,3/1,4/1'
  const route3dcc = '101/1,102/1,106/1,104/0,107/1'
  const route3m10 = ' 0/1,1/1,2/1,3/2'

  const routesOn = [
    { id: 1, label: '1', sRouteMxx: route1m10, sRouteDcc: route1dcc },
    { id: 2, label: '2', sRouteMxx: route2m10, sRouteDcc: route2dcc },
    { id: 3, label: '3', sRouteMxx: route3m10, sRouteDcc: route3dcc },
  ]
  const routesOff = [
    { id: 1, label: '1', sRouteMxx: route1m10, sRouteDcc: route1dcc },
    { id: 2, label: '2', sRouteMxx: route2m10, sRouteDcc: route2dcc },
    { id: 3, label: '3', sRouteMxx: route3m10, sRouteDcc: route3dcc },
  ]
  
  // ***********************************************************
  //     Usually the same for all modules
  // ***********************************************************
  
  const border = 1
  const geof = new Geof(0, 0, 1, 1)
  const routeXm10 = ref('') //         Route for <RCCModule10 ..>
  const color = ref(geof.colorNone) // Color for <RCCModule10 ..>
  // ---------width and height of one Element (to make a grid)--
  const xB = 0 // corner top left
  const yB = 0 // corner top left
  const dx = computed(() => geof.dxo()) // x width of a symbol in pixel (80)
  const dy = computed(() => geof.dyo()) // y heighth of a symbol in pixel (60)
  const nx = m10.nx // symbols in x direction
  const ny = m10.ny // symbols in x direction
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
        await rccMqttClientInstance.publish(topic, aMsg[1], false, 0)
      } catch (e) {
        console.error('Module10: ERROR:', e)
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
    routeXm10.value = sRouteXY // for <RCCModule 10 ..>
    color.value = geof.colorRoute // for <RCCModule 10 ..>
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
    routeXm10.value = sRouteXY // Route for <RCCModule10 ..>
    color.value = '-' //          Color for <RCCModule10 ..>
  }
/*
  // ____waiting for MQTT connection, then get status___________
  watchEffect(() => {
    if (rccMqttClientInstance.mqttState.connected) {
      rccMqttClientInstance.publish(topicGet, 'status', false, 0).catch((e) => { console.error('Module10: ERROR:', e) })
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