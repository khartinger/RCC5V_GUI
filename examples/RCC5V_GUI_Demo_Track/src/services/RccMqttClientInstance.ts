// ______RccMqttClientInstance.ts_________________khartinger_____
// 2025-12-27 New
import { RccMqttClient } from './RccMqttClient'
import { rccTrack1Controller } from '@/controller/RccTrack1Controller'

export const rccMqttClientInstance = new RccMqttClient(true)
rccMqttClientInstance.registerController(rccTrack1Controller)
