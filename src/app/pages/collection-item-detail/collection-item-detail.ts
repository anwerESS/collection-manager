import { Component, signal } from '@angular/core';
import { form, required, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-collection-item-detail',
  imports: [RouterLink, Field],
  templateUrl: './collection-item-detail.html',
  styleUrl: './collection-item-detail.scss'
})
export class CollectionItemDetail {

  formModel = signal({
    'name': ''
  });

  testForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' })
  })

  submit(event: Event) {
    event.preventDefault();
    console.log(this.testForm().value());
  }

}
