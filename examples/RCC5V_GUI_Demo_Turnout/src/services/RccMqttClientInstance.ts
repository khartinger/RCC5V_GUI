// ______RccMqttClientInstance.ts_________________khartinger_____
// 2025-12-27 New
import { RccMqttClient } from './RccMqttClient'
import { rccTurnout1Controller } from '@/controller/RccTurnout1Controller'

export const rccMqttClientInstance = new RccMqttClient(true)
rccMqttClientInstance.registerController(rccTurnout1Controller)
