import type { PivotType, AssetType, ArmEquipmentItemType, ArmEquipmentItemGripType } from "../types/enums"

interface Asset {
  assetType: (typeof AssetType)[keyof typeof AssetType],
  pivotType: (typeof PivotType)[keyof typeof PivotType]
}

export const AssetList: Asset[] = [
  { assetType: 'Object',     pivotType: 'Center' },
  { assetType: 'Effect',     pivotType: 'Center' },
  { assetType: 'Human',      pivotType: 'Bottom' },
  { assetType: 'Drake',      pivotType: 'Bottom' },
  { assetType: 'Sword',      pivotType: 'Center' },
  { assetType: 'Greatsword', pivotType: 'Center' },
  { assetType: 'Crossbow',   pivotType: 'Center' },
  { assetType: 'Bow',        pivotType: 'Center' },
  { assetType: 'Staff',      pivotType: 'Center' },
  { assetType: 'Shield',     pivotType: 'Center' }
]

interface ArmEquipmentGroup {
  ArmEquipmentItemType: (typeof ArmEquipmentItemType)[keyof typeof ArmEquipmentItemType],
  ArmEquipmentItemGripType: (typeof ArmEquipmentItemGripType)[keyof typeof ArmEquipmentItemGripType]
}

export const ArmEquipmentGroupList: ArmEquipmentGroup[] = [
  { 
    ArmEquipmentItemType: 'Sword', 
    ArmEquipmentItemGripType: 'Right two-hand' 
  },
  { 
    ArmEquipmentItemType: 'Greatsword', 
    ArmEquipmentItemGripType: 'Right two-hand' 
  },
  { 
    ArmEquipmentItemType: 'Polearm', 
    ArmEquipmentItemGripType: 'Right two-hand' 
  },
  { 
    ArmEquipmentItemType: 'Crossbow', 
    ArmEquipmentItemGripType: 'One-hand' 
  },
  { 
    ArmEquipmentItemType: 'Bow', 
    ArmEquipmentItemGripType: 'Left two-hand' 
  },
  { 
    ArmEquipmentItemType: 'Staff', 
    ArmEquipmentItemGripType: 'Right one-hand' 
  },
  { 
    ArmEquipmentItemType: 'Shield', 
    ArmEquipmentItemGripType: 'Left two-hand' 
  }
]
