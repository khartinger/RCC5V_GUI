<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-09: New                                         -->
<!-- 2026-01-17: Improve, add button, set/release a route    -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <RccModule13 :x0="0*dx" :y0="0*dy" sid="m13" :border="border" :color="color" :route="routeXmcr['m13']"/>
    <RccModule12 :x0="(m13.nx)*dx" :y0="0*dy" sid="m12" :border="border" :color="color" :route="routeXmcr['m12']"/>
    <RccModule11 :x0="(m13.nx+m12.nx)*dx" :y0="0*dy" sid="m11" :border="border" :color="color" :route="routeXmcr['m11']"/>
    
    <RccModule01 :x0="1*dx" :y0="(1+m13.ny)*dy" sid="m01" :border="border" :color="color" :route="routeXmcr['m01']"/>
    <RccModule14 :x0="(1+m01.nx)*dx" :y0="(1+m13.ny)*dy" sid="m14" :border="border" :color="color" :route="routeXmcr['m14']" />
    <RccModule10 :x0="(1+m01.nx+m14.nx)*dx" :y0="(1+m13.ny)*dy" sid="m10" :border="border" :color="color" :route="routeXmcr['m10']" />
   </svg>
<br>
<table><tr><td>
<br>
<button
  v-for="p in routesOn"
  :key="p.button"
  @click="onClkRouteOn(p.button)"
  class="my-button"
> Weichenstraße {{ p.label }} durchschalten
</button><br>
</td><td>
<br>
  <button
  v-for="p in routesOff"
  :key="p.button"
  @click="onClkRouteOff(p.button)"
  class="my-button"
> Weichenstraße {{ p.label }} aufl&ouml;sen
</button><br>
</td><td>
  <button @click="onClkTracksOn()" class="my-button">Alle abschaltbaren Gleise EINschalten</button>
  <button @click="onClkTracksOff()" class="my-button">Alle abschaltbaren Gleise AUSschalten</button>
</td></tr></table>
</template>

