<!-- ----ShortCuts.vue-----------------------khartinger----- -->
<!-- 2026-01-13: New                                         -->
<template>
  <svg width="100%" viewBox="0 0 300 10">
    <rect class="ciBackground" x="0" y="0" width="300" height="10" />
<!--
    <rect @click="onClkTracksOn()" fill="blue" :x="250" :y="5" :width="100" :height="20" />
    <text class="ciFont1" :x="10" :y="15">svg: RCC5V_GUI_ShortCuts</text>
-->
  </svg>

  <div>
    <h2>RCC5V_GUI_Layout1: ShortCuts</h2>
  </div>
  <div align="left">
    <button @click="onClkTracksOn()">Alle abschaltbaren Gleise EINschalten</button><br>
    <br>
    <button @click="onClkTracksOff()">Alle abschaltbaren Gleise AUSschalten</button><br>
    <br>
    <button @click="onClkTrackRoute1()">Weichenstraße 1 setzen</button><br>
  </div>
  <div class="about">
    <hr>
    Autor: DI Karl Hartinger<br>
    Version: 2026-01-13<br>
  </div>
</template>

<script setup lang="ts">
import { rccTrack1Controller } from '../controller/RccTrack1Controller'
import RccModule13, { m13 } from '@/components/RccModule13.vue'

// ______on click: turn ALL track energy ON_____________________
const onClkTracksOn = async (): Promise<void> => {
  console.log('Button-Click onClkTracksOn')
  await rccTrack1Controller.sendAllTracksOn()
}

// ______on click: turn ALL track energy OFF____________________
const onClkTracksOff = async (): Promise<void> => {
  console.log('Button-Click onClkTracksOff')
  await rccTrack1Controller.sendAllTracksOff()
}


// ______on click: turn ALL track energy OFF____________________
const onClkTrackRoute1 = async (): Promise<void> => {
  console.log('Button-Click onClkTrackRoute1')
  
  // await rccTrack1Controller.sendAllTracksOff()
}

</script>
