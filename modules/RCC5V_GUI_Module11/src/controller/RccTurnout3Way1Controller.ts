// ______RccTurnout3Way1Controller.ts____________khartinger_____
// 2026-01-08: new
import { reactive } from 'vue'
import { Message } from '@/services/CiMqttClient'
import { CiBaseController, IBase } from './CiBaseController'

export interface To3way1 extends IBase {
  iLState: number;
  iRState: number;
  sDCCL: string,
  sDCCR: string,
  pubTopicR: string,
  textCenter?: string;
  textFooter?: string;
}

export class RccTurnout3Way1Controller extends CiBaseController {
  public payloadTurnoutStright = '1'
  public payloadTurnoutCurved = '0'
  public sState0 = '0'
  public sState1 = '1'
  
  public to3ways1: Array<To3way1> = reactive(
    [
    ],
  )

  public onMessage (message: Message): void {
    this.to3ways1.forEach(to3way1 => {
      const aSubTopic = to3way1.subTopic.split(' ')
      if (aSubTopic.includes(message.topic)) {
        // ---to3way1 topic found ---------------------------
        if (message.payload.length > 0) {
          try {
            const aPayload = JSON.parse(message.payload)
            // const sDCC = String(to3way1.pubTopic.split('/').pop())
            let sDCC_ = to3way1.sDCCL
            let sState_ = aPayload[sDCC_]
            if (sState_ === this.sState0) to3way1.iLState = 0
            if (sState_ === this.sState1) to3way1.iLState = 1
            sDCC_ = to3way1.sDCCR
            sState_ = aPayload[sDCC_]
            if (sState_ === this.sState0) to3way1.iRState = 0
            if (sState_ === this.sState1) to3way1.iRState = 1
            // console.log('onMessage: sState=', sState)
          } catch (error) {
            to3way1.iLState = -9
            to3way1.iRState = -9
          }
        }
        // console.log('onMessage: topic=', message.topic + ', payload=' + message.payload)
        //console.log('onMessage: iLState=', to3way1.iLState + ', iRState=' + to3way1.iRState)
        // ---END: to3way1 topic found --------------------
      }
    })
  }

  public publishCi (topic: string, payload: string): void {
    // console.log('RccTurnout3Way1Controller:publishCi:', '-t ' + topic + ' -m ' + payload)
    this.publish(topic, payload, false, 0).catch((e) => { console.error('RccTurnout3Way1Controller: ERROR:', e) })
  }
}

export const rccTurnout3Way1Controller = new RccTurnout3Way1Controller()
