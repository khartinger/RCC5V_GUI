<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-09: New                                         -->
<!-- 2026-01-14: Update, add set/release a route             -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <RccBlocktester1 :x0="xB" :y0="yB" sid="bt1" :border="border" :color="color" :route="routeXm00" />
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
  import RccBlocktester1, { bt1 } from '@/components/RccBlocktester1.vue'
  const border = 1
  const routeXm00 = ref('')    // Route für RccBlocktester1
  const color = ref('-')      // Color für RccBlocktester1
  const colorRoute='#88BBFF'

  const route1dcc = '32/0'
  const route1m00 = ' 0/0,1/0, 1.5/0.5, 2/1'
  const route2dcc = '31/1, 32/1'
  const route2m00 = '0/1,1/1,2/1'
  const route3dcc = '21/1,41/1'
  const route3m00 = '0/2, 1/2, 2/2'

  const routesOn = [
    { id: 1, label: '1', sRouteMxx: route1m00, sRouteDcc: route1dcc },
    { id: 2, label: '2', sRouteMxx: route2m00, sRouteDcc: route2dcc },
    { id: 3, label: '3', sRouteMxx: route3m00, sRouteDcc: route3dcc }
  ]
  const routesOff = [
    { id: 1, label: '1', sRouteMxx: route1m00, sRouteDcc: route1dcc },
    { id: 2, label: '2', sRouteMxx: route2m00, sRouteDcc: route2dcc },
    { id: 3, label: '3', sRouteMxx: route3m00, sRouteDcc: route3dcc }
  ]

  // ____turn on route # n______________________________________
  function onClkRouteOn(n: number): void {
    // --cells to collor----------------------------------------
    const sRouteXY = routesOn.find(p => p.id === n)?.sRouteMxx
    if(!sRouteXY) return
    // console.log('Button clicked:', n + ', sRouteXY=' + sRouteXY)
    routeXm00.value = sRouteXY // for <RCCBlocktester ..>
    color.value = colorRoute  // for <RCCBlocktester ..>
    // --get dcc commands (topic + payload)---------------------
    const sRouteDcc = routesOn.find(p => p.id === n)?.sRouteDcc
    if(!sRouteDcc) return
    const aRoute1 = sRouteDcc.split(',').map(p => p.trim()).filter(p => p.length > 0)
    aRoute1.forEach(msg => {
      const aMsg = msg.split('/').map(p => p.trim()).filter(p => p.length > 0)
      const topic='rcc/demo1/set/'+aMsg[0]
      ciMqttClientInstance.publish(topic, aMsg[1], false, 0).catch((e) => { console.error('RccBlocktester1: ERROR:', e) })
    });
  }

  // ____turn off route # n_____________________________________
  function onClkRouteOff(n: number): void {
    // --cells to collor----------------------------------------
    const sRouteXY = routesOff.find(p => p.id === n)?.sRouteMxx
    if(!sRouteXY) return
    // console.log('Button clicked:', n + ', sRouteXY=' + sRouteXY)
    routeXm00.value = sRouteXY // for <RCCBlocktester ..>
    color.value = '-'        // for <RCCBlocktester ..>
  }

  // ____waiting for MQTT connection, then get status___________
  watchEffect(() => {
    if (ciMqttClientInstance.mqttState.connected) {
      ciMqttClientInstance.publish('rcc/demo1/get', 'status', false, 0).catch((e) => { console.error('RccBlocktester1: ERROR:', e) })
    }
  })

  // ---------width and height of one Element (to make a grid)--
  const xB = 0 // corner top left
  const yB = 0 // corner top left
  const geof = new Geof(0, 0, 1, 1)
  const dx = computed(() => geof.dxo()) // x width of a symbol in pixel (80)
  const dy = computed(() => geof.dyo()) // y heighth of a symbol in pixel (60)
  const nx = bt1.nx // symbols in x direction
  const ny = bt1.ny // symbols in x direction
  const x1 = computed(() => (-dx.value/2 - 2)) //   x coordinates top left corner
  const y1 = computed(() => (-dy.value/2 - 2)) //   y coordinates top left corner
  const w1 = computed(() => (nx * dx.value + 4)) // viewbox width in pixel
  const h1 = computed(() => ((ny + 0) * dy.value + 4))  // viewbox height in pixel
  const viewbox = computed(() => [x1.value, y1.value, w1.value, h1.value].join(" "))
</script>

<style scoped>
.my-button {
  display: block;
  margin-bottom: 8px;
}
</style>