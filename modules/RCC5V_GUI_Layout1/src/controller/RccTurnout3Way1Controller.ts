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
  
  public to3ways1: Array<To3way1> = reactive(
    [
      {
        // ---turnout station bypass----------------------------
        id: 'tt101',
        name: 'To3way1',
        iLState: -10,
        iRState: -10,
        sDCCL: '101',
        sDCCR: '102',
        subTopic: 'rcc/module10/ret/101 rcc/module10/ret/102 rcc/module10/ret/status',
        pubTopic: 'rcc/module10/set/101',
        pubTopicR: 'rcc/module10/set/102',
      },
      {
        // ---turnout station-----------------------------------
        id: 'tt103',
        name: 'To3way103',
        iLState: -10,
        iRState: -10,
        sDCCL: '103',
        sDCCR: '104',
        subTopic: 'rcc/module10/ret/103 rcc/module10/ret/104 rcc/module10/ret/status',
        pubTopic: 'rcc/module10/set/103',
        pubTopicR: 'rcc/module10/set/104',
      },
      {
        // ---turnout station bypass----------------------------
        id: 'tt121',
        name: 'To3way1',
        iLState: -10,
        iRState: -10,
        sDCCL: '121',
        sDCCR: '122',
        subTopic: 'rcc/module12/ret/121 rcc/module12/ret/122 rcc/module12/ret/status',
        pubTopic: 'rcc/module12/set/121',
        pubTopicR: 'rcc/module12/set/122',
      },
      {
        // ---turnout station bypass----------------------------
        id: 'tt132',
        name: 'To3way1',
        iLState: -10,
        iRState: -10,
        sDCCL: '131',
        sDCCR: '132',
        subTopic: 'rcc/module13/ret/131 rcc/module13/ret/132 rcc/module13/ret/status',
        pubTopic: 'rcc/module13/set/131',
        pubTopicR: 'rcc/module13/set/132',
      },
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

  public publishRcc (topic: string, payload: string): void {
    // console.log('RccTurnout3Way1Controller:publishRcc:', '-t ' + topic + ' -m ' + payload)
    this.publish(topic, payload, false, 0).catch((e) => { console.error('RccTurnout3Way1Controller: ERROR:', e) })
  }
}

export const rccTurnout3Way1Controller = new RccTurnout3Way1Controller()
