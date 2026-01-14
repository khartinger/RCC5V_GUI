<!-- RccBlocktester1.vue --------------------khartinger----- -->
<!-- 2026-01-12: new                                         -->
<!-- 2026-01-14: Update, add set/release a route             -->
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
    <rect :x="x0-0.5*dx" :y="y0-0.5*dy" :width="bt1.nx*dx" :height="bt1.ny*dy" stroke="blue" stroke-width="4" fill="none" />
    <text class="ciFont1" :x="x0-0.47*dx" :y="y0-0.27*dy">Blocktester</text>
  </g>
</template>

<script lang="ts">
export const bt1 = {
  nx: 3,
  ny: 3
}
</script>

<script setup lang="ts" name="RccBlocktester1">
  import { computed, toRefs, watchEffect } from 'vue'
  import { Geo } from '../classes/Geo'
  import RccTrack1 from './RccTrack1.vue'
  import RccTrackCon1 from './RccTrackCon1.vue'
  import RccTrackIso1 from './RccTrackIso1.vue'
  import RccTurnout1 from './RccTurnout1.vue'
  import RccTurnout3Way1 from './RccTurnout3Way1.vue'
  import RccUncoupler1 from './RccUncoupler1.vue'
  import { ciMqttClientInstance } from '@/services/CiMqttClientInstance';

  // ____tag name of components (symbols)_______________________
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

  // ____define tracks (position, sid, direction)_______________
  const symbols = [
    // ..row 0..................................................
    { type: 'tk', row: 0, col: 0, sid: 'm00a1', dir: '15' },
    { type: 'tk', row: 0, col: 1, sid: 'm00b1', dir: '58' },
    { type: 'tk', row: 0, col: 2, sid: 'm00c1', dir: '0' },
    // ..row 1..................................................
    { type: 'uc', row: 1, col: 0, sid: 'uc1', dir: '15', f: ' DCC 11' },
    { type: 'tk', row: 1, col: 1, sid: 'm00b2', dir: '15' },
    { type: 'tt', row: 1, col: 2, sid: 'tt031', dir: '4', h: 'DCC 32 ', ha: 'R', f: 'DCC 31 ', fa: 'R' },
    // ..row 2..................................................
    { type: 'tk', row: 2, col: 0, sid: 'm00a3', dir: '15' },
    { type: 'to', row: 2, col: 1, sid: 'to021', dir: '1L', f: ' DCC 21' },
    { type: 'tk', row: 2, col: 2, sid: 'tk1', dir: '15', f: 'DCC 41', fa: 'C' },
    // ..special symbols (connector, isolator)..................
    { type: 'tc',  row: 0.5, col: 1.5, sid: 'con0', dir: '8' },
    { type: 'tc',  row: 1.5, col: 1.5, sid: 'con0', dir: '2' },
    { type: 'ti',  row: 2, col: 1.5, sid: 'iso0', dir: '1' }
  ]

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

  // ____waiting for MQTT connection, then get status___________
  watchEffect(() => {
    if(ciMqttClientInstance.mqttState.connected) {
      ciMqttClientInstance.publish('rcc/demo1/get', 'status', false, 0).catch((e) => { console.error('RccBlocktester1: ERROR:', e) })
    }
  })
</script>

