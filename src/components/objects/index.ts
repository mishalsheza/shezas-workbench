import type { ComponentType } from 'react'
import type { DeskObjectId } from '../../data/content'
import { ArduinoSet } from './ArduinoSet'
import { HouseModel } from './HouseModel'
import { Laptop } from './Laptop'
import { LedgerSet } from './LedgerSet'
import { Mug } from './Mug'
import { Pegboard } from './Pegboard'
import { Pinboard } from './Pinboard'
import { ServiceBell } from './ServiceBell'
import { ShadeSenseShelf } from './ShadeSenseShelf'
import { TicketDispenser } from './TicketDispenser'

export const OBJECT_ART: Record<DeskObjectId, ComponentType<{ className?: string }>> = {
  compact: ShadeSenseShelf,
  house: HouseModel,
  bell: ServiceBell,
  ticket: TicketDispenser,
  ledger: LedgerSet,
  arduino: ArduinoSet,
  pegboard: Pegboard,
  pinboard: Pinboard,
  mug: Mug,
  laptop: Laptop,
}
