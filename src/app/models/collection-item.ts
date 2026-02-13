import { ICollectionItemDTO } from "../interfaces/collection-item-dto";

export const Rarities = {
  Legendary: 'Legendary',
  Rare: 'Rare',
  Uncommon: 'Uncommon',
  Common: 'Common',
} as const;
export type Rarity = typeof Rarities[keyof typeof Rarities];

export class CollectionItem {

  id?: number;
  name = "";
  description = "";
  image = "";
  rarity: Rarity = "Common";
  price = 0;

  collectionId: number = -1;

  copy(): CollectionItem {
    return Object.assign(new CollectionItem(), this);
  }

  static fromDTO(collectionData: ICollectionItemDTO) {
    const item: CollectionItem = Object.assign(new CollectionItem(), collectionData);
    item.collectionId = parseInt(collectionData.collectionId);
    return item;
  }

  toDTO(): ICollectionItemDTO {
    return {
      name: this.name,
      description: this.description,
      image: this.image,
      rarity: this.rarity,
      price: this.price,
      collectionId: String(this.collectionId)
    };
  }

}