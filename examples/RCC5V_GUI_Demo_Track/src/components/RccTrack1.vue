<!-- RccTrack1.vue --------------------------khartinger----- -->
<!-- 2026-01-22: new                                         -->

<template>
  <g>
  <!--draw border------------------------------------------- -->
  <RccBase :x="x" :y="y" :border="border" :fx="1" :fy="1"></RccBase>
  <!--draw a horizontal line-------------------------------- -->
  <line v-if="(drawLabel & 4) > 0" :x1="geof.x0()" :y1="geof.y" :x2="geof.x3()" :y2="geof.y" :stroke="geof.colorTrackInfo" stroke-width="1" />
  <!--write text-------------------------------------------- -->
  <text v-if="(drawLabel & 1) > 0 && (iLines>0)" :x="geof.xt()" :y="geof.ytHeader()" class="ciFont0" :font-size="geof.fh" :fill="geof.colorTrackInfo">{{lineHeader}}</text>
  <text v-if="(drawLabel &16) > 0 && (iLines>1)" :x="geof.xt()" :y="geof.ytFooter()" class="ciFont0" :font-size="geof.fh" :fill="geof.colorTrackInfo">{{lineFooter}}</text>

  <!--draw track1------------------------------------------- -->
  <path :d="drawTrack1" :fill="colorTrack" :stroke="colorTrack" stroke-width="1" />

  <RccTrackCon1 v-if="conB" :x="conX" :y="conY" sid="con0" :dir="con" :color="colorTrack"></RccTrackCon1>

  <!--define click area------------------------------------- -->
  <path :d="pathTop" @click="onClkTop()" class="ciClick"/>
  <path :d="pathBottom" @click="onClkBottom()" class="ciClick"/>
<!--
  <rect @click="onClkTop()" class="ciClick" :x="geof.x0()" :y="geof.y0()" :width="geof.dxo()" :height="geof.dyo2()" />
  <rect @click="onClkBottom()" class="ciClick" :x="geof.x0()" :y="geof.y" :width="geof.dxo()" :height="geof.dyo2()" />
  -->
</g>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Track1, rccTrack1Controller } from '../controller/RccTrack1Controller'
import RccBase from './RccBase.vue'
import { Geof } from '../classes/Geo'

import RccTrackCon1 from './RccTrackCon1.vue'

