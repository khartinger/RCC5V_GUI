// ______RccMqttClientInstance.ts_________________khartinger_____
// 2026-01-09 New
import { RccMqttClient } from './RccMqttClient'
import { rccTurnout3Way1Controller } from '@/controller/RccTurnout3Way1Controller'

export const rccMqttClientInstance = new RccMqttClient(true)
rccMqttClientInstance.registerController(rccTurnout3Way1Controller)
