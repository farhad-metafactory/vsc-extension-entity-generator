import { entityReducerBase } from '@common/services'
import { createSlice } from '@reduxjs/toolkit'
import type { {{capitalize entity}}ListItemDto } from './{{entity}}'
import { {{capitalize entity}}State, entityName, initialState } from './{{entity}}.state'

export const {{entity}}Slice = createSlice({
  name: entityName,
  initialState,
  reducers: {
    ...entityReducerBase<{{capitalize entity}}ListItemDto, {{capitalize entity}}State>()
  }
})

export const {{entity}}Reducer = { [entityName]: {{entity}}Slice.reducer }
export const {} = {{entity}}Slice.actions
