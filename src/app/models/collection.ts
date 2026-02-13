import { ICollectionDTO } from "../interfaces/collection-dto";
import { CollectionItem } from "./collection-item";

export class Collection {

  id?: number;
  title: string = "My Collection";
  items: CollectionItem[] = [];
  itemsCount?: number;

  copy(): Collection {
    const copy = Object.assign(new Collection(), this);
    copy.items = this.items.map(item => item.copy());
    return copy;
  }

  static fromDTO(collectionData: ICollectionDTO) {
    return Object.assign(new Collection(), {
      ...collectionData,
      items: collectionData.items?.map(
        item => CollectionItem.fromDTO(item)
      )
    });
  }

  toDTO(): ICollectionDTO {
    return {
      title: this.title
    };
  }
}