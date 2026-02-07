import { Component, input } from '@angular/core';
import { CollectionItem } from '../../models/collection-item';

@Component({
  selector: 'app-collection-item-card',
  imports: [],
  templateUrl: './collection-item-card.html',
  styleUrl: './collection-item-card.css'
})
export class CollectionItemCard {

  item = input.required<CollectionItem>();

  // ALIAS
  // item = input.required<CollectionItem>({ // avec alias
  //   alias: 'collection-item'
  // });

  // TRANSFORM
  // item = input.required<CollectionItem, CollectionItem>({
  //   transform: (value: CollectionItem) => {
  //     value.price = value.price * 1.17;
  //     return value;
  //   }
  // })
  // ou return number
  // item = input.required<number, CollectionItem>({
  //   transform: (value: CollectionItem) => {
  //     return value.price * 1.17;
  //   }
  // });

}
