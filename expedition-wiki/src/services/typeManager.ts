import type { PivotType, AssetType, ArmEquipmentItemType, ArmEquipmentItemGripType } from "../types/enums"

interface Asset {
  AssetType: (typeof AssetType)[keyof typeof AssetType],
  PivotType: (typeof PivotType)[keyof typeof PivotType]
}

export const AssetList: Asset[] = [
  { AssetType: 'Object',     PivotType: 'Center' },
  { AssetType: 'Effect',     PivotType: 'Center' },
  { AssetType: 'Human',      PivotType: 'Bottom' },
  { AssetType: 'Drake',      PivotType: 'Bottom' },
  { AssetType: 'Sword',      PivotType: 'Center' },
  { AssetType: 'Greatsword', PivotType: 'Center' },
  { AssetType: 'Crossbow',   PivotType: 'Center' },
  { AssetType: 'Bow',        PivotType: 'Center' },
  { AssetType: 'Staff',      PivotType: 'Center' },
  { AssetType: 'Shield',     PivotType: 'Center' }
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
