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
  <path :d="trackPath" :fill="colorTrack" :stroke="colorTrack" stroke-width="1" />
  <path :d="drawBufferStop" :fill="colorTrack" :stroke="colorTrack" stroke-width="1" />
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
    // Return: Number with tens digit smaller than ones digit,
    //         0 if error occurs
    dirNum: function (): number {
      // -----only 1 or 2 digits--------------------------------
      if (!/^\d{1,2}$/.test(this.dir)) return 0
      // -----one digit -> return as number---------------------
      if (this.dir.length === 1) { return Number(this.dir) }
      // -----split the digits, sort them, return value---------
      const [a, b] = this.dir.split('').map(Number)
      return Math.min(a, b) * 10 + Math.max(a, b)
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
    // =======buffer stop=======================================
    // _______draw a buffer stop ("end of track")_______________
    // size of the rectangle: length = 3*tk2, width = tk2 (=tk/2)
    drawBufferStop: function (): string {
      const dir1 = this.dirNum
      if (dir1 < 1 || dir1 > 8) return ''
      const tk2 = this.geof.tk2
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      const tks = tk2 / 2
      const w = Math.sqrt(dxo2 * dxo2 + dyo2 * dyo2)
      const tks4 = dxo2 * tks / w
      const tks3 = dyo2 * tks / w
      let sgnx = 1
      let s1 = ''
      switch (dir1) {
        case 1: case 5: // --vertical rectangle | --------------
          s1 += ' M' + this.x + ',' + this.y
          s1 += ' m' + (-tks) + ',' + (-3 * tks)
          s1 += ' v' + (6 * tks)
          s1 += ' h' + (2 * tks)
          s1 += ' v' + (-6 * tks)
          s1 += ' z'
          break
        case 3: case 7: // --horizontal rectangle - ------------
          s1 += ' M' + this.x + ',' + this.y
          s1 += ' m' + (-3 * tks) + ',' + (-tks)
          s1 += ' v' + (2 * tks)
          s1 += ' h' + (6 * tks)
          s1 += ' v' + (-2 * tks)
          s1 += ' z'
          break
        case 2: case 6: // --diagonal rectangle \ --------------
          sgnx = -1
          /* falls through */
        case 4: case 8: // --diagonal rectangle / --------------
          s1 += ' M' + this.x + ',' + this.y
          s1 += ' m' + sgnx * (3 * tks3 + tks4) + ',' + (-3 * tks4 + tks3)
          s1 += ' l' + sgnx * (-6 * tks3) + ',' + (6 * tks4)
          s1 += ' l' + sgnx * (-2 * tks4) + ',' + (-2 * tks3)
          s1 += ' l' + sgnx * (6 * tks3) + ',' + (-6 * tks4)
          s1 += ' z'
          break
        default:
      }
      return s1
    },
    // =======track=============================================
    // _______path of a track with the path number dirNum_______
    trackPath: function (): string {
      const dir1 = this.dirNum
      // -----signs for drawing---------------------------------
      let sgnx = 1
      let sgny = 1
      // -----(positive) values of line length------------------
      const tk2 = this.geof.tk2
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      const q1x = dxo2 - this.geof.tkp.value[1].x
      const q2y = dyo2 - this.geof.tkp.value[2].y
      const q5x = dxo2 - this.geof.tkp.value[5].x
      const d25y = this.geof.tkp.value[2].y - this.geof.tkp.value[5].y
      let s1 = ' M' + this.x + ',' + this.y
      switch (dir1) {
        // ===horizontel line===================================
        case 15:
          s1 += ' m' + dxo2 + ',' + tk2 // P0 as start
          s1 += ' v' + (-2 * tk2)
          s1 += ' h' + sgnx * (-2) * dxo2
          s1 += ' v' + (2 * tk2)
          s1 += ' z'
          break
        // ===buffer stop=======================================
        case 5: // ----- x direction----------------------------
          sgnx = -1
          /* falls through */
        case 1:
          s1 += ' m' + sgnx * dxo2 + ',' + tk2 // P0 as start
          s1 += ' v' + (-2 * tk2)
          s1 += ' h' + sgnx * (-dxo2)
          s1 += ' v' + (2 * tk2)
          s1 += ' z'
          break
        case 3: // ----- y direction----------------------------
          sgny = -1
          /* falls through */
        case 7:
          s1 += ' m' + tk2 + ',' + sgny * dyo2
          s1 += ' v' + sgny * (-dyo2)
          s1 += ' h' + (-2) * tk2
          s1 += ' v' + sgny * dyo2
          s1 += ' z'
          break
        case 2: case 4: case 6: // -----diagonal directions-----
          sgnx = -1
          sgny = -1
          if (dir1 === 2) sgnx = 1
          if (dir1 === 6) sgny = 1
          /* falls through */
        case 8:
          s1 += ' m' + sgnx * (dxo2 - q1x) + ',' + sgny * dyo2 // P1 as start
          s1 += ' h' + sgnx * q1x
          s1 += ' v' + sgny * (-q2y) // @ P2
          s1 += ' l' + sgnx * (-dxo2 + this.geof.tkp.value[4].x) + ',' + sgny * (-this.geof.tkp.value[2].y + this.geof.tkp.value[4].y) // @ P4
          s1 += ' l' + sgnx * (-2) * this.geof.tkp.value[4].x + ',' + sgny * (-2) * this.geof.tkp.value[4].y // @ P4*
          s1 += ' z'
          break
        // ===horizontal, rectangular angle=====================
        case 13: case 35: case 57:
          sgnx = -1
          sgny = -1
          if (dir1 === 13) sgnx = 1
          if (dir1 === 57) sgny = 1
          /* falls through */
        case 17:
          s1 += ' m' + sgnx * dxo2 + ',' + sgny * tk2 // P0 as start
          s1 += ' v' + sgny * (-2) * tk2 // @ P0'
          s1 += ' h' + (-sgnx) * (dxo2 + tk2)
          s1 += ' v' + sgny * (dyo2 + tk2)
          s1 += ' h' + sgnx * 2 * tk2
          s1 += ' v' + (-sgny) * (dyo2 - tk2)
          s1 += ' z'
          break
        // ===diagonal straight line============================
        case 26:
          sgnx = -1
          /* falls through */
        case 48:
          s1 += ' m' + sgnx * (dxo2 - q1x) + ',' + sgny * dyo2 // P1 as start
          s1 += ' h' + sgnx * q1x
          s1 += ' v' + sgny * (-q2y) // @ P2
          s1 += ' l' + sgnx * (-2 * dxo2 + q1x) + ',' + sgny * (-2 * dyo2 + q2y)
          s1 += ' h' + (-sgnx) * q1x
          s1 += ' v' + sgny * q2y
          s1 += ' z'
          break
        // ===curved track======================================
        case 14: case 16: case 25:
          sgnx = -1
          sgny = -1
          if (dir1 === 16) sgny = 1
          if (dir1 === 25) sgnx = 1
          /* falls through */
        case 58:
          s1 += ' m' + sgnx * (dxo2 - q1x) + ',' + sgny * dyo2 // P1 as start
          s1 += ' h' + sgnx * q1x
          s1 += ' v' + sgny * (-q2y) // @ P2
          s1 += ' l' + (-sgnx) * q5x + ',' + (-sgny) * d25y // @ P5
          s1 += ' h' + (-sgnx) * (2 * dxo2 - q5x)
          s1 += ' v' + sgny * 2 * tk2
          s1 += ' h' + sgnx * q5x
          s1 += ' z'
          break
        // ===angel >< =========================================
        case 46:
          sgnx = -1
          /* falls through */
        case 28:
          s1 += ' m' + sgnx * (dxo2 - q1x) + ',' + dyo2 // P1 as start
          s1 += ' h' + sgnx * q1x
          s1 += ' v' + (-q2y) // @ P2
          s1 += ' l' + (-sgnx) * (dxo2 - this.geof.tkp.value[6].x) + ',' + (-this.geof.tkp.value[2].y) // @ P6
          s1 += ' l' + sgnx * (dxo2 - this.geof.tkp.value[6].x) + ',' + (-this.geof.tkp.value[2].y) // @ P2'
          s1 += ' v' + (-q2y)
          s1 += ' h' + (-sgnx) * q1x // @ P1'
          s1 += ' l' + (-sgnx) * (this.geof.tkp.value[1].x + this.geof.tkp.value[5].x) + ',' + (dyo2 - tk2)
          s1 += ' v' + 2 * tk2
          s1 += ' z'
          break
        // ===angel A V ========================================
        case 24:
          sgny = -1
          /* falls through */
        case 68:
          s1 += ' m' + (dxo2 - q1x) + ',' + sgny * dyo2 // P1 as start
          s1 += ' h' + q1x
          s1 += ' v' + sgny * (-q2y) // @ P2
          s1 += ' l' + -q5x + ',' + (-sgny) * d25y // @ P5
          s1 += ' h' + (-2) * this.geof.tkp.value[5].x
          s1 += ' l' + -q5x + ',' + sgny * d25y // @ P2"
          s1 += ' v' + sgny * q2y
          s1 += ' h' + q1x // @ P1"
          s1 += ' l' + this.geof.tkp.value[1].x + ',' + sgny * (-dyo2 + this.geof.tkp.value[3].y) // @ P3
          s1 += ' z'
          break
        default:
          s1 = ''
      }
      return s1
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
    // =======path of click areas===============================
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
