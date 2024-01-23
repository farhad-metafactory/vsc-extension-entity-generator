import { Component } from '@angular/core'
import { {{entity}}Schema } from 'src/schema'
import { {{capitalize entity}}Service } from 'src/services/{{entity}}'

@Component({
  selector: 'app-{{pluralize entity}}',
  templateUrl: './{{pluralize entity}}.component.html'
})
export class {{capitalize_pluralize entity}}ListComponent {
  constructor(public service: {{capitalize entity}}Service) {}

  schema = {{entity}}Schema
}
