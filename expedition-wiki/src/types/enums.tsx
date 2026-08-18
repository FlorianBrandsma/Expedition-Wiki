export const PivotType = [
  'None',
  'Top',
  'Center',
  'Bottom',
  'Left',
  'Right'
] as const;

export const AssetIndefiniteArticle = [
  'None',
  'A',
  'An'
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

export const CaseConditionType = [
  'Resource',
  'Effect',
  'Item',
  'Faction',
  'Character',
  'Companion',
  'Task',
  'Combat',
  'Loot'
] as const;

export const CaseConditionTargetType = [
  'Self',
  'Opponent'
] as const;

export const SpatialInequalityType = [
  'Above',
  'Below'
] as const;

export const QuantitativeInequalityType = [
  'More than',
  'Fewer than'
] as const;

export const AbsoluteInequalityType = [
  'Highest',
  'Lowest'
] as const;

export const CompanionCaseConditionPartyState = [
  'Either',
  'Active',
  'Inactive'
] as const;

export const CombatCaseConditionEngagementType = [
  'Either',
  'Engaged',
  'Unengaged'
] as const;

export const TextReferenceType = [
  'Effect',
  'Ability',
  'Item',
  'Set',
  'Faction',
  'Class',
  'Interactable',
  'Region',
  'Terrain',
  'Waypoint'
] as const;

export const EffectType = [
  'Resource',
  'Event',
  'Status'
] as const;

export const EffectOutputType = [
  'Neutral',
  'Mixed',
  'Helpful',
  'Harmful'
] as const;

export const ResourceEffectType = [
  'Damage',
  'Restore',
  'Absorb'
] as const;

export const DamageResourceEffectType = [
  'Mitigable',
  'Unmitigable'
] as const;

export const StatusEffectType = [
  'Basic',
  'Attribute',
  'Ability',
  'Aura',
  'Repeat',
  'Resist',
  'Disable',
  'Morph',
  'Size',
  'Sensor',
  'Standing',
  'Cluster' 
] as const;

export const StatusEffectState = [
  'Active',
  'Passive'
] as const;

export const AuraStatusEffectTargetType = [
  'Any',
  'Party',
  'Ally',
  'Opponent'
] as const;

export const DisableStatusEffectType = [
  'Movement',
  'Ability'
] as const;

export const SensorStatusEffectType = [
  'Sight',
  'Hearing',
  'Proximity'
] as const;

export const EffectAttributeStatusEffectType = [
  'Attack',
  'Defence',
  'Movement speed',
  'Damage dealt',
  'Damage taken',
  'Power',
  'Resistance'
] as const;

export const ResourceAmountType = [
  'Whole',
  'Percent'
] as const;

export const ResourceDamageType = [
  'Physical',
  'Magical'
] as const;

export const ResistStatusEffectType = [
  'Resist',
  'Clear'
] as const;

export const AbilityType = [
  'Charge',
  'Discharge'
] as const;

export const AbilityEffectTargetType = [
  'User',
  'Target'
] as const;

export const ChargeAbilityType = [
  'Primary',
  'Secondary'
] as const;

export const DischargeAbilityType = [
  'Arm',
  'Spell'
] as const;

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

export const ItemComponentType = [
  'Create',
  'Scrap'
] as const;

export const InteractableType = [
  'Agent',
  'Obstacle'
] as const;

export const AgentInteractableType = [
  'Character',
  'Static'
] as const;

export const CharacterAgentInteractableType = [
  'Non-playable',
  'Playable'
] as const;

export const RarityType =
[
  'Always',
  'Common',
  'Uncommon',
  'Rare',
  'Very rare'
] as const;

export const CombatState = [
  'Passive',
  'Active',
  'Defeated'
] as const;

export const EventType = [
  'Basic',
  'Menu',
  'Speech',
  'Dialogue',
  'Scenario',
  'Transport',
  'Rest',
  'Party',
  'Mailbox',
  'Mail',
  'Item',
  'Effect',
  'Ability',
  'Companion',
  'Reputation',
  'Combat',
  'Loot',
  'Signal',
  'Intel'
] as const;

export const ItemEventType = [
  'Loot',
  'Steal',
  'Claim',
  'Trade',
  'Shop',
  'Craft',
  'Relinquish',
  'Distribute'
] as const;

export const ItemEventItemType = [
  'Unlimited',
  'Limited'
] as const;

export const ShopItemEventActionType = [
  'Buy',
  'Sell'
] as const;

export const CraftItemEventItemType = [
  'Free',
  'Cost'
] as const;

export const CraftItemEventActionType = [
  'Create',
  'Scrap'
] as const;