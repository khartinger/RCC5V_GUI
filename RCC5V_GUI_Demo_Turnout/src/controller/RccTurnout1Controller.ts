// ______RccTurnout1Controller.ts___________________khartinger_____
// 2026-01-01: new
import { reactive } from 'vue'
import { Message } from '@/services/CiMqttClient'
import { CiBaseController, IBase } from './CiBaseController'

export interface Turnout1 extends IBase {
  iTurnout1State: number;
  sDCC: string,
  textCenter?: string;
  textFooter?: string;
}

export class RccTurnout1Controller extends CiBaseController {
  public payloadTurnoutStright = '1'
  public payloadTurnoutCurved = '0'
  public sState0 = 'Abzweig'
  public sState1 = 'Gerade'
  
  public tracks1: Array<Turnout1> = reactive(
    [
      {
        // ---test track 1--------------------------------------
        id: 'to1',
        name: 'Turnout1',
        iTurnout1State: -1,
        sDCC: '21',
        subTopic: 'rcc/demo1/ret/21 rcc/demo1/ret/bydcc',
        pubTopic: 'rcc/demo1/set/21',
        get subTopic1 () {
          return `rcc/demo1/ret/${this.sDCC} rcc/demo1/ret/bydcc`
        },
      },
    ],
  )

  public onMessage (message: Message): void {
    this.tracks1.forEach(turnout1 => {
      const aSubTopic = turnout1.subTopic.split(' ')
      if (aSubTopic.includes(message.topic)) {
        // ---turnout1 topic found -------------------------------
        if (message.payload.length > 0) {
          if (message.topic.includes('ret/bydcc')) {
            try {
              const aPayload = JSON.parse(message.payload)
              // const sDCC = String(turnout1.pubTopic.split('/').pop())
              const sDCC_ = turnout1.sDCC
              const sState_ = aPayload[sDCC_]
              if (sState_ === this.sState0) turnout1.iTurnout1State = 0
              if (sState_ === this.sState1) turnout1.iTurnout1State = 1
              // console.log('onMessage: sState=', sState)
            } catch (error) {
              turnout1.iTurnout1State = -99
            }
          } else {
            const char0 = message.payload.at(0)
            turnout1.iTurnout1State = -1
            if (char0 === '0') turnout1.iTurnout1State = 0
            if (char0 === '1') turnout1.iTurnout1State = 1
            if (char0 === '2') turnout1.iTurnout1State = 2
            // console.log('onMessage: char0=', char0)
          }
        }
        // console.log('onMessage: message.topic=', message.topic)
        // console.log('onMessage: message.payload=', message.payload)
        console.log('onMessage: turnout1.iTurnout1State=', turnout1.iTurnout1State)
        // ---END: turnout1 topic found --------------------------
      }
    })
  }

  public publishCi (topic: string, payload: string): void {
    // console.log('CiTurnout1Controller:publishCi:', '-t ' + topic + ' -m ' + payload)
    this.publish(topic, payload, false, 0).catch((e) => { console.error('CiTurnout1Controller: ERROR:', e) })
  }
}

export const rccTurnout1Controller = new RccTurnout1Controller()
