// ______RccTurnout3Way1Controller.ts____________khartinger_____
// 2026-01-21: new
import { reactive } from 'vue'
import { Message } from '@/services/RccMqttClient'
import { RccBaseController, IBase } from './RccBaseController'

export interface To3way1 extends IBase {
  iLState: number;
  iRState: number;
  sDCCL: string,
  sDCCR: string,
  pubTopicR: string,
}

export class RccTurnout3Way1Controller extends RccBaseController {
  public payloadTurnoutStright = '1'
  public payloadTurnoutCurved = '0'
  public sState0 = '0'
  public sState1 = '1'
  
  // _________Array for all (3way-)turnouts_____________________
  public to3ways1: Array<To3way1> = reactive(
    [
      {
        // ---test track 1--------------------------------------
        id: 't3w1',
        name: 'To3way1',
        iLState: -10,
        iRState: -10,
        sDCCL: '31',
        sDCCR: '32',
        subTopic: 'rcc/demo1/ret/31 rcc/demo1/ret/32 rcc/demo1/ret/status',
        pubTopic: 'rcc/demo1/set/31',
        pubTopicR: 'rcc/demo1/set/32',
      },
    ],
  )

  // _________receive a mqtt message____________________________
  public onMessage (message: Message): void {
    this.to3ways1.forEach(to3way1 => {
      const aSubTopic = to3way1.subTopic.split(' ')
      if (aSubTopic.includes(message.topic)) {
        // ---to3way1 topic found ---------------------------
        if (message.payload.length > 0) {
          // ------message received: split JSON-data------------
          try {
            const aPayload = JSON.parse(message.payload)
            let sDCC_ = to3way1.sDCCL
            let sState_ = aPayload[sDCC_]
            // ----calculate the state number-------------------
            if (sState_ === this.sState0) to3way1.iLState = 0
            if (sState_ === this.sState1) to3way1.iLState = 1
            sDCC_ = to3way1.sDCCR
            sState_ = aPayload[sDCC_]
            if (sState_ === this.sState0) to3way1.iRState = 0
            if (sState_ === this.sState1) to3way1.iRState = 1
          } catch (error) {
            to3way1.iLState = -9
            to3way1.iRState = -9
          }
        }
        // ---END: to3way1 topic found --------------------
      }
    })
  }
  
  // _________publish a mqtt message____________________________
  public publishRcc (topic: string, payload: string): void {
    // console.log('RccTurnout3Way1Controller:publishRcc:', '-t ' + topic + ' -m ' + payload)
    this.publish(topic, payload, false, 0).catch((e) => { console.error('RccTurnout3Way1Controller: ERROR:', e) })
  }
}

export const rccTurnout3Way1Controller = new RccTurnout3Way1Controller()
