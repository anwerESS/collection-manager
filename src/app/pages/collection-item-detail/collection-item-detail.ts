import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collection-item-detail',
  imports: [FormsModule],
  templateUrl: './collection-item-detail.html',
  styleUrl: './collection-item-detail.css'
})
export class CollectionItemDetail {

  name = '';

  submit(event: Event) {
    event.preventDefault();
    console.log(this.name);
  }

}
