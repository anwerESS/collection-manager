import { ChangeDetectionStrategy, Component, computed, inject, model, signal } from '@angular/core';
import { CollectionItemCard } from "./components/collection-item-card/collection-item-card";
import { CollectionItem } from './models/collection-item';
import { SearchBar } from "./components/search-bar/search-bar";
import { Collection } from './models/collection';
import { CollectionService } from './services/collection-service';

@Component({
  selector: 'app-root',
  imports: [CollectionItemCard, SearchBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {

  collectionService = inject(CollectionService);
  count = 0;
  search = model('');

  collection!: Collection;
  coin!: CollectionItem;
  linx!: CollectionItem;
  stamp!: CollectionItem;

  selectedCollection = signal<Collection | null>(null);
  displayedItems = computed(() => {
    const allItems = this.selectedCollection()?.items || [];
    return allItems.filter(item =>
      item.name.toLowerCase().includes(
        this.search().toLocaleLowerCase()
      )
    );
  });

  constructor() {
    const allCollections = this.collectionService.getAll();
    if (allCollections.length > 0) {
      this.selectedCollection.set(allCollections[0]);
    }
  }

  addGenericItem() {
    const genericItem = new CollectionItem();
    const collection = this.selectedCollection();

    if (!collection) return;

    const updatedCollection = this.collectionService.addItem(
      collection, genericItem
    );
    this.selectedCollection.set(updatedCollection);
  }

}