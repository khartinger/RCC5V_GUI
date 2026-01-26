// ______RccTurnout1Controller.ts___________________khartinger_____
// 2026-01-22: new
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

  // _________Array for all turnouts____________________________
  public turnouts1: Array<Turnout1> = reactive(
    [
      {
        // ---turnout 1-----------------------------------------
        id: 'to1',
        name: 'Turnout1',
        iTurnout1State: -1,
        sDCC: '21',
        subTopic: 'rcc/demo1/ret/21 rcc/demo1/ret/status',
        pubTopic: 'rcc/demo1/set/21',
        payloadInvert: false,
      },
    ],
  )

  // _________receive a mqtt message____________________________
  public onMessage (message: Message): void {
    this.turnouts1.forEach(turnout1 => {
      const aSubTopic = turnout1.subTopic.split(' ')
      if (aSubTopic.includes(message.topic)) {
        // ---turnout1 topic found -----------------------------
        if (message.payload.length > 0) {
          // ------message received: split JSON-data------------
          try {
            const aPayload = JSON.parse(message.payload)
            const sDCC_ = turnout1.sDCC
            const sState_ = aPayload[sDCC_]
            // ----calculate the state number-------------------
            if (sState_ === this.sState0) {
              turnout1.iTurnout1State = 0
              if(turnout1.payloadInvert) turnout1.iTurnout1State = 1
            }
            if (sState_ === this.sState1) {
              turnout1.iTurnout1State = 1
              if(turnout1.payloadInvert) turnout1.iTurnout1State = 0
            }
          } catch (error) {
            turnout1.iTurnout1State = -99
          }
        }
        // ---END: turnout1 topic found --------------------------
      }
    })
  }

  // _________publish a mqtt message____________________________
  public publishRcc (topic: string, payload: string): void {
    // console.log('CiTurnout1Controller:publishRcc:', '-t ' + topic + ' -m ' + payload)
    this.publish(topic, payload, false, 0).catch((e) => { console.error('RccTurnout1Controller: ERROR:', e) })
  }
}

export const rccTurnout1Controller = new RccTurnout1Controller()
