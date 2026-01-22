<!-- RccTrackIso1.vue -----------------------khartinger----- -->
<!-- 2026-01-01: new                                         -->

<template>
  <g>
  <!-- Do not change the order of the next three commands!-- -->
  <path :d="drawIso2" :fill="geof.colorBackground" :stroke="geof.colorBackground" stroke-width="1" ></path>
  <path :d="drawIso1" :fill="colorTrackIso" :stroke="colorTrackIso" stroke-width="1" ></path>
  <path :d="drawIso3" :fill="colorTrackIso" :stroke="colorTrackIso" stroke-width="1" ></path>
  <!-- ----------------------------------------------------- -->
</g>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Geof } from '../classes/Geo'

export default defineComponent({
  name: 'RccTrackIso1',
  components: {
    // RccBase,
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
    drawIso1: function (): string {
      return this.pathIso(1)
    },
    drawIso2: function (): string {
      return this.pathIso(2)
    },
    drawIso3: function (): string {
      return this.pathIso(3)
    },
    // _______color of the track________________________________
    colorTrackIso: function (): string {
      if (this.color !== '-') return this.color
      return this.geof.colorTrack
    },

  },
  methods: {
    pathIso: function (part: number): string {
      // -----symbol "Section insulator" || --------------------
      const tk2 = this.geof.tk2
      const tks = tk2 / 2
      const dxo2 = this.geof.dxo2()
      const dyo2 = this.geof.dyo2()
      const w = Math.sqrt(dxo2 * dxo2 + dyo2 * dyo2)
      const tk24 = dxo2 * tk2 / w
      const tk23 = dyo2 * tk2 / w
      const tks4 = dxo2 * tks / w
      const tks3 = dyo2 * tks / w
      const tkdx = 2 * tks3 + 2 * tk23
      const tkdy = 2 * tks4 + 2 * tk24
      let s1 = ' M' + this.x + ',' + this.y
      const dir_ = Number(this.dir)
      switch (dir_) {
        case 1: case 5:// === - horizontal======================
          switch (part) {
            case 1: // ----- 1. | x+ direction------------------
              s1 += ' m' + (-2 * tks) + ',' + (-tk2 - tks)
              s1 += ' v' + (2 * tk2 + 2 * tks)
              s1 += ' h' + (+tks)
              s1 += ' v' + (-2 * tk2 - 2 * tks)
              s1 += ' z'
              break
            case 2: // ----- 2. space x+ direction--------------
              s1 += ' m' + (-1 * tks) + ',' + (-tk2 - tks)
              s1 += ' v' + (2 * tk2 + 2 * tks)
              s1 += ' h' + (2 * tks)
              s1 += ' v' + (-2 * tk2 - 2 * tks)
              s1 += ' z'
              break
            case 3: // ----- 3. | x+ direction------------------
              s1 += ' m' + (tks) + ',' + (-tk2 - tks)
              s1 += ' v' + (2 * tk2 + 2 * tks)
              s1 += ' h' + (+tks)
              s1 += ' v' + (-2 * tk2 - 2 * tks)
              s1 += ' z'
              break
            default:
          }
          break // ===== END: - horizontal======================
        case 2: case 6: // == / right up========================
          switch (part) {
            case 1: // ----- 1. \ direction---------------------
              s1 += ' m' + (-(tk23 + tks3 + 2 * tks4)) + ',' + (-(tk24 + tks4 - 2 * tks3))
              s1 += ' l' + (tkdx) + ',' + (tkdy)
              s1 += ' l' + (tks4) + ',' + (-tks3)
              s1 += ' l' + (-tkdx) + ',' + (-tkdy)
              s1 += ' z'
              break
            case 2: // ----- 2. space \ direction---------------
              s1 += ' m' + (-(tk23 + tks3 + tks4)) + ',' + (-(tk24 + tks4 - tks3))
              s1 += ' l' + (tkdx) + ',' + (tkdy)
              s1 += ' l' + (2 * tks4) + ',' + (-2 * tks3)
              s1 += ' l' + (-tkdx) + ',' + (-tkdy)
              s1 += ' z'
              break
            case 3: // ----- 3. \ direction---------------------
              s1 += ' m' + (-(tk23 + tks3 - tks4)) + ',' + (-(tk24 + 2 * tks3))
              s1 += ' l' + (tkdx) + ',' + (tkdy)
              s1 += ' l' + (tks4) + ',' + (-tks3)
              s1 += ' l' + (-tkdx) + ',' + (-tkdy)
              s1 += ' z'
              break
            default:
          }
          break
        case 4: case 8: // == / right down======================
          switch (part) {
            case 1: // ----- 1. / direction---------------------
              s1 += ' m' + (-(tk23 + tks3 + 2 * tks4)) + ',' + ((tk24 + tks4 - 2 * tks3))
              s1 += ' l' + (tkdx) + ',' + (-tkdy)
              s1 += ' l' + (tks4) + ',' + (tks3)
              s1 += ' l' + (-tkdx) + ',' + (tkdy)
              s1 += ' z'
              break
            case 2: // ----- 2. space / direction---------------
              s1 += ' m' + (-(tk23 + tks3 + tks4)) + ',' + ((tk24 + tks4 - tks3))
              s1 += ' l' + (tkdx) + ',' + (-tkdy)
              s1 += ' l' + (2 * tks4) + ',' + (2 * tks3)
              s1 += ' l' + (-tkdx) + ',' + (tkdy)
              s1 += ' z'
              break
            case 3: // ----- 3. / direction---------------------
              s1 += ' m' + (-(tk23 + tks3 - tks4)) + ',' + ((tk24 + 2 * tks3))
              s1 += ' l' + (tkdx) + ',' + (-tkdy)
              s1 += ' l' + (tks4) + ',' + (tks3)
              s1 += ' l' + (-tkdx) + ',' + (tkdy)
              s1 += ' z'
              break
          }
          break
        default:
          break
      } // ============= END: switch dir_ ======================
      // console.log('pathIso: s1=', s1 + ' | dir_=' + dir_ + ' | part=' + part)
      return s1
    },
  },
})

</script>