export default defineComponent({
  name: 'RccTrack1',
  components: {
    RccBase,
    RccTrackCon1,
  },
  data () {
    return {
      fw: 1 as number,
    }
  },
  props: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    dir: {
      type: String,
      required: true,
    },
    border: {
      type: Number,
      required: false,
      default: 0,
    },
    sid: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
      default: '0',
    },
    color: {
      type: String,
      required: false,
      default: '-',
    },
    con: {
      type: String,
      required: false,
      default: '-',
    },
    header: {
      type: String,
      required: false,
      default: '',
    },
    footer: {
      type: String,
      required: false,
      default: '',
    },
    headeralign: {
      type: String,
      required: false,
      default: 'L',
    },
    footeralign: {
      type: String,
      required: false,
      default: 'L',
    },
  },
  computed: {
    // =======standard methods==================================
    // _______find track1 object to given sid___________________
    track1: function (): Track1 | undefined {
      return rccTrack1Controller.tracks1.find(track1 => track1.id === this.sid)
    },
    // _______get iTrack1State__________________________________
    iTrack1State: function (): number {
      return this.track1?.iTrack1State ?? -1
    },
    // _______provide geometric data____________________________
    geof: function (): Geof {
      const geo1 = new Geof(this.x, this.y, 1, 1)
      return geo1
    },
    // _______number of displayed lines_________________________
    iLines: function (): number {
      return this.geof.linesmax()
    },
    // _______draw a horizontal middle line or not______________
    drawLabel: function (): number {
      const label_ = '' + this.label
      let ret = 0 // 0 = label off
      if (label_ === '1' || label_ === 'on') ret |= 4 // x-axis
      if (label_ === '2' || label_ === 'text') { // header, footer
        ret |= 1
        ret |= 16
      }
      if (label_ === '3' || label_ === 'on2') { // x-axis + header, footer
        ret |= 1
        ret |= 4
        ret |= 16
      }
      if (this.header.length > 0) ret |= 1
      if (this.footer.length > 0) ret |= 16
      // console.log('drawXAxis: xAxis=', this.xAxis + ' ret=' + String(ret))
      return ret
    },
    // _______convert dir string to number______________________
    dirNum: function (): number {
      // -----Break down direction "dir" into digits-------------
      const aDigits = this.dir.split('').reverse()
      let z1_ = 0
      let z2_ = 0
      if (aDigits.length === 1) z2_ = Number(aDigits[0])
      if (aDigits.length > 1) {
        z1_ = Number(aDigits[0])
        z2_ = Number(aDigits[1])
      }
      // -----order digits: z1_ < z2_---------------------------
      if (z1_ === z2_) z1_ = 0
      const temp_ = z2_
      if (z1_ > z2_) { z2_ = z1_; z1_ = temp_ }
      return z1_ * 10 + z2_
    },
    // _______draw the full path of the track (attribute dir)___
    drawTrack1: function (): string {
      const pathNr = this.dirNum
      if (pathNr === 0) return '' // nothing to draw
      // -----draw path-----------------------------------------
      const s1 = this.trackPath(pathNr)
      // console.log('drawTrack1: s1=', s1)
      return s1
    },
    // _______color of the track________________________________
    colorTrack: function (): string {
      if (this.color.length > 2) return this.color
      if (this.iTrack1State === 0) return this.geof.colorTrackOff
      if (this.iTrack1State === 1) return this.geof.colorTrackOn
      if (this.iTrack1State === 2) return this.geof.colorTrackUsed
      if (this.iTrack1State === -99) return this.geof.colorTrackUnknown
      return this.geof.colorTrack
    },
    // _______text in line 1 (top)______________________________
    lineHeader: function (): string {
      if (this.header.length > 0) {
        const a1 = String(this.headeralign).toUpperCase().charAt(0)
        if (a1 === 'C' || a1 === 'M') return this.geof.center(this.header)
        if (a1 === 'R') return this.geof.right(this.header)
        return this.header
      }
      return this.geof.center(this.geof.textTrackOn)
    },
    // _______text in line 5 (bottom)___________________________
    lineFooter: function (): string {
      if (this.footer.length > 0) {
        const a1 = String(this.footeralign).toUpperCase().charAt(0)
        if (a1 === 'C' || a1 === 'M') return this.geof.center(this.footer)
        if (a1 === 'R') return this.geof.right(this.footer)
        return this.footer
      }
      return this.geof.center(this.geof.textTrackOff)
    },
    // =======connector specific functions======================
    // _______draw a connector?_________________________________
    conB: function (): boolean {
      if (this.con.length > 0) {
        if (this.dir.includes(this.con)) return true
      }
      return false
    },
    // _______x-position of connector___________________________
    conX: function (): number {
      if (this.con === '2' || this.con === '8') return this.x + this.geof.dxo2()
      if (this.con === '4' || this.con === '6') return this.x - this.geof.dxo2()
      return this.x
    },
    // _______y-position of connector___________________________
    conY: function (): number {
      if (this.con === '2' || this.con === '4') return this.y - this.geof.dyo2()
      if (this.con === '6' || this.con === '8') return this.y + this.geof.dyo2()
      return this.y
    },
    // _______path of top click area____________________________
    pathTop: function (): string {
      const dxo = this.geof.dxo()
      const dyo = this.geof.dyo()
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      let s1 = ' M' + this.x + ',' + this.y
      switch (this.dirNum) {
        case 4: case 14: case 46:
          s1 += ' h' + dxo2
          s1 += ' v' + (-dyo2)
          s1 += ' h' + (-dxo)
          s1 += ' z'
          break
        case 6: case 16:
          s1 += ' h' + dxo2
          s1 += ' v' + (-dyo2)
          s1 += ' h' + (-dxo)
          s1 += ' v' + (dyo)
          s1 += ' z'
          break
        case 24:
          s1 += ' l' + dxo2 + ',' + (-dyo2)
          s1 += ' h' + (-dxo)
          s1 += ' z'
          break
        case 26:
          s1 += ' l' + dxo2 + ',' + (-dyo2)
          s1 += ' h' + (-dxo)
          s1 += ' v' + (dyo)
          s1 += ' z'
          break
        case 2: case 25: case 28:
          s1 += ' l' + dxo2 + ',' + (-dyo2)
          s1 += ' h' + (-dxo)
          s1 += ' v' + (dyo2)
          s1 += ' z'
          break
        case 8: case 58:
          s1 += ' l' + dxo2 + ',' + (dyo2)
          s1 += ' v' + (-dyo)
          s1 += ' h' + (-dxo)
          s1 += ' v' + (dyo2)
          s1 += ' z'
          break
        case 48:
          s1 += ' l' + dxo2 + ',' + dyo2
          s1 += ' v' + (-dyo)
          s1 += ' h' + (-dxo)
          s1 += ' z'
          break
        case 68:
          s1 += ' l' + dxo2 + ',' + dyo2
          s1 += ' v' + (-dyo)
          s1 += ' h' + (-dxo)
          s1 += ' v' + (dyo)
          s1 += ' z'
          break
        default:
          s1 += ' h' + dxo2
          s1 += ' v' + (-dyo2)
          s1 += ' h' + (-dxo)
          s1 += ' v' + (dyo2)
          s1 += ' z'
          break
      }
      return s1
    },
    // _______path of bottom click area_________________________
    pathBottom: function (): string {
      const dxo = this.geof.dxo()
      const dyo = this.geof.dyo()
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      let s1 = ' M' + this.x + ',' + this.y
      switch (this.dirNum) {
        case 4: case 14: case 46:
          s1 += ' h' + dxo2
          s1 += ' v' + (dyo2)
          s1 += ' h' + (-dxo)
          s1 += ' v' + (-dyo)
          s1 += ' z'
          break
        case 6: case 16:
          s1 += ' h' + dxo2
          s1 += ' v' + (dyo2)
          s1 += ' h' + (-dxo)
          s1 += ' z'
          break
        case 24:
          s1 += ' l' + dxo2 + ',' + (-dyo2)
          s1 += ' v' + (dyo)
          s1 += ' h' + (-dxo)
          s1 += ' v' + (-dyo)
          s1 += ' z'
          break
        case 26:
          s1 += ' l' + dxo2 + ',' + (-dyo2)
          s1 += ' v' + (dyo)
          s1 += ' h' + (-dxo)
          s1 += ' z'
          break
        case 2: case 25: case 28:
          s1 += ' l' + dxo2 + ',' + (-dyo2)
          s1 += ' v' + (dyo)
          s1 += ' h' + (-dxo)
          s1 += ' v' + (-dyo2)
          s1 += ' z'
          break
        case 8: case 58:
          s1 += ' l' + dxo2 + ',' + (dyo2)
          s1 += ' h' + (-dxo)
          s1 += ' v' + (-dyo2)
          s1 += ' z'
          break
        case 48:
          s1 += ' l' + dxo2 + ',' + dyo2
          s1 += ' h' + (-dxo)
          s1 += ' v' + (-dyo)
          s1 += ' z'
          break
        case 68:
          s1 += ' l' + dxo2 + ',' + dyo2
          s1 += ' h' + (-dxo)
          s1 += ' z'
          break
        default:
          s1 += ' h' + dxo2
          s1 += ' v' + (dyo2)
          s1 += ' h' + (-dxo)
          s1 += ' v' + (-dyo2)
          s1 += ' z'
          break
      }
      return s1
    },
  },
  methods: {
    // _______path command: draw a track________________________
    trackPath: function (dir1: number): string {
      // -----(positive) values of line length------------------
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      const tk0x = -this.geof.tk.value[0].x
      const tk0y = -this.geof.tk.value[0].y
      const tk2 = this.geof.tk2
      const tkax = dxo2 - tk0x
      const tkbx = dxo2 + tk0x
      const tkcx = dxo2 - this.geof.tk.value[4].x
      const tkcy = dyo2 + this.geof.tk.value[5].y
      const tk58x = dxo2 - this.geof.tk.value[8].x
      const tk58y = dyo2 - tkcy + this.geof.tk.value[8].y
      const tk59x = this.geof.dxo() - tkbx
      const tk59y = dyo2 - tkcy + tk0y
      const tkdy = tk0x + tk0y
      // -----used by symbol "end of track"---------------------
      const tks = tk2 / 2
      const w = Math.sqrt(dxo2 * dxo2 + dyo2 * dyo2)
      const tks4 = dxo2 * tks / w
      const tks3 = dyo2 * tks / w

      let s1 = ' M' + this.x + ',' + this.y
      switch (dir1) {
        case 1: // ----- x+ direction---------------------------
          s1 += ' m' + '0,' + (-tk0y) // Tk0
          s1 += ' v' + (2 * tk0y)
          s1 += ' h' + dxo2
          s1 += ' v' + (-2 * tk0y)
          s1 += ' z'
          break
        case 2: // ----- / (up) direction-----------------------
          s1 += ' m' + (-this.geof.tk.value[8].x) + ',' + (-this.geof.tk.value[8].y) // Tk8´
          s1 += ' l' + (2 * this.geof.tk.value[8].x) + ',' + (2 * this.geof.tk.value[8].y) // Tk8
          s1 += ' l' + tk58x + ',' + (-tk58y) // Tk5
          s1 += ' v' + (-tkcy)
          s1 += ' h' + (-tkcx)
          s1 += ' z'
          break
        case 3: // ----- ! (up) direction-----------------------
          s1 += ' m' + (-this.geof.tk2) + ',' + (-dyo2) // Tk0
          s1 += ' v' + dyo2
          s1 += ' h' + (2 * this.geof.tk2)
          s1 += ' v' + (-dyo2)
          s1 += ' z'
          break
        case 4: // ----- \ (up) direction-----------------------
          s1 += ' m' + (this.geof.tk.value[8].x) + ',' + (-this.geof.tk.value[8].y) // Tk8´
          s1 += ' l' + (-2 * this.geof.tk.value[8].x) + ',' + (2 * this.geof.tk.value[8].y) // Tk8
          s1 += ' l' + (-tk58x) + ',' + (-tk58y) // Tk5
          s1 += ' v' + (-tkcy)
          s1 += ' h' + (tkcx)
          s1 += ' z'
          break
        case 5: // ----- x- direction---------------------------
          s1 += ' m' + (-dxo2) + ',' + (-tk0y)
          s1 += ' v' + (2 * tk0y)
          s1 += ' h' + (dxo2)
          s1 += ' v' + (-2 * tk0y)
          s1 += ' z'
          break
        case 6: // ----- / (down) direction---------------------
          s1 += ' m' + (this.geof.tk.value[8].x) + ',' + (this.geof.tk.value[8].y) // Tk8´
          s1 += ' l' + (-2 * this.geof.tk.value[8].x) + ',' + (-2 * this.geof.tk.value[8].y) // Tk8
          s1 += ' l' + (-tk58x) + ',' + (tk58y) // Tk5
          s1 += ' v' + (tkcy)
          s1 += ' h' + (tkcx)
          s1 += ' z'
          break
        case 7: // ----- i (down) direction-----------------------
          s1 += ' m' + (-tk2) + ',' + (dyo2) // Tk0
          s1 += ' h' + (2 * tk2)
          s1 += ' v' + (-dyo2)
          s1 += ' h' + (-2 * tk2)
          s1 += ' z'
          break
        case 8: // ----- \ (down) direction---------------------
          s1 += ' m' + (-this.geof.tk.value[8].x) + ',' + (this.geof.tk.value[8].y) // Tk8´
          s1 += ' l' + (2 * this.geof.tk.value[8].x) + ',' + (-2 * this.geof.tk.value[8].y) // Tk8
          s1 += ' l' + tk58x + ',' + (tk58y) // Tk5
          s1 += ' v' + (tkcy)
          s1 += ' h' + (-tkcx)
          s1 += ' z'
          break

        case 12: // ----- Z - symbol (above)--------------------
          s1 += ' m' + (+dxo2) + ',' + (-dyo2)
          s1 += ' v' + (-tkcy)
          s1 += ' l' + (-tkcx) + ',' + (+tkcy)
          s1 += ' z'
          s1 += ' h' + (+tkcx)
          s1 += ' l' + (-tkcx) + ',' + (+tkcy)
          s1 += ' z'
          break
        case 18: // ----- Z - symbol (below)--------------------
          s1 += ' m' + (+dxo2) + ',' + (+dyo2)
          s1 += ' v' + (+tkcy)
          s1 += ' l' + (-tkcx) + ',' + (-tkcy)
          s1 += ' z'
          s1 += ' h' + (+tkcx)
          s1 += ' l' + (-tkcx) + ',' + (-tkcy)
          s1 += ' z'
          break

        case 14: // ----- \_ direction--------------------------
          s1 += ' m' + (tk0x) + ',' + (-tk0y) // Tk0
          s1 += ' h' + (tkax)
          s1 += ' v' + (2 * tk0y)
          s1 += ' h' + (-tkbx) // Tk0´
          s1 += ' l' + (-tk59x) + ',' + (-tk59y) // Tk5
          s1 += ' v' + (-tkcy)
          s1 += ' h' + (tkcx)
          s1 += ' z'
          // s1 += ' M' + this.x + ',' + (this.y - dyo2)
          // s1 += ' v' + (2 * dyo2)
          break
        case 15: // ----- -- direction--------------------------
          s1 += ' m' + (-dxo2) + ',' + (-tk0y) // Tk0
          s1 += ' v' + (2 * tk0y)
          s1 += ' h' + this.geof.dxo()
          s1 += ' v' + (-2 * tk0y)
          s1 += ' z'
          break
        case 16: // ----- /- direction--------------------------
          s1 += ' m' + (tk0x) + ',' + (tk0y) // Tk0
          s1 += ' h' + (tkax)
          s1 += ' v' + (-2 * tk0y)
          s1 += ' h' + (-tkbx) // Tk0´
          s1 += ' l' + (-tk59x) + ',' + (tk59y) // Tk5
          s1 += ' v' + (tkcy)
          s1 += ' h' + (tkcx)
          s1 += ' z'
          break

        case 24: // ----- \/ direction--------------------------
          s1 += ' m' + 0 + ',' + (-tkdy) // Tkd
          s1 += ' l' + (-dxo2 + tkcx) + ',' + (-dyo2 + tkdy)
          s1 += ' h' + (-tkcx)
          s1 += ' v' + (tkcy)
          s1 += ' l' + (dxo2 - tk0x) + ',' + (tk59y)
          s1 += ' h' + (2 * tk0x)
          s1 += ' l' + (dxo2 - tk0x) + ',' + (-tk59y)
          s1 += ' v' + (-tkcy)
          s1 += ' h' + (-tkcx)
          s1 += ' z'
          break
        case 25: // ----- _/ direction--------------------------
          s1 += ' m' + (-tk0x) + ',' + (-tk0y) // Tk0
          s1 += ' h' + (-tkax)
          s1 += ' v' + (2 * tk0y)
          s1 += ' h' + (tkbx) // Tk0´
          s1 += ' l' + tk59x + ',' + (-tk59y) // Tk5
          s1 += ' v' + (-tkcy)
          s1 += ' h' + (-tkcx)
          s1 += ' z'
          break
        case 26: // ----- / direction---------------------------
          s1 += ' m' + (dxo2 - tkcx) + ',' + (-dyo2) // Tk4
          s1 += ' l' + (-this.geof.dxo() + tkcx) + ',' + (this.geof.dyo() - tkcy)
          s1 += ' v' + (tkcy)
          s1 += ' h' + (tkcx)
          s1 += ' l' + (this.geof.dxo() - tkcx) + ',' + (-this.geof.dyo() + tkcy)
          s1 += ' v' + (-tkcy)
          s1 += ' h' + (-tkcx)
          s1 += ' z'
          break
        case 28: // ----- < direction---------------------------
          s1 += ' m' + (-tk0x) + ',' + (-tk0y) // Tk0
          s1 += ' v' + (2 * tk0y)
          s1 += ' l' + (+dxo2 + tk0x - tkcx) + ',' + (dyo2 - tk0y)
          s1 += ' h' + (+tkcx)
          s1 += ' v' + (-tkcy)
          s1 += ' l' + (-dxo2 + this.geof.tk.value[2].x) + ',' + (-dyo2 + tkcy)
          s1 += ' l' + (+dxo2 - this.geof.tk.value[2].x) + ',' + (-dyo2 + tkcy)
          s1 += ' v' + (-tkcy)
          s1 += ' h' + (-tkcx)
          s1 += ' z'
          break
        case 46: // ----- > direction---------------------------
          s1 += ' m' + (tk0x) + ',' + (-tk0y) // Tk0
          s1 += ' v' + (2 * tk0y)
          s1 += ' l' + (-dxo2 - tk0x + tkcx) + ',' + (dyo2 - tk0y)
          s1 += ' h' + (-tkcx)
          s1 += ' v' + (-tkcy)
          s1 += ' l' + (+dxo2 - this.geof.tk.value[2].x) + ',' + (-dyo2 + tkcy)
          s1 += ' l' + (-dxo2 + this.geof.tk.value[2].x) + ',' + (-dyo2 + tkcy)
          s1 += ' v' + (-tkcy)
          s1 += ' h' + (+tkcx)
          s1 += ' z'
          break
        case 48: // ----- \ direction---------------------------
          s1 += ' m' + (-dxo2 + tkcx) + ',' + (-dyo2) // Tk4
          s1 += ' l' + (this.geof.dxo() - tkcx) + ',' + (this.geof.dyo() - tkcy)
          s1 += ' v' + (+tkcy)
          s1 += ' h' + (-tkcx)
          s1 += ' l' + (-this.geof.dxo() + tkcx) + ',' + (-this.geof.dyo() + tkcy)
          s1 += ' v' + (-tkcy)
          s1 += ' h' + (+tkcx)
          s1 += ' z'
          break
        case 58: // ----- -\ direction--------------------------
          s1 += ' m' + (-tk0x) + ',' + (tk0y)
          s1 += ' h' + (-tkax)
          s1 += ' v' + (-2 * tk0y)
          s1 += ' h' + (tkbx) // Tk0´
          s1 += ' l' + tk59x + ',' + (tk59y) // Tk5
          s1 += ' v' + (tkcy)
          s1 += ' h' + (-tkcx)
          s1 += ' z'
          break
        case 68: // ----- /\ direction--------------------------
          s1 += ' m' + 0 + ',' + (tkdy) // Tkd
          s1 += ' l' + (-dxo2 + tkcx) + ',' + (dyo2 - tkdy)
          s1 += ' h' + (-tkcx)
          s1 += ' v' + (-tkcy)
          s1 += ' l' + (dxo2 - tk0x) + ',' + (-tk59y)
          s1 += ' h' + (2 * tk0x)
          s1 += ' l' + (dxo2 - tk0x) + ',' + (tk59y)
          s1 += ' v' + (tkcy)
          s1 += ' h' + (-tkcx)
          s1 += ' z'
          break

        case 13: // ----- L direction---------------------------
          s1 += ' m' + (tk2) + ',' + (-tk2)
          s1 += ' v' + (tk2 - dyo2)
          s1 += ' h' + (-2 * tk2)
          s1 += ' v' + (tk2 + dyo2)
          s1 += ' h' + (tk2 + dxo2)
          s1 += ' v' + (-2 * tk2)
          s1 += ' z'
          break
        case 17: // ----- r direction---------------------------
          s1 += ' m' + (tk2) + ',' + (tk2)
          s1 += ' v' + (-tk2 + dyo2)
          s1 += ' h' + (-2 * tk2)
          s1 += ' v' + (-tk2 - dyo2)
          s1 += ' h' + (tk2 + dxo2)
          s1 += ' v' + (2 * tk2)
          s1 += ' z'
          break
        case 35: // ----- -! direction--------------------------
          s1 += ' m' + (-tk2) + ',' + (-tk2)
          s1 += ' v' + (tk2 - dyo2)
          s1 += ' h' + (2 * tk2)
          s1 += ' v' + (tk2 + dyo2)
          s1 += ' h' + (-tk2 - dxo2)
          s1 += ' v' + (-2 * tk2)
          s1 += ' z'
          break
        case 57: // ----- -7 direction---------------------------
          s1 += ' m' + (-tk2) + ',' + (tk2)
          s1 += ' v' + (-tk2 + dyo2)
          s1 += ' h' + (2 * tk2)
          s1 += ' v' + (-tk2 - dyo2)
          s1 += ' h' + (-tk2 - dxo2)
          s1 += ' v' + (2 * tk2)
          s1 += ' z'
          break

        case 159: // ----- || - symbol (right side)--------------
          s1 += ' m' + (-dxo2) + ',' + (-tk0y) // Tk0
          s1 += ' v' + (2 * tk0y)
          s1 += ' h' + (this.geof.dxo() - 3 * tks)
          s1 += ' v' + (-2 * tk0y)
          s1 += ' z'

          s1 += ' m' + (this.geof.dxo() - 3 * tks) + ',' + (-tks)
          s1 += ' v' + (2 * tk2 + 2 * tks)
          s1 += ' h' + (+tks)
          s1 += ' v' + (-2 * tk2 - 2 * tks)
          s1 += ' z'

          s1 += ' m' + (2 * tks) + ',0'
          s1 += ' v' + (2 * tk2 + 2 * tks)
          s1 += ' h' + (+tks)
          s1 += ' v' + (-2 * tk2 - 2 * tks)
          s1 += ' z'
          break

        case 29: // ----- \\ - symbol (right up corner)---------
          s1 += ' m' + (-dxo2) + ',' + (-tk0y) // Tk0
          s1 += ' v' + (2 * tk0y)
          s1 += ' h' + (this.geof.dxo() - 3 * tks)
          s1 += ' v' + (-2 * tk0y)
          s1 += ' z'

          s1 += ' m' + (this.geof.dxo() - 3 * tks) + ',' + (-tks)
          s1 += ' v' + (2 * tk2 + 2 * tks)
          s1 += ' h' + (+tks)
          s1 += ' v' + (-2 * tk2 - 2 * tks)
          s1 += ' z'

          s1 += ' m' + (2 * tks) + ',0'
          s1 += ' v' + (2 * tk2 + 2 * tks)
          s1 += ' h' + (+tks)
          s1 += ' v' + (-2 * tk2 - 2 * tks)
          s1 += ' z'
          break
        default:
      }
      // -----add symbol "end of track"---------------------------
      if (dir1 < 10) {
        switch (dir1) {
          case 1: case 5:
            s1 += ' M' + this.x + ',' + this.y
            s1 += ' m' + (-tks) + ',' + (-3 * tks)
            s1 += ' v' + (6 * tks)
            s1 += ' h' + (2 * tks)
            s1 += ' v' + (-6 * tks)
            s1 += ' z'
            break
          case 2: case 6:
            s1 += ' M' + this.x + ',' + this.y
            s1 += ' m' + (-3 * tks3 - tks4) + ',' + (-3 * tks4 + tks3)
            s1 += ' l' + (6 * tks3) + ',' + (6 * tks4)
            s1 += ' l' + (2 * tks4) + ',' + (-2 * tks3)
            s1 += ' l' + (-6 * tks3) + ',' + (-6 * tks4)
            s1 += ' z'
            break
          case 3: case 7:
            s1 += ' M' + this.x + ',' + this.y
            s1 += ' m' + (-3 * tks) + ',' + (-tks)
            s1 += ' v' + (2 * tks)
            s1 += ' h' + (6 * tks)
            s1 += ' v' + (-2 * tks)
            s1 += ' z'
            break
          case 4: case 8:
            s1 += ' M' + this.x + ',' + this.y
            s1 += ' m' + (3 * tks3 + tks4) + ',' + (-3 * tks4 + tks3)
            s1 += ' l' + (-6 * tks3) + ',' + (6 * tks4)
            s1 += ' l' + (-2 * tks4) + ',' + (-2 * tks3)
            s1 += ' l' + (6 * tks3) + ',' + (-6 * tks4)
            s1 += ' z'
            break
          default:
        }
      }
      return s1
    },
    // _______on click: turn track energy on____________________
    onClkTop: function (): void {
      console.log(this.sid, 'Button-Click On')
      // -----is there a topic for publishing?------------------
      if (this.track1?.pubTopic) {
        const aPubTopic = this.track1.pubTopic.split(' ')
        // ---prepare payload (1 or 0)--------------------------
        let trackon1 = rccTrack1Controller.payloadTrackOn
        if (this.track1.payloadInvert) trackon1 = rccTrack1Controller.payloadTrackOff
        const payload = trackon1
        // ---publish message(s)--------------------------------
        aPubTopic.forEach(topic => {
          if (this.track1?.pubTopic) {
            rccTrack1Controller.publishRcc(topic, payload)
          }
        })
      }
    },
    // _______on click: turn track energy off___________________
    onClkBottom: function (): void {
      console.log(this.sid, 'Button-Click Off')
      // -----is there a topic for publishing?------------------
      if (this.track1?.pubTopic) {
        const aPubTopic = this.track1.pubTopic.split(' ')
        // ---prepare payload (0 or 1)--------------------------
        let trackoff1 = rccTrack1Controller.payloadTrackOff
        if (this.track1.payloadInvert) trackoff1 = rccTrack1Controller.payloadTrackOn
        const payload = trackoff1
        // ---publish message(s)--------------------------------
        aPubTopic.forEach(topic => {
          rccTrack1Controller.publishRcc(topic, payload)
        })
      }
    },
  },
})
</script>
