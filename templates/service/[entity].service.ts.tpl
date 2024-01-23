import { Injectable } from '@angular/core'
import { EntityService } from '@common/services'
import { TranslateService } from '@ngx-translate/core'
import { RootState, StoreService } from '../store.service'
import type { {{capitalize entity}}EditDto, {{capitalize entity}}ListItemDto, {{capitalize entity}}ViewDto } from './{{entity}}'
import { {{capitalize entity}}Api } from './{{entity}}.api'
import { {{entity}}Slice } from './{{entity}}.reducer'

@Injectable({
  providedIn: 'root'
})
export class {{capitalize entity}}Service extends EntityService<
  {{capitalize entity}}ListItemDto,
  {{capitalize entity}}ViewDto,
  {{capitalize entity}}EditDto,
  RootState
> {
  constructor(api: {{capitalize entity}}Api, store: StoreService, translator: TranslateService) {
    super(api, store, translator, {{entity}}Slice)
  }
}
