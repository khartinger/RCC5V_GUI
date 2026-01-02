// ______CiMqttClientInstance.ts_________________khartinger_____
// 2025-12-27 New
import { CiMqttClient } from './CiMqttClient'
import { rccTurnout1Controller } from '@/controller/RccTurnout1Controller'

export const ciMqttClientInstance = new CiMqttClient(true)
ciMqttClientInstance.registerController(rccTurnout1Controller)
