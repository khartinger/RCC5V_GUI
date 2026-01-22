// ______RccTrack1Controller.ts___________________khartinger_____
// 2026-01-21: new
import { reactive } from 'vue'
import { Message } from '@/services/RccMqttClient'
import { RccBaseController, IBase } from './RccBaseController'

export interface Track1 extends IBase {
  iTrack1State: number;
  sDCC: string,
  payloadInvert: boolean;
}

export class RccTrack1Controller extends RccBaseController {
  public payloadTrackOn = '1'
  public payloadTrackOff = '0'
  public sState0 = '0'
  public sState1 = '1'

  public tracks1: Array<Track1> = reactive(
    [
      {
        // ---test track 1--------------------------------------
        id: 'tk1',
        name: 'Track1',
        iTrack1State: -99,
        sDCC: '41',
        subTopic: 'rcc/demo1/ret/41 rcc/demo1/ret/status',
        pubTopic: 'rcc/demo1/set/41',
        payloadInvert: false,
      },
      {
        // ---test track 1a--------------------------------------
        id: 'to1',
        name: 'Track1',
        iTrack1State: -99,
        sDCC: '21',
        subTopic: 'rcc/demo1/ret/21 rcc/demo1/ret/status',
        pubTopic: 'rcc/demo1/set/21',
        payloadInvert: true,
      },
      {
      // ---test track 2--------------------------------------
        id: 'to2',
        name: 'Track2',
        iTrack1State: -99,
        sDCC: '21',
        subTopic: 'rcc/demo1/ret/21 rcc/demo1/ret/status',
        pubTopic: 'rcc/demo1/set/21',
        payloadInvert: false,
      },
    ],
  )

  public onMessage (message: Message): void {
    this.tracks1.forEach(track1 => {
      const aSubTopic = track1.subTopic.split(' ')
      if (aSubTopic.includes(message.topic)) {
      // ---track1 topic found -------------------------------
        if (message.payload.length > 0) {
          try {
            const aPayload = JSON.parse(message.payload)
            const sDCC_ = track1.sDCC
            const sState_ = aPayload[sDCC_]
            if (sState_ === this.sState0) {
              track1.iTrack1State = 0
              if(track1.payloadInvert) track1.iTrack1State = 1
            }
            if (sState_ === this.sState1) {
              track1.iTrack1State = 1
              if(track1.payloadInvert) track1.iTrack1State = 0
            }
            // console.log('onMessage: sState=', sState)
          } catch (error) {
            track1.iTrack1State = -99
          }
        }
        // console.log('onMessage: track1.iTrack1State=', track1.iTrack1State)
        // ---END: track1 topic found --------------------------
      }
    })
  }

  public publishRcc (topic: string, payload: string): void {
    // console.log('RccTrack1Controller:publishRcc:', '-t ' + topic + ' -m ' + payload)
    this.publish(topic, payload, false, 0).catch((e) => { console.error('RccTrack1Controller: ERROR:', e) })
  }
}

export const rccTrack1Controller = new RccTrack1Controller()
