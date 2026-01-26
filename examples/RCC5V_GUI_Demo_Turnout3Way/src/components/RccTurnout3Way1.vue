<!-- RccTurnout3Wway1.vue -------------------khartinger----- -->
<!-- 2026-01-09: new                                         -->

<template>
  <g>
  <!--draw border------------------------------------------- -->
  <RccBase :x="x" :y="y" :border="border" :fx="1" :fy="1"></RccBase>
  <!--draw a horizontal line-------------------------------- -->
  <line v-if="(drawLabel & 4) > 0" :x1="geof.x0()" :y1="geof.y" :x2="geof.x3()" :y2="geof.y" :stroke="geof.colorTrackInfo" stroke-width="1" />
  <!--write text-------------------------------------------- -->
  <text v-if="(drawLabel & 1) > 0 && (iLines>0)" :x="geof.xt()" :y="geof.ytHeader()" class="ciFont0" :font-size="geof.fh" :fill="geof.colorTrackInfo">{{lineHeader}}</text>
  <text v-if="(drawLabel & 16) > 0 && (iLines>1)" :x="geof.xt()" :y="geof.ytFooter()" class="ciFont0" :font-size="geof.fh" :fill="geof.colorTrackInfo">{{lineFooter}}</text>
  <!--draw turnout parts (do not change lines!)------------- -->
  <path :d="drawTurnout1" :fill="colorTurnout2" :stroke="colorTurnout2" stroke-width="1" />
  <path :d="drawTurnout2" :fill="colorTurnout2" :stroke="colorTurnout2" stroke-width="1" />
  <path :d="drawTurnout3" :fill="colorTurnout1" :stroke="colorTurnout1" stroke-width="1" />
  <!--define click area------------------------------------- -->
  <path :d="pathTop" @click="onClkTop()" class="ciClick" />
  <path :d="pathMid" @click="onClkMid()" class="ciClick" />
  <path :d="pathBottom" @click="onClkBottom()" class="ciClick" />
</g>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { To3way1, rccTurnout3Way1Controller } from '../controller/RccTurnout3Way1Controller'
import RccBase from './RccBase.vue'
import { Geof } from '../classes/Geo'

