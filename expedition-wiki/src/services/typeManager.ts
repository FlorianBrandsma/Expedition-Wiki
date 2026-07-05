import type { PivotType, AssetType } from "../types/enums"

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
