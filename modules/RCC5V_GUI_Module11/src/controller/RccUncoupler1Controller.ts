// ______RccUncoupler1Controller.ts______________khartinger_____
// 2026-01-26: new
import { reactive } from 'vue'
import { Message } from '@/services/RccMqttClient'
import { RccBaseController, IBase } from './RccBaseController'

export interface Uncoupler1 extends IBase {
  iUncoupler1State: number;
  sDCC: string,
}

export class RccUncoupler1Controller extends RccBaseController {
  public payloadOn = '1'
  public payloadOff = '0'
  public sState0 = '0'
  public sState1 = '1'
  
  // _________Array for all uncouplers__________________________
  public uncouplers1: Array<Uncoupler1> = reactive(
    [
      {
        // ---uncoupler platform 1------------------------------
        id: 'uc113',
        name: 'Uncoupler1',
        iUncoupler1State: 0,
        sDCC: '113',
        subTopic: 'rcc/module11/ret/113 rcc/module11/ret/status',
        pubTopic: 'rcc/module11/set/113',
      },
    ],
  )

  // _________receive a mqtt message____________________________
  public onMessage (message: Message): void {
    this.uncouplers1.forEach(uncoupler1 => {
      const aSubTopic = uncoupler1.subTopic.split(' ')
      if (aSubTopic.includes(message.topic)) {
        // ---uncoupler1 topic found ---------------------------
        if (message.payload.length > 0) {
          // ------message received: split JSON-data------------
          try {
            const aPayload = JSON.parse(message.payload)
            const sDCC_ = uncoupler1.sDCC
            const sState_ = aPayload[sDCC_]
            // ----calculate the state number-------------------
            if (sState_ === this.sState0) uncoupler1.iUncoupler1State = 0
            if (sState_ === this.sState1) uncoupler1.iUncoupler1State = 1
          } catch (error) {
            uncoupler1.iUncoupler1State = -99
          }
        }
        // ---END: uncoupler1 topic found --------------------------
      }
    })
  }
  
  // _________publish a mqtt message____________________________
  public publishRcc (topic: string, payload: string): void {
    // console.log('RccUncoupler1Controller:publishRcc:', '-t ' + topic + ' -m ' + payload)
    this.publish(topic, payload, false, 0).catch((e) => { console.error('RccUncoupler1Controller: ERROR:', e) })
  }
}

export const rccUncoupler1Controller = new RccUncoupler1Controller()
