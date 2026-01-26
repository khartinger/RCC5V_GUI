<!-- RccTurnout1.vue ------------------------khartinger----- -->
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
  <!--draw turnout parts (do not change lines!)------------- -->
  <path :d="drawTurnout2" :fill="colorTurnout2" :stroke="colorTurnout2" stroke-width="1" />
  <path :d="drawTurnout1" :fill="colorTurnout1" :stroke="colorTurnout1" stroke-width="1" />
  <!--define click area------------------------------------- -->
  <path :d="pathTop" @click="onClkTop()" class="ciClick" />
  <path :d="pathBottom" @click="onClkBottom()" class="ciClick" />
</g>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Turnout1, rccTurnout1Controller } from '../controller/RccTurnout1Controller'
import RccBase from './RccBase.vue'
import { Geof } from '../classes/Geo'

export default defineComponent({
  name: 'RccTurnout1',
  components: {
    RccBase,
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
    // _______find turnout1 object to given sid___________________
    turnout1: function (): Turnout1 | undefined {
      return rccTurnout1Controller.turnouts1.find(turnout1 => turnout1.id === this.sid)
    },
    // _______get iTurnout1State__________________________________
    iTurnout1State: function (): number {
      return this.turnout1?.iTurnout1State ?? -1
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
      if(this.header.length > 0) ret |= 1
      if(this.footer.length > 0) ret |= 16
      // console.log('drawXAxis: xAxis=', this.xAxis + ' ret=' + String(ret))
      return ret
    },
    // _______type as string #C_________________________________
    sDir: function(): string {
      // -----Break down direction "dir" into int and char-------
      if(this.dir.length !== 2) return ''
      let sDir_ = String(this.dir.toUpperCase())
      if (!['L', 'R'].includes(sDir_[1])) {
        if (!['L', 'R'].includes(sDir_[0])) return ''
        sDir_ = String(sDir_[0] + sDir_[1])
      }
      return sDir_
    },
    // _______draw the active path of the turnout_______________
    drawTurnout1: function(): string {
      if (this.iTurnout1State === 0) return this.pathTurnout(true)
      return this.pathTurnout(false)
    },
    // _______draw the inactive path of the turnout_____________
    drawTurnout2: function(): string {
      if (this.iTurnout1State !== 0) return this.pathTurnout(true)
      return this.pathTurnout(false)
    },
    // _______color 1 of the track (active path)________________
    colorTurnout1: function (): string {
      if (this.color.length > 1) return this.color
      if (this.iTurnout1State < 0) return this.geof.colorTrackUnknown
      return this.geof.colorTurnoutClear
    },
    // _______color 2 of the track (inactive path)______________
    colorTurnout2: function (): string {
      if (this.iTurnout1State < 0) return this.geof.colorTrackUnknown
      return this.geof.colorTurnoutBlocked
    },
    // _______text in line 1 and 5______________________________
    lineHeader: function (): string {
      if (this.header.length > 0) { 
        const a1=String(this.headeralign).toUpperCase().charAt(0)
        if(a1 === 'C' || a1 === 'M') return this.geof.center(this.header)
        if(a1 === 'R') return this.geof.right(this.header)
        return this.header
      }
      return this.geof.center(this.geof.textTrackOn)
    },
    lineFooter: function (): string {
      if (this.footer.length > 0) {
        const a1=String(this.footeralign).toUpperCase().charAt(0)
        if(a1 === 'C' || a1 === 'M') return this.geof.center(this.footer)
        if(a1 === 'R') return this.geof.right(this.footer)
        return this.footer
      }
      return this.geof.center(this.geof.textTrackOff)
    },
    // _______click area "top"__________________________________
    pathTop: function(): string {
      const dxo = this.geof.dxo()
      const dyo = this.geof.dyo()
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      let s1 = ''
      if (this.sDir === '1R' || this.sDir === '1L' ||
          this.sDir === '5R' || this.sDir === '5L') 
      { // --------rectangle as top click area------------------
        s1 += ' M' + this.x + ',' + this.y
        s1 += ' m' + (-dxo2) + ',' + (-dyo2)
        s1 += ' v' + dyo2
        s1 += ' h' + dxo
        s1 += ' v' + (-dyo2)
        s1 += ' z'
      } 
      else // -----triangle as top click area-------------------
      {
        if (this.sDir === '2R' || this.sDir === '6R') {
          // ......top left triangle............................
          s1 += ' M' + this.x + ',' + this.y
          s1 += ' m' + (dxo2) + ',' + (-dyo2)
          s1 += ' h' + (-dxo)
          s1 += ' v' + (dyo)
          s1 += ' z'
        } else {
          // ......top right triangle...........................
          s1 += ' M' + this.x + ',' + this.y
          s1 += ' m' + (-dxo2) + ',' + (-dyo2)
          s1 += ' h' + (dxo)
          s1 += ' v' + (dyo)
          s1 += ' z'
        }
      }
      return s1
    },
    // _______click area "bottom"_______________________________
    pathBottom: function(): string {
      const dxo = this.geof.dxo()
      const dyo = this.geof.dyo()
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      let s1 = ''
      if (this.sDir === '1R' || this.sDir === '1L' ||
          this.sDir === '5R' || this.sDir === '5L') 
      { // --------rectangle as bottom click area---------------
        s1 += ' M' + this.x + ',' + this.y
        s1 += ' m' + (-dxo2) + ',' + (dyo2)
        s1 += ' h' + dxo
        s1 += ' v' + (-dyo2)
        s1 += ' h' + (-dxo)
        s1 += ' z'
      } 
      else // -----triangle as bottom click area----------------
      {
        if (this.sDir === '2R' || this.sDir === '6R') {
          // ......bottom right triangle.........................
          s1 += ' M' + this.x + ',' + this.y
          s1 += ' m' + (-dxo2) + ',' + (dyo2)
          s1 += ' h' + (dxo)
          s1 += ' v' + (-dyo)
          s1 += ' z'
        } else {
          // ......bottom left triangle........................
          s1 += ' M' + this.x + ',' + this.y
          s1 += ' m' + (-dxo2) + ',' + (-dyo2)
          s1 += ' v' + (dyo)
          s1 += ' h' + (dxo)
          s1 += ' z'
        }
      }
      return s1
    },
  },
  methods: {
    // _______draw a path of the turnout________________________
    pathTurnout: function (curve_: boolean): string {
      const type_ = this.sDir
      // -----draw path-----------------------------------------
      if (type_ === '1L') {
        if (curve_) return this.pathTrack(25) // curve
        return this.pathTrack(15) // stright
      }
      if (type_ === '1R') {
        if (curve_) return this.pathTrack(58)
        return this.pathTrack(15)
      }
      if (type_ === '2R') {
        if (curve_) return this.pathTrack(16)
        return this.pathTrack(26)
      }
      if (type_ === '8L') {
        if (curve_) return this.pathTrack(14)
        return this.pathTrack(48)
      }
      if (type_ === '5R') {
        if (curve_) return this.pathTrack(14)
        return this.pathTrack(15)
      }
      if (type_ === '5L') {
        if (curve_) return this.pathTrack(16)
        return this.pathTrack(15)
      }
      if (type_ === '6R') {
        if (curve_) return this.pathTrack(25)
        return this.pathTrack(26)
      }
      if (type_ === '4L') {
        if (curve_) return this.pathTrack(58)
        return this.pathTrack(48)
      }
      return ''
    },
        // _______path command: draw a track________________________
    pathTrack: function (dir1: number): string {
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
          s1 += ' h' + (-2) * dxo2
          s1 += ' v' + (2 * tk2)
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
          s1 += ' m' + sgnx * (dxo2 - q1x) + ',' + dyo2 // P1 as start
          s1 += ' h' + sgnx * q1x
          s1 += ' v' + (-q2y) // @ P2
          s1 += ' l' + sgnx * (-2 * dxo2 + q1x) + ',' + (-2 * dyo2 + q2y)
          s1 += ' h' + (-sgnx) * q1x
          s1 += ' v' + q2y
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
        default:
          s1 = ''
      }
      return s1
    },
    // _______on click: send a message to turnout_______________
    onClkTop: function (): void {
      console.log(this.sid, 'Button-Click On')
      // -----is there a topic for publishing?------------------
      if (this.turnout1?.pubTopic) {
        const aPubTopic = this.turnout1.pubTopic.split(' ')
        // ---1. prepare payload (invert or not)----------------
        let curved1 = rccTurnout1Controller.payloadTurnoutCurved
        let stright1 = rccTurnout1Controller.payloadTurnoutStright
        if (this.turnout1.payloadInvert) {
          curved1 = rccTurnout1Controller.payloadTurnoutStright
          stright1 = rccTurnout1Controller.payloadTurnoutCurved
        }
        // ---2. prepare payload depending on direction---------
        let payload = curved1
        if(this.dir === '1R' || this.dir === '2R' || this.dir === '4L' || this.dir === '5L') {
          payload = stright1
        }
        // ---publish message(s)--------------------------------
        aPubTopic.forEach(topic => {
          if (this.turnout1?.pubTopic) {
            rccTurnout1Controller.publishRcc(topic, payload)
          }
        })
      }
    },
    // _______on click: send a message to turnout_______________
    onClkBottom: function (): void {
      console.log(this.sid, 'Button-Click Off')
      // -----is there a topic for publishing?------------------
      if (this.turnout1?.pubTopic) {
        const aPubTopic = this.turnout1.pubTopic.split(' ')
        // ---1. prepare payload (invert or not)----------------
        let curved1 = rccTurnout1Controller.payloadTurnoutCurved
        let stright1 = rccTurnout1Controller.payloadTurnoutStright
        if (this.turnout1.payloadInvert) {
          curved1 = rccTurnout1Controller.payloadTurnoutStright
          stright1 = rccTurnout1Controller.payloadTurnoutCurved
        }
        // ---2. prepare payload depending on direction---------
        let payload = stright1
        if(this.dir === '1R' || this.dir === '2R' || this.dir === '4L' || this.dir === '5L') {
          payload = curved1
        }
        // ---publish message(s)--------------------------------
        aPubTopic.forEach(topic => {
          // if (this.turnout1?.pubPayload) payload = this.turnout1.pubPayload
          rccTurnout1Controller.publishRcc(topic, payload)
        })
      }
    },
  },
})
</script>
