// ______CiMqttClientInstance.ts_________________khartinger_____
// 2026-01-09 New
import { CiMqttClient } from './CiMqttClient'
import { rccTurnout3Way1Controller } from '@/controller/RccTurnout3Way1Controller'

export const ciMqttClientInstance = new CiMqttClient(true)
ciMqttClientInstance.registerController(rccTurnout3Way1Controller)
