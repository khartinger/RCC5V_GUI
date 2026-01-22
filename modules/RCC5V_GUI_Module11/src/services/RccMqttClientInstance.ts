// ______RccMqttClientInstance.ts_________________khartinger_____
// 2026-01-21 RCCModule 111: New
import { RccMqttClient } from './RccMqttClient'
import { rccTrack1Controller } from '@/controller/RccTrack1Controller'
import { rccTurnout1Controller } from '@/controller/RccTurnout1Controller'
import { rccTurnout3Way1Controller } from '@/controller/RccTurnout3Way1Controller'
import { rccUncoupler1Controller } from '@/controller/RccUncoupler1Controller'

export const rccMqttClientInstance = new RccMqttClient(true)
rccMqttClientInstance.registerController(rccTrack1Controller)
rccMqttClientInstance.registerController(rccTurnout1Controller)
rccMqttClientInstance.registerController(rccTurnout3Way1Controller)
rccMqttClientInstance.registerController(rccUncoupler1Controller)
