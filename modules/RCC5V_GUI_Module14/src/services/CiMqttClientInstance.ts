// ______CiMqttClientInstance.ts_________________khartinger_____
// 2026-01-08 RCCModule14: New
import { CiMqttClient } from './CiMqttClient'
import { rccTrack1Controller } from '@/controller/RccTrack1Controller'
import { rccTurnout1Controller } from '@/controller/RccTurnout1Controller'
import { rccTurnout3Way1Controller } from '@/controller/RccTurnout3Way1Controller'
import { rccUncoupler1Controller } from '@/controller/RccUncoupler1Controller'

export const ciMqttClientInstance = new CiMqttClient(true)
ciMqttClientInstance.registerController(rccTrack1Controller)
ciMqttClientInstance.registerController(rccTurnout1Controller)
ciMqttClientInstance.registerController(rccTurnout3Way1Controller)
ciMqttClientInstance.registerController(rccUncoupler1Controller)
