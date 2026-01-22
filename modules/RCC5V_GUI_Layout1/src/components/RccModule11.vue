<!-- RccModule11.vue ------------------------khartinger----- -->
<!-- 2026-01-12: new                                         -->
<!-- 2026-01-15: Update, add set/release a route             -->
<template>
  <g v-for="symbol in symbols" :key="symbol.sid">
    <!-- Draw all symbols (components) of this module ------ -->
    <component
      :is="getComponent(symbol.type)"
      :x="x0 + symbol.col * dx"
      :y="y0 + symbol.row * dy"
      :sid="symbol.sid"
      :dir="symbol.dir"
      :border="border"
      :header="symbol.h"
      :headeralign="symbol.ha"
      :footer="symbol.f"
      :footeralign="symbol.fa"
      :color="getColor2(symbol.col, symbol.row, aRoute, color)"
    />
  </g>
  <g>
    <!-- Border around module and module name -------------- -->
    <rect :x="x0-0.5*dx" :y="y0-0.5*dy" :width="m11.nx*dx" :height="m11.ny*dy" stroke="blue" stroke-width="4" fill="none" />
    <text class="ciFont1" :x="x0-0.47*dx" :y="y0-0.27*dy">Module 11</text>
  </g>
</template>

  <!-- *********************************************************
         Customize data for the module here
  ********************************************************** -->

<!-- 1. export module size --------------------------------- -->
<script lang="ts">
export const m11 = {
  nx: 3,
  ny: 3
}
</script>

<!-- 2. Module name and import of railway components ------- -->
<script setup lang="ts" name="RccModule11">
  import { computed, toRefs, watchEffect } from 'vue'
  import { Geo } from '../classes/Geo'
  import RccTrack1 from './RccTrack1.vue'
  import RccTrackCon1 from './RccTrackCon1.vue'
  import RccTrackIso1 from './RccTrackIso1.vue'
  import RccTurnout1 from './RccTurnout1.vue'
  import RccTurnout3Way1 from './RccTurnout3Way1.vue'
  import RccUncoupler1 from './RccUncoupler1.vue'
  import { rccMqttClientInstance } from '@/services/RccMqttClientInstance';

  // ____3. Assignment of abbreviations to railway components___
  // e.g., “tk” to RccTrack1
  function getComponent(type: string) {
    switch (type) {
      case 'tk': return RccTrack1
      case 'to': return RccTurnout1
      case 'tt': return RccTurnout3Way1
      case 'uc': return RccUncoupler1
      case 'tc': return RccTrackCon1
      case 'ti': return RccTrackIso1
      default:
        return RccTrackCon1
    }
  }

  // ____4. Symbol type, position (col, row), and call parameters
  //     of the railway component symbol (sid, direction, ...)
  const symbols = [
    // ..row 0..................................................
    { type: 'uc', row: 0, col: 0, sid: 'uc113', dir: '15',  f: '113 [OFF]', fa: 'C' },
    { type: 'tk', row: 0, col: 1, sid: 'tk112', dir: '58', h: '[ON]', ha: 'R', f: '112 [OFF]', fa: 'L' },
    { type: 'tk', row: 0, col: 2, sid: 'm11c0', dir: '0' },
    // ..row 1..................................................
    { type: 'tk', row: 1, col: 0, sid: 'm11a2', dir: '15' },
    { type: 'tk', row: 1, col: 1, sid: 'm11b2', dir: '15' },
    { type: 'to', row: 1, col: 2, sid: 'to111', dir: '5R',  h: '111 ', ha: 'R' },
    // ..row 2..................................................
    { type: 'tk', row: 2, col: 0, sid: 'm11a3', dir: '0' },
    { type: 'tk', row: 2, col: 1, sid: 'm11b3', dir: '0' },
    { type: 'tk', row: 2, col: 2, sid: 'm11c3', dir: '0' },
    // ..special symbols (connector, isolator)..................
    { type: 'ti', row: 0.5, col: 1.5, sid: 'iso0', dir: '8' },
   ]

  // ____5. Waiting for MQTT connection, then get module status_
  // Customize topic!
  watchEffect(() => {
    if(rccMqttClientInstance.mqttState.connected) {
      rccMqttClientInstance.publish('rcc/module11/get', 'status', false, 0).catch((e) => { console.error('RccModule11: ERROR:', e) })
    }
  })

  // ***********************************************************
  //     Usually the same for all modules
  // ***********************************************************

  // ____Width and height of one Element (to make a grid)_______
  const geo = new Geo(0, 0)
  const dx = computed(() => geo.dxo())
  const dy = computed(() => geo.dyo())

  // ____input parameter for this module________________________
  const props = withDefaults(defineProps<{
    x0: number
    y0: number
    sid: string
    border?: number
    route?: string
    color?: string
  }>(),{
    route: '',
    color: '-',
    border: 1,
  })

  // ____split route to array aRoute____________________________
  const aRoute = computed<string[]>(() => {
    const aRoute_= props.route.split(',').map(p => p.trim()).filter(p => p.length > 0)
    // console.log('aRoute_=',aRoute_)
    return aRoute_
  })

  // ____color for a module_____________________________________
  function getColor2(col_: number, row_: number, aRoute_: string[], color: string): string {
    const s1=col_+'/'+row_
    const c2 = aRoute_.includes(s1) ? color : '-'
    // console.log('getColor2: s1=', s1 + ', route=' + route +  ' => c2=' + c2)
    return c2
  }
</script>

