<!-- RccUncoupler1.vue ----------------------khartinger----- -->
<!-- 2026-01-26: new                                         -->

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
  <path :d="drawUncouplerTrack" :fill="colorUncouplerTrack" :stroke="colorUncouplerTrack" stroke-width="1" />
  <path :d="drawUncouplerBlock" :fill="colorUncouplerBlock" :stroke="colorUncouplerBlock" stroke-width="1" />
  <!--define click area------------------------------------- -->
  <path :d="pathTop" @click="onClkTop()" class="ciClick" />
  <path :d="pathBottom" @click="onClkBottom()" class="ciClick" />
</g>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Uncoupler1, rccUncoupler1Controller } from '../controller/RccUncoupler1Controller'
import RccBase from './RccBase.vue'
import { Geof } from '../classes/Geo'

export default defineComponent({
  name: 'RccUncoupler1',
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
    // _______find uncoupler1 object to given sid___________________
    uncoupler1: function (): Uncoupler1 | undefined {
      return rccUncoupler1Controller.uncouplers1.find(uncoupler1 => uncoupler1.id === this.sid)
    },
    // _______get iUncoupler1State__________________________________
    iUncoupler1State: function (): number {
      return this.uncoupler1?.iUncoupler1State ?? -1
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
      // console.log('drawXAxis: xAxis=', this.xAxis + ' ret=' + String(ret))
      return ret
    },
    // _______direction of the track____________________________
    // return 15=horizontal, 26=right up, 48=right down, 0=error
    iDir: function(): number {
      if (['1','15','51'].includes(this.dir)) return 15
      if (['2','6','26','62'].includes(this.dir)) return 26
      if (['4','8','48','84'].includes(this.dir)) return 48
      return 0;
    },
    // _______draw the active path of the turnout_______________
    drawUncouplerTrack: function(): string {
      return this.pathUncouplerTrack()
    },
    drawUncouplerBlock: function(): string {
      return this.pathUncouplerBlock()
    },
    // _______color of the track________________________________
    colorUncouplerTrack: function (): string {
      // if (this.color !== '-') return this.color
      return this.geof.colorTrack
    },
    // _______color of the active block_________________________
    colorUncouplerBlock: function (): string {
      if (this.iUncoupler1State === 1) {
        if (this.color.length > 1) return this.color
        return this.geof.colorUncouplerOn
      }
      return this.geof.colorUncouplerOff
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
      switch (this.iDir)
      {
        case 15: 
          s1 += ' M' + this.x + ',' + this.y
          s1 += ' m' + (-dxo2) + ',' + (-dyo2)
          s1 += ' v' + dyo2
          s1 += ' h' + dxo
          s1 += ' v' + (-dyo2)
          s1 += ' z'
          break
        case 26:
          s1 += ' M' + this.x + ',' + this.y
          s1 += ' m' + dxo2 + ',' + (-dyo2)
          s1 += ' h' + (-dxo)
          s1 += ' v' + dyo
          s1 += ' z'
          break
        case 48:
          s1 += ' M' + this.x + ',' + this.y
          s1 += ' m' + (-dxo2) + ',' + (-dyo2)
          s1 += ' h' + dxo
          s1 += ' v' + dyo
          s1 += ' z'
          break
          default:
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
      switch (this.iDir)
      {
        case 15: 
          s1 += ' M' + this.x + ',' + this.y
          s1 += ' m' + (-dxo2) + ',' + (dyo2)
          s1 += ' h' + dxo
          s1 += ' v' + (-dyo2)
          s1 += ' h' + (-dxo)
          s1 += ' z'
          break
        case 26:
          s1 += ' M' + this.x + ',' + this.y
          s1 += ' m' + (-dxo2) + ',' + (dyo2)
          s1 += ' h' + dxo
          s1 += ' v' + (-dyo)
          s1 += ' z'
          break
        case 48:
          s1 += ' M' + this.x + ',' + this.y
          s1 += ' m' + (-dxo2) + ',' + (-dyo2)
          s1 += ' v' + dyo
          s1 += ' h' + dxo
          s1 += ' z'
          break
          default:
      }
      return s1
    },

  },
  methods: {
    // _______draw the inner rectangle ("block")________________
    pathUncouplerBlock: function (): string {
      const iDir_ = this.iDir
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      const tk2 = this.geof.tk2
      const ucl2 = dxo2 / 2
      const ucw2 = tk2 * 0.8
      const w = Math.sqrt(dxo2 * dxo2 + dyo2 * dyo2)
      const ucl3 = 2 * ucl2 * dyo2 / w
      const ucl4 = 2 * ucl2 * dxo2 / w
      const ucw3 = 2 * ucw2 * dyo2 / w
      const ucw4 = 2 * ucw2 * dxo2 / w
      let s1 = ' M' + this.x + ',' + this.y
      if(iDir_ === 15) {
        // ---track to the right--------------------------------
        s1 += ' m' + (-ucl2) + ',' + (-ucw2)
        s1 += ' v' + (2 * ucw2)
        s1 += ' h' + (2 * ucl2)
        s1 += ' v' + (-2 * ucw2)
        s1 += ' z'
        return s1
      }
      let sgnx = 1
      if(iDir_ === 26) sgnx = -1
      if(iDir_ === 26 || iDir_ === 48) {
        // ---track to the lower right--------------------------
        s1 += ' m' + sgnx * ((ucw3 + ucl4) / 2) + ',' + ((ucl3 - ucw4) / 2)
        s1 += ' l' + sgnx * (-ucw3) + ',' + (ucw4)
        s1 += ' l' + sgnx * (-ucl4) + ',' + (-ucl3)
        s1 += ' l' + sgnx * (+ucw3) + ',' + (-ucw4)
        s1 += ' z'
        return s1
      }
      return ''
    },
    // _______draw the path of the track________________________
    pathUncouplerTrack: function (): string {
      return this.pathTrack(this.iDir)
    
    },
    // _______path command: draw a track________________________
    // pathTrack: function (trackNr_: Number): string {
    pathTrack: function (trackNr_: Number): string {
      // -----signs for drawing---------------------------------
      let sgnx = 1
      // -----(positive) values of line length------------------
      const tk2 = this.geof.tk2
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      const q1x = dxo2 - this.geof.tkp.value[1].x
      const q2y = dyo2 - this.geof.tkp.value[2].y
      let s1 = ' M' + this.x + ',' + this.y
      switch (trackNr_) {
        // ===horizontel line===================================
        case 15:
          s1 += ' m' + dxo2 + ',' + tk2 // P0 as start
          s1 += ' v' + (-2 * tk2)
          s1 += ' h' + (-2) * dxo2
          s1 += ' v' + (2 * tk2)
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
        default:
          s1 = ''
      }
      return s1
    },
    // _______on click: turn uncoupler on_______________________
    onClkTop: function (): void {
      console.log(this.sid, 'Button-Click On')
      // -----is there a uncouPler?-----------------------------
      let payload = 'onClkOn: sid=' + this.sid
      const topicE = 'rcc/error'
      if (!this.uncoupler1) rccUncoupler1Controller.publishRcc(topicE, payload)
      // -----is there a topic for publishing?------------------
      if (this.uncoupler1?.pubTopic) {
        const aPubTopic = this.uncoupler1.pubTopic.split(' ')
        // ---prepare payload (1)-------------------------------
        payload = rccUncoupler1Controller.payloadOn
        // ---publish message(s)--------------------------------
        aPubTopic.forEach(topic => {
          if (this.uncoupler1?.pubTopic) {
            rccUncoupler1Controller.publishRcc(topic, payload)
          }
        })
      }
    },
    // _______on click: turn track energy off___________________
    onClkBottom: function (): void {
      console.log(this.sid, 'Button-Click Off')
      // -----is there a uncouPler?-----------------------------
      let payload = 'onClkOff: sid=' + this.sid
      const topicE = 'rcc/error'
      if (!this.uncoupler1) rccUncoupler1Controller.publishRcc(topicE, payload)
      // -----is there a topic for publishing?------------------
      if (this.uncoupler1?.pubTopic) {
        const aPubTopic = this.uncoupler1.pubTopic.split(' ')
        // ---prepare payload (0)-------------------------------
        payload = rccUncoupler1Controller.payloadOff
        // ---publish message(s)--------------------------------
        aPubTopic.forEach(topic => {
          rccUncoupler1Controller.publishRcc(topic, payload)
        })
      }
    },
  },
})
</script>
