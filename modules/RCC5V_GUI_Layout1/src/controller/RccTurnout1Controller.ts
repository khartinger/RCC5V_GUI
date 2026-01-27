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
      {
        // ---turnout platform 1--------------------------------
        id: 'to105',
        name: 'Turnout105',
        iTurnout1State: -1,
        sDCC: '105',
        subTopic: 'rcc/module10/ret/105 rcc/module10/ret/status',
        pubTopic: 'rcc/module10/set/105',
        payloadInvert: false,
      },
      {
        // ---turnout 1-----------------------------------------
        id: 'to111',
        name: 'Turnout11-1',
        iTurnout1State: -1,
        sDCC: '111',
        subTopic: 'rcc/module11/ret/111 rcc/module11/ret/status',
        pubTopic: 'rcc/module11/set/111',
        payloadInvert: false,
      },
      {
        // ---turnout 1 north-----------------------------------
        id: 'to123',
        name: 'Turnout12-1',
        iTurnout1State: -1,
        sDCC: '123',
        subTopic: 'rcc/module12/ret/123 rcc/module12/ret/status',
        pubTopic: 'rcc/module12/set/123',
        payloadInvert: false,
      },
      {
        // ---turnout 2 east------------------------------------
        id: 'to128',
        name: 'Turnout2',
        iTurnout1State: -1,
        sDCC: '128',
        subTopic: 'rcc/module12/ret/128 rcc/module12/ret/status',
        pubTopic: 'rcc/module12/set/128',
        payloadInvert: false,
      },
      {
      // ---turnout 1-----------------------------------------
        id: 'to141',
        name: 'Turnout_141',
        iTurnout1State: -1,
        sDCC: '141',
        subTopic: 'rcc/module14/ret/141 rcc/module14/ret/status',
        pubTopic: 'rcc/module14/set/141',
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
