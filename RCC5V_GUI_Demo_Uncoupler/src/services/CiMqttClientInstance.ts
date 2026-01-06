// ______CiMqttClientInstance.ts_________________khartinger_____
// 2025-12-27 New
import { CiMqttClient } from './CiMqttClient'
import { rccUncoupler1Controller } from '@/controller/RccUncoupler1Controller'

export const ciMqttClientInstance = new CiMqttClient(true)
ciMqttClientInstance.registerController(rccUncoupler1Controller)
