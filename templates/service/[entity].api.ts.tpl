import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EntityApi } from '@common/services'
import type { {{capitalize entity}}ListItemDto, {{capitalize entity}}ViewDto, {{capitalize entity}}EditDto } from './{{entity}}'

const entityPath = "{{entityApiPath}}"

@Injectable({ providedIn: 'root' })
export class {{capitalize entity}}Api extends EntityApi<{{capitalize entity}}ListItemDto, {{capitalize entity}}ViewDto, {{capitalize entity}}EditDto> {
  constructor(http: HttpClient) {
    super(entityPath, http)
  }
}
