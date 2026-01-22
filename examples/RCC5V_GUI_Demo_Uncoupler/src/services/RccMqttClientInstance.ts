// ______RccMqttClientInstance.ts_________________khartinger_____
// 2025-12-27 New
import { RccMqttClient } from './RccMqttClient'
import { rccUncoupler1Controller } from '@/controller/RccUncoupler1Controller'

export const rccMqttClientInstance = new RccMqttClient(true)
rccMqttClientInstance.registerController(rccUncoupler1Controller)
