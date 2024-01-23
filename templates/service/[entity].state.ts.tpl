import type { EntityState } from '@common/services'
import { insatiateEntityState } from '@common/services'
import type { {{capitalize entity}}ListItemDto } from './{{entity}}'

export const entityName = '{{entity}}'

export type {{capitalize entity}}State = EntityState<{{capitalize entity}}ListItemDto> & {
  // Add extra state properties here
}

export const initialState: {{capitalize entity}}State = {
  entity: insatiateEntityState(entityName)
}
