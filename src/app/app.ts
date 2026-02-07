import { Component } from '@angular/core';
import { CollectionItemCard } from "./components/collection-item-card/collection-item-card";
import { CollectionItem } from './models/collection-item';

@Component({
  selector: 'app-root',
  imports: [CollectionItemCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  coin!: CollectionItem;
  linx!: CollectionItem;

  constructor() {
    this.coin = new CollectionItem();
    this.coin.name = 'Pièce de 1972';
    this.coin.description = 'Pièce de 50 centimes de francs.';
    this.coin.rarity = 'Commune';
    this.coin.image = 'img/coin1.png';
    this.coin.price = 170;

    this.linx = new CollectionItem();
  }

}