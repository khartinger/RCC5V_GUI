<!-- RccUncoupler1.vue ----------------------khartinger----- -->
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
import CiBase from './CiBase.vue'
import { Geof } from '../classes/Geo'

export default defineComponent({
  name: 'RccUncoupler1',
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
  },
  computed: {
    // =======standard methods==================================
    // _______find uncoupler1 object to given sid___________________
    uncoupler1: function (): Uncoupler1 | undefined {
      return rccUncoupler1Controller.turnouts1.find(uncoupler1 => uncoupler1.id === this.sid)
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
      if(this.dir === '1' || this.dir === '15') return 15
      if(this.dir === '2' || this.dir === '26') return 26
      if(this.dir === '8' || this.dir === '48') return 48
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
        if (this.color !== '-') return this.color
        return this.geof.colorUncouplerOn
      }
      return this.geof.colorUncouplerOff
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
      if(iDir_ === 26) {
        // ---track to the upper right--------------------------
        s1 += ' m' + (-(ucw3 + ucl4) / 2) + ',' + ((ucl3 - ucw4) / 2)
        s1 += ' l' + (ucw3) + ',' + (ucw4)
        s1 += ' l' + (ucl4) + ',' + (-ucl3)
        s1 += ' l' + (-ucw3) + ',' + (-ucw4)
        s1 += ' z'
        return s1
      }
      if(iDir_ === 48) {
        // ---track to the lower right--------------------------
        s1 += ' m' + ((ucw3 + ucl4) / 2) + ',' + ((ucl3 - ucw4) / 2)
        s1 += ' l' + (-ucw3) + ',' + (ucw4)
        s1 += ' l' + (-ucl4) + ',' + (-ucl3)
        s1 += ' l' + (+ucw3) + ',' + (-ucw4)
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
    pathTrack: function (trackNr_: Number): string {
      // -----(positive) values of line length------------------
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      const tk0y = -this.geof.tk.value[0].y
      const tkcx = dxo2 - this.geof.tk.value[4].x
      const tkcy = dyo2 + this.geof.tk.value[5].y
      let s1 = ' M' + this.x + ',' + this.y
      switch (trackNr_) {
        case 15: // ----- -- direction--------------------------
          s1 += ' m' + (-dxo2) + ',' + (-tk0y) // Tk0
          s1 += ' v' + (2 * tk0y)
          s1 += ' h' + this.geof.dxo()
          s1 += ' v' + (-2 * tk0y)
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
        default:
      }
      return s1
    },
    // _______on click: turn track energy on____________________
    onClkTop: function (): void {
      console.log(this.sid, 'Button-Click On')
      let payload = 'onClkOn: sid=' + this.sid
      const topic = 'rcc/error'
      if (!this.uncoupler1) rccUncoupler1Controller.publishCi(topic, payload)
      if (this.uncoupler1?.pubTopic) {
        const aPubTopic = this.uncoupler1.pubTopic.split(' ')
        payload = rccUncoupler1Controller.payloadOn
        aPubTopic.forEach(topic => {
          // if (this.uncoupler1?.pubPayload) payload = this.uncoupler1.pubPayload
          if (this.uncoupler1?.pubTopic) {
            rccUncoupler1Controller.publishCi(topic, payload)
          }
        })
      }
    },
    // _______on click: turn track energy off___________________
    onClkBottom: function (): void {
      console.log(this.sid, 'Button-Click Off')
      let payload = 'onClkOff: sid=' + this.sid
      const topic = 'rcc/error'
      if (!this.uncoupler1) rccUncoupler1Controller.publishCi(topic, payload)
      if (this.uncoupler1?.pubTopic) {
        const aPubTopic = this.uncoupler1.pubTopic.split(' ')
        payload = rccUncoupler1Controller.payloadOff
        aPubTopic.forEach(topic => {
          // if (this.uncoupler1?.pubPayload) payload = this.uncoupler1.pubPayload
          rccUncoupler1Controller.publishCi(topic, payload)
        })
      }

    },
  },
})
</script>
