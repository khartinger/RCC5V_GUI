<!-- RccTurnout1.vue ------------------------khartinger----- -->
<!-- 2026-01-08: new                                         -->

<template>
  <g>
  <!--draw border------------------------------------------- -->
  <CiBase :x="x" :y="y" :border="border" :fx="1" :fy="1"></CiBase>
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
import CiBase from './CiBase.vue'
import { Geof } from '../classes/Geo'

export default defineComponent({
  name: 'RccTurnout1',
  components: {
    CiBase,
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
    type: {
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
    sType: function(): string {
      // -----Break down direction "dir" into int and char-------
      if(this.type.length !== 2) return ''
      let sType_ = String(this.type.toUpperCase())
      if (!['L', 'R'].includes(sType_[1])) {
        if (!['L', 'R'].includes(sType_[0])) return ''
        sType_ = String(sType_[0] + sType_[1])
      }
      return sType_
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
      if (this.color !== '-') return this.color
      if (this.iTurnout1State < 0) return this.geof.colorTrackUnknown
      return this.geof.colorTurnoutClear
    },
    // _______color 2 of the track (inactive path)______________
    colorTurnout2: function (): string {
      // if (this.color !== '-') return this.color
      if (this.iTurnout1State < 0) return this.geof.colorTrackUnknown
      return this.geof.colorTurnoutBlocked
    },
    // _______text in line 1 and 5______________________________
    lineHeader: function (): string {
      if (this.header.length > 0) { return this.header }
        return this.geof.center2(this.geof.textTrackOn)
    },
    lineFooter: function (): string {
      if (this.footer.length > 0) return this.footer
      return this.geof.center2(this.geof.textTrackOff)
    },
    // _______click area "top"__________________________________
    pathTop: function(): string {
      const dxo = this.geof.dxo()
      const dyo = this.geof.dyo()
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      let s1 = ''
      if (this.sType === '1R' || this.sType === '1L' ||
          this.sType === '5R' || this.sType === '5L') 
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
        if (this.sType === '2R' || this.sType === '6R') {
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
      if (this.sType === '1R' || this.sType === '1L' ||
          this.sType === '5R' || this.sType === '5L') 
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
        if (this.sType === '2R' || this.sType === '6R') {
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
      const type_ = this.sType
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
      const tk59x = this.geof.dxo() - tkbx
      const tk59y = dyo2 - tkcy + tk0y
      const tkdy = tk0x + tk0y
      // -----symbol "Section insulator" || --------------------
      const tks = tk2 / 2
      let s1 = ' M' + this.x + ',' + this.y
      switch (dir1) {
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
      return s1
    },
    // _______on click: turn track energy on____________________
    onClkTop: function (): void {
      console.log(this.sid, 'Button-Click On')
      let payload = 'onClkOn: sid=' + this.sid
      // const topic = 'rcc/error'
      // if (!this.turnout1) rccTurnout1Controller.publishCi(topic, payload)
      if (this.turnout1?.pubTopic) {
        const aPubTopic = this.turnout1.pubTopic.split(' ')
        payload = rccTurnout1Controller.payloadTurnoutCurved
        if(this.type === '1R' || this.type === '2R' || this.type === '4L' || this.type === '5L') {
          payload = rccTurnout1Controller.payloadTurnoutStright
        }
        aPubTopic.forEach(topic => {
          // if (this.turnout1?.pubPayload) payload = this.turnout1.pubPayload
          if (this.turnout1?.pubTopic) {
            rccTurnout1Controller.publishCi(topic, payload)
          }
        })
      }
    },
    // _______on click: turn track energy off___________________
    onClkBottom: function (): void {
      console.log(this.sid, 'Button-Click Off')
      let payload = 'onClkOff: sid=' + this.sid
      // const topic = 'rcc/error'
      // if (!this.turnout1) rccTurnout1Controller.publishCi(topic, payload)
      if (this.turnout1?.pubTopic) {
        const aPubTopic = this.turnout1.pubTopic.split(' ')
        payload = rccTurnout1Controller.payloadTurnoutStright
        if(this.type === '1R' || this.type === '2R' || this.type === '4L' || this.type === '5L') {
          payload = rccTurnout1Controller.payloadTurnoutCurved
        }
        aPubTopic.forEach(topic => {
          // if (this.turnout1?.pubPayload) payload = this.turnout1.pubPayload
          rccTurnout1Controller.publishCi(topic, payload)
        })
      }
    },
  },
})
</script>
