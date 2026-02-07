import { Component } from '@angular/core';
import { CollectionItemCard } from "./components/collection-item-card/collection-item-card";
import { CollectionItem } from './models/collection-item';
import { SearchBar } from "./components/search-bar/search-bar";

@Component({
  selector: 'app-root',
  imports: [CollectionItemCard, SearchBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  count = 0;

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

  increaseCount() {
    this.count++;
  }

}
