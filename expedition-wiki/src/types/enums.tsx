export const PivotType = [
  'None',
  'Top',
  'Center',
  'Bottom',
  'Left',
  'Right'
] as const;

export const AssetType = [
  'Object',
  'Effect',
  'Human',
  'Drake',
  'Sword',
  'Greatsword',
  'Polearm',
  'Crossbow',
  'Bow',
  'Staff',
  'Shield'
] as const;

export const ResourceType = [
  'Health',
  'Mana',
  'Energy'
] as const;

export const NormalAttributeType = [
  'Attack',
  'Defence'
] as const;

export type NormalAttributeType = typeof NormalAttributeType[number];

export const ElementalAttributeType = [
  'Power',
  'Resistance'
]

export const ElementType = [
  'Normal',
  'Fire',
  'Ice',
  'Lightning',
  'Water',
  'Wind',
  'Ground',
  'Nature',
  'Machine',
  'Light',
  'Dark'
] as const;

export type ElementType = typeof ElementType[number];

export const ItemType = [
  'Supply',
  'Equipment',
  'Good',
  'Currency'
] as const;

export const SupplyItemType = [
'Usable',
'Consumable',
] as const;

export const EquipmentItemType = [
  'Arm',
  'Gear',
  'Trinket',
] as const;

export const ArmEquipmentItemType = [
  'Sword',
  'Greatsword',
  'Polearm',
  'Crossbow',
  'Bow',
  'Staff',
  'Shield'
] as const;

export const ArmEquipmentItemGripType = [
  'One-hand',
  'Right one-hand',
  'Left one-hand',
  'Right two-hand',
  'Left two-hand'
] as const;

export const GearEquipmentItemType = [
  'Head',
  'Upper-body',
  'Lower-body',
  'Body',
  'Full-body'
] as const;

export const GearEquipmentItemMaterialType = [
  'Costume',
  'Light',
  'Medium',
  'Heavy',
] as const;

export const TrinketEquipmentItemType = [
  'Amulet',
  'Ring'
] as const;

export const EquipmentSlotType = [
  'Right-hand',
  'Left-hand',
  'Head',
  'Upper-body',
  'Lower-body',
  'Neck',
  'Finger'
] as const;