// ______RccUncoupler1Controller.ts______________khartinger_____
// 2026-01-08: new
import { reactive } from 'vue'
import { Message } from '@/services/CiMqttClient'
import { CiBaseController, IBase } from './CiBaseController'

export interface Uncoupler1 extends IBase {
  iUncoupler1State: number;
  sDCC: string,
  textCenter?: string;
  textFooter?: string;
}

export class RccUncoupler1Controller extends CiBaseController {
  public payloadOn = '1'
  public payloadOff = '0'
  public sState0 = '0'
  public sState1 = '1'
  
  public turnouts1: Array<Uncoupler1> = reactive(
    [
    ],
  )

  public onMessage (message: Message): void {
    this.turnouts1.forEach(uncoupler1 => {
      const aSubTopic = uncoupler1.subTopic.split(' ')
      if (aSubTopic.includes(message.topic)) {
        // ---uncoupler1 topic found -------------------------------
        if (message.payload.length > 0) {
          try {
            const aPayload = JSON.parse(message.payload)
            // const sDCC = String(uncoupler1.pubTopic.split('/').pop())
            const sDCC_ = uncoupler1.sDCC
            const sState_ = aPayload[sDCC_]
            if (sState_ === this.sState0) uncoupler1.iUncoupler1State = 0
            if (sState_ === this.sState1) uncoupler1.iUncoupler1State = 1
          } catch (error) {
            uncoupler1.iUncoupler1State = -99
          }
        }
        // console.log('onMessage: topic=', message.topic + ', payload=' + message.payload)
        // console.log('onMessage: uncoupler1.iUncoupler1State=', uncoupler1.iUncoupler1State)
        // ---END: uncoupler1 topic found --------------------------
      }
    })
  }

  public publishCi (topic: string, payload: string): void {
    // console.log('RccUncoupler1Controller:publishCi:', '-t ' + topic + ' -m ' + payload)
    this.publish(topic, payload, false, 0).catch((e) => { console.error('RccUncoupler1Controller: ERROR:', e) })
  }
}

export const rccUncoupler1Controller = new RccUncoupler1Controller()
