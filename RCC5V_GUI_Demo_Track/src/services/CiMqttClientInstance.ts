// ______CiMqttClientInstance.ts_________________khartinger_____
// 2025-12-27 New
import { CiMqttClient } from './CiMqttClient'
import { rccTrack1Controller } from '@/controller/RccTrack1Controller'

export const ciMqttClientInstance = new CiMqttClient(true)
ciMqttClientInstance.registerController(rccTrack1Controller)
