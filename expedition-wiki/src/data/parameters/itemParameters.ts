import type { IParameters } from "./interfaces";

export const ItemRequestType = {
  Custom: 0,
  GetFilterItems: 1,
  GetItemCurrencyItems: 7
}  as const;

export class ItemParameters implements IParameters {

	readonly dataType: string = "Item";

	requestType?: (typeof ItemRequestType)[keyof typeof ItemRequestType];

	includeDependencies?: boolean;
	includeItemComponents?: boolean;
	includeEffects?: boolean;
	includeAbilities?: boolean;

	id?: number[];
	excludeId?: number[];
	gameId?: number[];

	itemType?: number[];
	assetType?: number[];
	supplyItemType?: number[];
	equipmentItemType?: number[];
	armEquipmentItemType?: number[];
	gearEquipmentItemType?: number[];
	gearEquipmentItemMaterialType?: number[];
	trinketEquipmentItemType?: number[];
	equipmentSlotType?: number[];

	name?: string;

	constructor(init?:Partial<ItemParameters>) {
		Object.assign(this, init);
	}
}