// ______RccTurnout1Controller.ts___________________khartinger_____
// 2026-01-21: new
import { reactive } from 'vue'
import { Message } from '@/services/RccMqttClient'
import { RccBaseController, IBase } from './RccBaseController'

export interface Turnout1 extends IBase {
  iTurnout1State: number;
  sDCC: string,
  payloadInvert: boolean;
}

export class RccTurnout1Controller extends RccBaseController {
  public payloadTurnoutStright = '1'
  public payloadTurnoutCurved = '0'
  public sState0 = '0'
  public sState1 = '1'
  
  public turnouts1: Array<Turnout1> = reactive(
    [
      {
        // ---turnout 1a----------------------------------------
        id: 'to012a',
        name: 'Turnout_012a',
        iTurnout1State: -1,
        sDCC: '12',
        subTopic: 'rcc/module01/ret/12 rcc/module01/ret/status',
        pubTopic: 'rcc/module01/set/12',
        payloadInvert: false,
      },
      {
        // ---turnout 1b----------------------------------------
        id: 'to012b',
        name: 'Turnout_012b',
        iTurnout1State: -1,
        sDCC: '12',
        subTopic: 'rcc/module01/ret/12 rcc/module01/ret/status',
        pubTopic: 'rcc/module01/set/12',
        payloadInvert: false,
      },
    ],
  )

  public onMessage (message: Message): void {
    this.turnouts1.forEach(turnout1 => {
      const aSubTopic = turnout1.subTopic.split(' ')
      if (aSubTopic.includes(message.topic)) {
        // ---turnout1 topic found -------------------------------
        if (message.payload.length > 0) {
          try {
            const aPayload = JSON.parse(message.payload)
            const sDCC_ = turnout1.sDCC
            const sState_ = aPayload[sDCC_]
            if (sState_ === this.sState0) {
              turnout1.iTurnout1State = 0
              if(turnout1.payloadInvert) turnout1.iTurnout1State = 1
            }
            if (sState_ === this.sState1) {
              turnout1.iTurnout1State = 1
              if(turnout1.payloadInvert) turnout1.iTurnout1State = 0
            }
            // console.log('onMessage: sState=', sState)
          } catch (error) {
            turnout1.iTurnout1State = -99
          }
        }
        // console.log('onMessage: topic=', message.topic + ', payload=' + message.payload)
        // console.log('onMessage: turnout1.iTurnout1State=', turnout1.iTurnout1State)
        // ---END: turnout1 topic found --------------------------
      }
    })
  }

  public publishRcc (topic: string, payload: string): void {
    // console.log('CiTurnout1Controller:publishRcc:', '-t ' + topic + ' -m ' + payload)
    this.publish(topic, payload, false, 0).catch((e) => { console.error('RccTurnout1Controller: ERROR:', e) })
  }
}

export const rccTurnout1Controller = new RccTurnout1Controller()
