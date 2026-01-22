// ______RccBaseController.ts____________________khartinger_____
// 2022-01-01: new
// 2023-09-02: change import Qos
import { Message, RccMqttClient } from '@/services/RccMqttClient'
import { QoS } from 'mqtt-packet'

export interface IBase {
  id: string;
  name?: string;
  subTopic: string;
  pubTopic: string;
  pubPayload?: string;
}

export abstract class RccBaseController {
  protected client: RccMqttClient | null = null

  public registerClient (mqttClient: RccMqttClient): void {
    this.client = mqttClient
  }

  protected async publish (topic: string, payload: string, retain: boolean, qos: QoS): Promise<void> {
    return this.client?.publish(topic, payload, retain, qos)
  }

  public abstract onMessage(message: Message): void;
}
