import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-collection-item-detail',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './collection-item-detail.html',
  styleUrl: './collection-item-detail.css'
})
export class CollectionItemDetail {

  nameFormControl = new FormControl('', [Validators.required]);
  priceFormControl = new FormControl(0, [Validators.required, Validators.min(0)]);

  submit(event: Event) {
    event.preventDefault();
    console.log(this.nameFormControl.value);
    console.log(this.priceFormControl.value);
  }

}
