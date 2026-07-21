export class InteractableModel {
  id!: number;
  type!: number;
  name!: string;
  
  sightRange!: number;
  hearingRange!: number;

  assetType!: number;
  assetResourceName!: string;
  assetIconResourceName!: string;

  constructor(init:Partial<InteractableModel>) {  
    Object.assign(this, init);

    this.sightRange   = Number(init.sightRange!.toFixed(2));
    this.hearingRange = Number(init.hearingRange!.toFixed(2));
  }
};