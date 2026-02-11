export const Rarities = {
  Legendary: 'Legendary',
  Rare: 'Rare',
  Uncommon: 'Uncommon',
  Common: 'Common',
} as const;
export type Rarity = typeof Rarities[keyof typeof Rarities];

export class CollectionItem {

  id = -1;
  name = "Linx";
  description = "A legendary sword of unmatched sharpness and history.";
  image = "img/linx.png"
  rarity: Rarity = "Legendary";
  price = 250;

  copy(): CollectionItem {
    return Object.assign(new CollectionItem(), this);
  }

}