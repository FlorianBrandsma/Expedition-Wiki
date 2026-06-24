export interface IParameters {
    readonly dataType: string;
}

export class GameParameters implements IParameters {

	readonly dataType: string = "Game";

	id?: number[];
	excludeId?: number[];

	releaseCandidateId?: number[];
	releaseId?: number[];

	name?: string;

	constructor(init?:Partial<GameParameters>) {
		Object.assign(this, init);
	}
}

export class ItemParameters implements IParameters {

	readonly dataType: string = "Item";

	requestType?: number;

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