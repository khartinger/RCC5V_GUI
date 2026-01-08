// ______CiMqttClientInstance.ts_________________khartinger_____
// 2025-12-27 New
import { CiMqttClient } from './CiMqttClient'
import { rccTo3way1Controller } from '@/controller/RccTurnout3Way1Controller'

export const ciMqttClientInstance = new CiMqttClient(true)
ciMqttClientInstance.registerController(rccTo3way1Controller)