export default defineComponent({
  name: 'RccTurnout3way1',
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
    to3way1: function (): To3way1 | undefined {
      return rccTurnout3Way1Controller.to3ways1.find(to3way1 => to3way1.id === this.sid)
    },
    // _______get iTo3way1State__________________________________
    iTo3way1State: function (): number {
      const iLState_ = Number(this.to3way1?.iLState)
      const iRState_ = Number(this.to3way1?.iRState)
      if(Number.isNaN(iLState_) || Number.isNaN(iRState_)) return -99
      return (iLState_ + 2 * iRState_)
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
        // _______draw a horizontal middle line, texts or not_______
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
      // console.log('drawLabel: ret=', ret)
      return ret
    },
    // _______draw the active path of the turnout_______________
    drawTurnout1: function(): string {
      const ret_ = this.pathTurnout(1)
      return ret_
    },
    // _______draw the inactive path of the turnout_____________
    drawTurnout2: function(): string {
      const ret_ = this.pathTurnout(2)
      return ret_
    },
    // _______draw the inactive path of the turnout_____________
    drawTurnout3: function(): string {
      const ret_ = this.pathTurnout(3)
      return ret_
    },
    // _______color 1 of the track (active path)________________
    colorTurnout1: function (): string {
      if (this.color.length > 1) return this.color
      if (this.iTo3way1State < 0) return this.geof.colorTrackUnknown
      return this.geof.colorTurnoutClear
    },
    // _______color 2 of the track (inactive path)______________
    colorTurnout2: function (): string {
      if (this.iTo3way1State < 0) return this.geof.colorTrackUnknown
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
      const dir_ = Number(this.dir) // turnout 1 -< or 5 >-
      if(Number.isNaN(dir_)) return ''
      const dxo = this.geof.dxo()
      const dyo = this.geof.dyo()
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      let s1 = ' M' + this.x + ',' + this.y
      if (dir_ === 1)
      { //----------turnout to the right -< --------------------
        s1 += ' l' + dxo2 + ',' + (-dyo2)
        s1 += ' h' + (-dxo)
        s1 += ' v' + dyo2
        s1 += ' z'
      }
      if (dir_ === 5)
      { //----------turnout to the left >- ---------------------
        s1 += ' h' + dxo2
        s1 += ' v' + (-dyo2)
        s1 += ' h' + (-dxo)
        s1 += ' z'
      }
      return s1
    },

    // _______click area "middle" (stright)_____________________
    pathMid: function(): string {
      const dir_ = Number(this.dir) // turnout 1 -< or 5 >-
      if(Number.isNaN(dir_)) return ''
      const dyo = this.geof.dyo()
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      let s1 = ' M' + this.x + ',' + this.y
      if (dir_ === 1) 
      { //----turnout to the right -< ----------------------
        s1 += ' l' + dxo2 + ',' + dyo2
        s1 += ' v' + (-dyo)
        s1 += ' z'
      }
      if (dir_ === 5) 
      { //----turnout to the left >- ---------------------------
        s1 += ' l' + (-dxo2) + ',' + (-dyo2)
        s1 += ' v' + dyo
        s1 += ' z'
      }
      return s1
    },
    // _______click area "bottom"_______________________________
    pathBottom: function(): string {
      const dir_ = Number(this.dir) // turnout 1 -< or 5 >-
      if(Number.isNaN(dir_)) return ''
      const dxo = this.geof.dxo()
      const dyo = this.geof.dyo()
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      let s1 = ' M' + this.x + ',' + this.y
      if (dir_ === 1) 
      { //----------turnout to the right -< ----------------
        s1 += ' l' + dxo2 + ',' + dyo2
        s1 += ' h' + (-dxo)
        s1 += ' v' + (-dyo2)
        s1 += ' z'
      }
      if (dir_ === 5) 
      { //----------turnout to the left >- -----------------
        s1 += ' h' + dxo2
        s1 += ' v' + dyo2
        s1 += ' h' + (-dxo)
        s1 += ' z'
      }
      return s1
    },
  },

  methods: {

    // _______draw a path of the turnout________________________
    pathTurnout: function (drawNr_: number): string {
      // =====prepare input=====================================
      // drawNr_: track number to draw (1 | 2 | 3)
      let ret_=''
      let state_ = this.iTo3way1State // 1=right, 2=left, 3=stright
      if(state_ > 3) return ret_ //      not possible
      if(state_ < 0) state_ = 1
      const dir_ = Number(this.dir) // turnout 1 -< or 5 >-
      if(Number.isNaN(dir_)) return ret_
      if(dir_ !== 1 && dir_ !== 5) return ret_
      // .....number of used path tracks........................
      let aTrack = Array(25, 15, 58, 25, 15)
      if (dir_ === 5) aTrack = Array(16, 15, 14, 16, 15)
      // =====select path track number to draw==================
      const i_ = Number(drawNr_ + state_ - 2)
      if (i_ < 0  || i_ > 4) return ret_
      const dirTrack_=aTrack[i_]
      // =====return path of track to draw======================
      ret_ = this.pathTrack(dirTrack_)
      // console.log('pathTurnout: drawNr_', drawNr_ + ', state_=' + state_ + ', iTrack_=' + iTrack_+ ', ret_=' + ret_)
      return ret_
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

    // // _______path command: draw a track________________________
    // pathTrack: function (dirTrack_: number): string {
    //   // -----(positive) values of line length------------------
    //   const dxo2 = this.geof.dxo2()
    //   const dyo2 = this.geof.dyo2()
    //   const tk0x = -this.geof.tk.value[0].x
    //   const tk0y = -this.geof.tk.value[0].y
    //   const tk2 = this.geof.tk2
    //   const tkax = dxo2 - tk0x
    //   const tkbx = dxo2 + tk0x
    //   const tkcx = dxo2 - this.geof.tk.value[4].x
    //   const tkcy = dyo2 + this.geof.tk.value[5].y
    //   const tk59x = this.geof.dxo() - tkbx
    //   const tk59y = dyo2 - tkcy + tk0y
    //   // -----symbol "Section insulator" || --------------------
    //   const tks = tk2 / 2
    //   let s1 = ' M' + this.x + ',' + this.y
    //   switch (dirTrack_) {
    //     case 14: // ----- \_ direction--------------------------
    //       s1 += ' m' + (tk0x) + ',' + (-tk0y) // Tk0
    //       s1 += ' h' + (tkax)
    //       s1 += ' v' + (2 * tk0y)
    //       s1 += ' h' + (-tkbx) // Tk0´
    //       s1 += ' l' + (-tk59x) + ',' + (-tk59y) // Tk5
    //       s1 += ' v' + (-tkcy)
    //       s1 += ' h' + (tkcx)
    //       s1 += ' z'
    //       break
    //     case 15: // ----- -- direction--------------------------
    //       s1 += ' m' + (-dxo2) + ',' + (-tk0y) // Tk0
    //       s1 += ' v' + (2 * tk0y)
    //       s1 += ' h' + this.geof.dxo()
    //       s1 += ' v' + (-2 * tk0y)
    //       s1 += ' z'
    //       break
    //     case 16: // ----- /- direction--------------------------
    //       s1 += ' m' + (tk0x) + ',' + (tk0y) // Tk0
    //       s1 += ' h' + (tkax)
    //       s1 += ' v' + (-2 * tk0y)
    //       s1 += ' h' + (-tkbx) // Tk0´
    //       s1 += ' l' + (-tk59x) + ',' + (tk59y) // Tk5
    //       s1 += ' v' + (tkcy)
    //       s1 += ' h' + (tkcx)
    //       s1 += ' z'
    //       break
    //     case 25: // ----- _/ direction--------------------------
    //       s1 += ' m' + (-tk0x) + ',' + (-tk0y) // Tk0
    //       s1 += ' h' + (-tkax)
    //       s1 += ' v' + (2 * tk0y)
    //       s1 += ' h' + (tkbx) // Tk0´
    //       s1 += ' l' + tk59x + ',' + (-tk59y) // Tk5
    //       s1 += ' v' + (-tkcy)
    //       s1 += ' h' + (-tkcx)
    //       s1 += ' z'
    //       break
    //     case 58: // ----- -\ direction--------------------------
    //       s1 += ' m' + (-tk0x) + ',' + (tk0y)
    //       s1 += ' h' + (-tkax)
    //       s1 += ' v' + (-2 * tk0y)
    //       s1 += ' h' + (tkbx) // Tk0´
    //       s1 += ' l' + tk59x + ',' + (tk59y) // Tk5
    //       s1 += ' v' + (tkcy)
    //       s1 += ' h' + (-tkcx)
    //       s1 += ' z'
    //       break
    //     default:
    //   }
    //   return s1
    // },
    // _______on click: set turnout branch curve left/right_____
    onClkTop: function (): void {
      console.log(this.sid, 'Button-Click Top')
      // -----prepare send topics-------------------------------
      let aPubTopic = Array()
      if (this.to3way1?.pubTopic) {
        if(this.dir === '5') { // turnout 1 -< or 5 >-)
          aPubTopic = this.to3way1.pubTopicR.split(' ')
        } else {
          aPubTopic = this.to3way1.pubTopic.split(' ') 
        }
        // ---set payload to "curved"---------------------------
        const payload = rccTurnout3Way1Controller.payloadTurnoutCurved
        // ---publish message(s)--------------------------------
        aPubTopic.forEach(topic => {
          if (this.to3way1?.pubTopic) {
            rccTurnout3Way1Controller.publishRcc(topic, payload)
          }
        })
      }
    },
    // _______on click: set turnout to stright__________________
    onClkMid: function (): void {
      console.log(this.sid, 'Button-Click Mid')
      // -----prepare send topics-------------------------------
      if (this.to3way1?.pubTopic) {
        const aPubTopic = this.to3way1.pubTopic.split(' ')
        // ---set payload to "stright"--------------------------
        const payload = rccTurnout3Way1Controller.payloadTurnoutStright
        // ---publish message(s)--------------------------------
        aPubTopic.forEach(topic => {
          if (this.to3way1?.pubTopic) {
            rccTurnout3Way1Controller.publishRcc(topic, payload)
          }
        })
      }
    },
    // _______on click: set turnout branch curve left/right_____
    onClkBottom: function (): void {
      console.log(this.sid, 'Button-Click Bottom')
      // -----prepare send topics-------------------------------
      let aPubTopic = Array()
      if (this.to3way1?.pubTopic) {
        if(this.dir === '1') { // turnout 1 -< or 5 >-)
          aPubTopic = this.to3way1.pubTopicR.split(' ')
        } else {
          aPubTopic = this.to3way1.pubTopic.split(' ') 
        }
        // ---set payload to "curved"---------------------------
        const payload = rccTurnout3Way1Controller.payloadTurnoutCurved
        // ---publish message(s)--------------------------------
        aPubTopic.forEach(topic => {
          if (this.to3way1?.pubTopic) {
            rccTurnout3Way1Controller.publishRcc(topic, payload)
          }
        })
      }
    },
  },
})
</script>
