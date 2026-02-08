import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collection-item-detail',
  imports: [RouterLink],
  templateUrl: './collection-item-detail.html',
  styleUrl: './collection-item-detail.css'
})
export class CollectionItemDetail {

  /// id = input<string | null>(null); // doit etre id comme dans route ou definir un alias pour utliser une var avec un nom different
  itemId = input<number | null, string | null>(null, { // signal de type number et recu de type string
    alias: 'id',
    transform: ((id: string | null) => id ? parseInt(id) : null)
  });

}