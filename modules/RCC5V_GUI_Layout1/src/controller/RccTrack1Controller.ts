// ______RccTrack1Controller.ts___________________khartinger_____
// 2026-01-21: new
import { reactive } from 'vue'
import { Message } from '@/services/CiMqttClient'
import { CiBaseController, IBase } from './CiBaseController'

const WAIT_BETWEEN_MQTT_MSG_MS = 100
export interface Track1 extends IBase {
  iTrack1State: number;
  sDCC: string,
  payloadInvert: boolean;
}

export class RccTrack1Controller extends CiBaseController {
  public payloadTrackOn = '1'
  public payloadTrackOff = '0'
  public sState0 = '0'
  public sState1 = '1'

  public tracks1: Array<Track1> = reactive(
    [
      {
        // ---track 1-------------------------------------------
        id: 'tk011',
        name: 'track_011',
        iTrack1State: -99,
        sDCC: '11',
        subTopic: 'rcc/module01/ret/11 rcc/module01/ret/status',
        pubTopic: 'rcc/module01/set/11',
        payloadInvert: false,
      },
            {
        // ---track platform 2----------------------------------
        id: 'tk106',
        name: 'platform2',
        iTrack1State: -99,
        sDCC: '106',
        subTopic: 'rcc/module10/ret/106 rcc/module10/ret/status',
        pubTopic: 'rcc/module10/set/106',
        payloadInvert: false,
      },
      {
        // ---track platform 3----------------------------------
        id: 'tk107',
        name: 'platform3',
        iTrack1State: -99,
        sDCC: '107',
        subTopic: 'rcc/module10/ret/107 rcc/module10/ret/status',
        pubTopic: 'rcc/module10/set/107',
        payloadInvert: false,
      },
      {
        // ---track 2-------------------------------------------
        id: 'tk112',
        name: 'track1',
        iTrack1State: -99,
        sDCC: '112',
        subTopic: 'rcc/module11/ret/112 rcc/module11/ret/status',
        pubTopic: 'rcc/module11/set/112',
        payloadInvert: false,
      },
      {
        // ---track 1-------------------------------------------
        id: 'tk125',
        name: 'track1',
        iTrack1State: -99,
        sDCC: '125',
        subTopic: 'rcc/module12/ret/125 rcc/module12/ret/status',
        pubTopic: 'rcc/module12/set/125',
        payloadInvert: false,
      },
      {
        // ---track 1a------------------------------------------
        id: 'tk129',
        name: 'track1a',
        iTrack1State: -99,
        sDCC: '129',
        subTopic: 'rcc/module12/ret/129 rcc/module12/ret/status',
        pubTopic: 'rcc/module12/set/129',
        payloadInvert: false,
      },
      {
        // ---track 2-------------------------------------------
        id: 'tk126',
        name: 'track2',
        iTrack1State: -99,
        sDCC: '126',
        subTopic: 'rcc/module12/ret/126 rcc/module12/ret/status',
        pubTopic: 'rcc/module12/set/126',
        payloadInvert: false,
      },
      {
        // ---track 3-------------------------------------------
        id: 'tk127',
        name: 'track3',
        iTrack1State: -99,
        sDCC: '127',
        subTopic: 'rcc/module12/ret/127 rcc/module12/ret/status',
        pubTopic: 'rcc/module12/set/127',
        payloadInvert: false,
      },
      {
        // ---track 2-------------------------------------------
        id: 'tk133',
        name: 'track2',
        iTrack1State: -99,
        sDCC: '133',
        subTopic: 'rcc/module13/ret/133 rcc/module13/ret/status',
        pubTopic: 'rcc/module13/set/133',
        payloadInvert: false,
      },
    ],
  )

  //_____Check whether topic matches topics in tracks array_____
  // If so: analyze the message and act accordingly
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
              if (track1.payloadInvert) track1.iTrack1State = 1
            }
            if (sState_ === this.sState1) {
              track1.iTrack1State = 1
              if (track1.payloadInvert) track1.iTrack1State = 0
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

  // ____publish a MQTT message_________________________________
  public publishCi (topic: string, payload: string): void {
    // console.log('RccTrack1Controller:publishCi:', '-t ' + topic + ' -m ' + payload)
    this.publish(topic, payload, false, 0).catch((e) => { console.error('RccTrack1Controller: ERROR:', e) })
  }

  // ____publish message: "All tracks on"_______________________
  public async sendAllTracksOn(): Promise<void> {
    for (const track of this.tracks1) {
      try {
        await this.publish(track.pubTopic, this.payloadTrackOn, false, 0)
        await sleep(WAIT_BETWEEN_MQTT_MSG_MS) // 0,1s delay
      } catch (e) {
        console.error('RccTrack1Controller:', e)
      }
    }
  }

  // ____publish message: "All tracks off"______________________
  public async sendAllTracksOff(): Promise<void> {
    for (const track of this.tracks1) {
      try {
        await this.publish(track.pubTopic, this.payloadTrackOff, false, 0)
        await sleep(WAIT_BETWEEN_MQTT_MSG_MS) // 0,1s delay
      } catch (e) {
        console.error('RccTrack1Controller:', e)
      }
    }
  }

} // END OF export class RccTrack1Controller


// ______sleep given milliseconds_______________________________
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const rccTrack1Controller = new RccTrack1Controller()
