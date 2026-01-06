// ______RccTrack1Controller.ts___________________khartinger_____
// 2026-01-01: new
import { reactive } from 'vue'
import { Message } from '@/services/CiMqttClient'
import { CiBaseController, IBase } from './CiBaseController'

export interface Track1 extends IBase {
  iTrack1State: number;
  sDCC: string,
  textCenter?: string;
  textFooter?: string;
}

export class RccTrack1Controller extends CiBaseController {
  public payloadTrackOn = '1'
  public payloadTrackOff = '0'
  public sState0 = 'Aus'
  public sState1 = 'Ein'

  public tracks1: Array<Track1> = reactive(
    [
      {
        // ---test track 1--------------------------------------
        id: 'tk1',
        name: 'Track1',
        iTrack1State: -99,
        sDCC: '41',
        subTopic: 'rcc/demo1/ret/41 rcc/demo1/ret/bydcc',
        pubTopic: 'rcc/demo1/set/41',
        get subTopic1 () {
          return `rcc/demo1/ret/${this.sDCC} rcc/demo1/ret/bydcc`
        },
      },
    ],
  )

  public onMessage (message: Message): void {
    this.tracks1.forEach(track1 => {
      const aSubTopic = track1.subTopic.split(' ')
      if (aSubTopic.includes(message.topic)) {
        // ---track1 topic found -------------------------------
        if (message.payload.length > 0) {
          if (message.topic.includes('ret/bydcc')) {
            try {
              const aPayload = JSON.parse(message.payload)
              // const sDCC = String(track1.pubTopic.split('/').pop())
              const sDCC = track1.sDCC
              const sState = aPayload[sDCC]
              if (sState === this.sState0) track1.iTrack1State = 0
              if (sState === this.sState1) track1.iTrack1State = 1
              // console.log('onMessage: sState=', sState)
            } catch (error) {
              track1.iTrack1State = -99
            }
          } else {
            const char0 = message.payload.at(0)
            track1.iTrack1State = -1
            if (char0 === '0') track1.iTrack1State = 0
            if (char0 === '1') track1.iTrack1State = 1
            if (char0 === '2') track1.iTrack1State = 2
            // console.log('onMessage: char0=', char0)
          }
        }
        // console.log('onMessage: message.topic=', message.topic)
        // console.log('onMessage: message.payload=', message.payload)
        console.log('onMessage: track1.iTrack1State=', track1.iTrack1State)
        // ---END: track1 topic found --------------------------
      }
    })
  }

  public publishCi (topic: string, payload: string): void {
    // console.log('CiTrack1Controller:publishCi:', '-t ' + topic + ' -m ' + payload)
    this.publish(topic, payload, false, 0).catch((e) => { console.error('CiTrack1Controller: ERROR:', e) })
  }
}

export const rccTrack1Controller = new RccTrack1Controller()