<script setup lang="ts">
  import { ref, computed, reactive, watchEffect } from 'vue'
  import { Geof } from '../classes/Geo'
  import { rccMqttClientInstance } from '@/services/RccMqttClientInstance'
  import { rccTrack1Controller } from '../controller/RccTrack1Controller'
  
  // ***********************************************************
  //     Customize data for the module here
  // ***********************************************************
  import RccModule13, { m13 } from '@/components/RccModule13.vue'
  import RccModule12, { m12 } from '@/components/RccModule12.vue'
  import RccModule11, { m11 } from '@/components/RccModule11.vue'
  import RccModule01, { m01 } from '@/components/RccModule01.vue'
  import RccModule14, { m14 } from '@/components/RccModule14.vue'
  import RccModule10, { m10 } from '@/components/RccModule10.vue'

  const route1mcr = reactive({
    m13: '1/0,2/1',
    m12: '0/1,1/0,2/0,3/1',
    m11: '0/1,1/1,2/1',
    m01: '0/1,1/1',
    m14: '0/1,1/1',
    m10: '0/1,1/0'
  })

  const route1dcc = reactive({
    m13: 'rcc/module13/set 132:0',
    m12: 'rcc/module12/set 121:0,123:0,125:1,128:0',
    m11: 'rcc/module11/set 111:1',
    m01: 'rcc/module01/set 012:0',
    m14: 'rcc/module14/set 141:1',
    m10: 'rcc/module10/set 101:0'
  })

  const route2mcr = reactive({
    m13: '1/2,2/1',
    m12: '0/1,1/1,2/1,3/1',
    m11: '0/1,1/1,2/1',
    m01: '0/1,1/1',
    m14: '0/1,1/1',
    m10: '0/1,1/2'
  })

  const route2dcc = reactive({
    m13: 'rcc/module13/set 131:0',
    m12: 'rcc/module12/set 121:1,122:1,123:1,126:1,128:1',
    m11: 'rcc/module11/set 111:1',
    m01: 'rcc/module01/set 012:0',
    m14: 'rcc/module14/set 141:1',
    m10: 'rcc/module10/set 102:0'
  })

  //_____assign route to button_________________________________
  const routesOn = [
    { button: 1, label: '1', aRouteMcr: route1mcr, aRouteDcc: route1dcc },
    { button: 2, label: '2', aRouteMcr: route2mcr, aRouteDcc: route2dcc },
  ]
  const routesOff = [
    { button: 1, label: '1', aRouteMcr: route1mcr, aRouteDcc: route1dcc },
    { button: 2, label: '2', aRouteMcr: route2mcr, aRouteDcc: route2dcc },
  ]

  // ***********************************************************
  //     Usually the same for all modules
  // ***********************************************************
  const routeXmcr = ref(route1mcr) // aktive Route
  const geof = new Geof(0, 0, 1, 1)
  const color = ref(geof.colorNone)
  const border = 1
  // ---------width and height of one Element (to make a grid)--
  const xB = 0 // corner top left
  const yB = 0 // corner top left
  const dx = computed(() => geof.dxo()) // x width of a symbol in pixel (80)
  const dy = computed(() => geof.dyo()) // y heighth of a symbol in pixel (60)
  const nx = m13.nx + m12.nx + m11.nx //   symbols in x direction
  const ny = 1 + 2 * m13.ny //             symbols in x direction
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
  // e.g. topicSet rcc/module12/set, sRouteDcc 121:0,123:1,125:1,128:0
  async function sendModuleRouteWithDelay(topicSet: string, sRouteDcc: string): Promise<void> {
    // -------1. separate individual commands-------------------
    const aCmds = sRouteDcc.split(',').map(p => p.trim()).filter(Boolean)
    for (const cmd of aCmds) {
      // -----2. separate DCC and Payload-----------------------
      const [sDcc, sPayload] = cmd.split(':').map(p => p.trim())
      if (!sDcc || !sPayload) {
        console.warn('Wrong command:', cmd)
        continue
      }
      // -----3. build topic------------------------------------
      const topic = `${topicSet}/${sDcc}`
      // -----4. try to send MQTT message-----------------------
      try {
        await rccMqttClientInstance.publish(topic, sPayload, false, 0)
      } catch (e) {
        console.error(topic + ': ERROR:', e)
      }
      // -----5. wait 0,2 seconds-------------------------------
      await sleep(200)
    }
  }

  // ____turn on route # n______________________________________
  function onClkRouteOn(n: number): void {
    // -------1. prepare cells numbers and color for route # n--
    const aRouteXmcrN = routesOn.find(p => p.button === n)?.aRouteMcr
    if(!aRouteXmcrN) {
     console.warn('Column/row data for route', n, 'is missing!')
     return
    }
    color.value = geof.colorRoute
    routeXmcr.value = aRouteXmcrN
    // -------2. prepare DCC-commands of route n for sending----
    const aRouteXdccN = routesOn.find(p => p.button === n)?.aRouteDcc
    if(!aRouteXdccN) {
     console.warn('DCC-commands for route', n, 'is missing!')
     return
    }
    // -------3. send topic and DCC message string--------------
    for (const [key, value] of Object.entries(aRouteXdccN)) {
      //console.log('onClkRouteOn: key =', key, 'value =', value)
      const aRouteDcc = value.split(' ')
      const sTopicSet = aRouteDcc[0]
      const sDcc = aRouteDcc[1]
      sendModuleRouteWithDelay(sTopicSet, sDcc)
    }
  }

  // ____turn off route # n_____________________________________
  function onClkRouteOff(n: number): void {
    // --1. prepare cells numbers and color for route # n-------
    const aRouteXmcrN = routesOn.find(p => p.button === n)?.aRouteMcr
    if(!aRouteXmcrN) {
     console.warn('Column/row data for route', n, 'is missing!')
     return
    }
    color.value = geof.colorNone
    routeXmcr.value = aRouteXmcrN
  }

  // _________on click: turn ALL track energy ON________________
  const onClkTracksOn = async (): Promise<void> => {
    console.log('Button-Click onClkTracksOn')
    await rccTrack1Controller.sendAllTracksOn()
  }

  // _________on click: turn ALL track energy OFF_______________
  const onClkTracksOff = async (): Promise<void> => {
    console.log('Button-Click onClkTracksOff')
    await rccTrack1Controller.sendAllTracksOff()
  }
</script>
