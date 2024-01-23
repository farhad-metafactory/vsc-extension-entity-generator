import type { EntityEditDto, EntityListItemDto, EntityViewDto, SelectOption } from '@common/types'

export type {{capitalize entity}}ListItemDto = EntityListItemDto & {
  version: number
  date: string
  amount: number
  description: string
  expectedRemainingPoints: number
  task: SelectOption
  story: SelectOption
  project: SelectOption
  employee: SelectOption
}

export type {{capitalize entity}}ViewDto = EntityViewDto & {}

export type {{capitalize entity}}EditDto = EntityEditDto & {}