<!-- ----MainView.vue------------------------khartinger----- -->
<!-- 2026-01-09: New                                         -->
<!-- 2026-01-14: Update, add set/release a route             -->
<template>
  <svg width="100%" :viewBox="viewbox">
    <rect class="ciBackground" :x="x1" :y="y1" :width="w1" :height="h1" />
    <RccBlocktester1 :x0="xB" :y0="yB" sid="bt1" :border="border" :color="color" :path="pathXm00" />
  </svg>
<br>
<table><tr><td>
<button
  v-for="p in pathsOn"
  :key="p.id"
  @click="onClkPathOn(p.id)"
  class="my-button"
> Weichenstraße {{ p.label }} durchschalten
</button><br>
</td><td>
<button
  v-for="p in pathsOff"
  :key="p.id"
  @click="onClkPathOff(p.id)"
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
  const pathXm00 = ref('')    // Path für RccBlocktester1
  const color = ref('-')      // Color für RccBlocktester1
  const colorPath='#88BBFF'

  const path1dcc = '32/0'
  const path1m00 = ' 0/0,1/0, 1.5/0.5, 2/1'
  const path2dcc = '31/1, 32/1'
  const path2m00 = '0/1,1/1,2/1'
  const path3dcc = '21/1,41/1'
  const path3m00 = '0/2, 1/2, 2/2'

  const pathsOn = [
    { id: 1, label: '1', sPathMxx: path1m00, sPathDcc: path1dcc },
    { id: 2, label: '2', sPathMxx: path2m00, sPathDcc: path2dcc },
    { id: 3, label: '3', sPathMxx: path3m00, sPathDcc: path3dcc }
  ]
  const pathsOff = [
    { id: 1, label: '1', sPathMxx: path1m00, sPathDcc: path1dcc },
    { id: 2, label: '2', sPathMxx: path2m00, sPathDcc: path2dcc },
    { id: 3, label: '3', sPathMxx: path3m00, sPathDcc: path3dcc }
  ]

  // ____turn on path # n_______________________________________
  function onClkPathOn(n: number): void {
    // --cells to collor----------------------------------------
    const sPathXY = pathsOn.find(p => p.id === n)?.sPathMxx
    if(!sPathXY) return
    // console.log('Button clicked:', n + ', sPathXY=' + sPathXY)
    pathXm00.value = sPathXY // for <RCCBlocktester ..>
    color.value = colorPath  // for <RCCBlocktester ..>
    // --get dcc commands (topic + payload)---------------------
    const sPathDcc = pathsOn.find(p => p.id === n)?.sPathDcc
    if(!sPathDcc) return
    const aPath1 = sPathDcc.split(',').map(p => p.trim()).filter(p => p.length > 0)
    aPath1.forEach(msg => {
      const aMsg = msg.split('/').map(p => p.trim()).filter(p => p.length > 0)
      const topic='rcc/demo1/set/'+aMsg[0]
      ciMqttClientInstance.publish(topic, aMsg[1], false, 0).catch((e) => { console.error('RccBlocktester1: ERROR:', e) })
    });
  }

  // ____turn off path # n_______________________________________
  function onClkPathOff(n: number): void {
    // --cells to collor----------------------------------------
    const sPathXY = pathsOff.find(p => p.id === n)?.sPathMxx
    if(!sPathXY) return
    // console.log('Button clicked:', n + ', sPathXY=' + sPathXY)
    pathXm00.value = sPathXY // for <RCCBlocktester ..>
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