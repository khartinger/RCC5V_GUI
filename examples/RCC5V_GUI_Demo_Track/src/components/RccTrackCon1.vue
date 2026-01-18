<!-- RccTrackCon1.vue -----------------------khartinger----- -->
<!-- 2026-01-01: new                                         -->

<template>
  <g>
  <path :d="drawCon1" :fill="colorTrackCon" :stroke="colorTrackCon" stroke-width="1" ></path>
  <!-- ----------------------------------------------------- -->
</g>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Geof } from '../classes/Geo'

export default defineComponent({
  name: 'RccTrackCon1',
  components: {
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
    sid: {
      type: String,
      required: false,
    },
    dir: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: '-',
    },
  },
  computed: {
    // =======standard methods==================================
    // _______provide geometric data____________________________
    geof: function (): Geof {
      const geo1 = new Geof(this.x, this.y, 1, 1)
      return geo1
    },
    drawCon1: function (): string {
      return this.pathCon()
    },
    // _______color of the track________________________________
    colorTrackCon: function (): string {
      if (this.color.length > 1) return this.color
      /*
      if (this.iTrack1State === 0) return this.geof.colorTrackOff
      if (this.iTrack1State === 1) return this.geof.colorTrackOn
      if (this.iTrack1State === 2) return this.geof.colorTrackUsed
      if (this.iTrack1State === -99) return this.geof.colorTrackUnknown
      */
      return this.geof.colorTrack
    },
  },
  methods: {
    pathCon: function (): string {
      // -----symbol "Section insulator" || --------------------
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      const tkcx = dxo2 - this.geof.tk.value[4].x
      const tkcy = dyo2 + this.geof.tk.value[5].y
      let s1 = ' M' + this.x + ',' + this.y
      const dir_ = Number(this.dir)
      switch (dir_) {
        case 2: case 6:// === track left up /===================
          // s1 += ' m' + (+dxo2) + ',' + (-dyo2)
          s1 += ' v' + (-tkcy)
          s1 += ' l' + (-tkcx) + ',' + (+tkcy)
          s1 += ' z'
          s1 += ' h' + (+tkcx)
          s1 += ' l' + (-tkcx) + ',' + (+tkcy)
          s1 += ' z'
          break
        case 4: case 8:// === track left down /=================
          s1 += ' v' + (+tkcy)
          s1 += ' l' + (-tkcx) + ',' + (-tkcy)
          s1 += ' z'
          s1 += ' h' + (+tkcx)
          s1 += ' l' + (-tkcx) + ',' + (-tkcy)
          s1 += ' z'
          break
        default:
      } // ============= END: switch dir_ ======================
      // console.log('pathIso: s1=', s1 + ' | dir_=' + dir_ + ' | part=' + part)
      return s1
    },
  },
})

</script>
