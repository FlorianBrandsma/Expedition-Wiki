export class AssetModel {

  name!: string;

  type!: number;

  indefiniteArticle!: number;

  resourceName!: string;

  sizeX!: number;
  sizeY!: number;
  sizeZ!: number;

  scale!: number;

  iconResourceName!: string;

  constructor(init:Partial<AssetModel>) {  
    Object.assign(this, init);

    this.sizeX = Number(init.sizeX!.toFixed(2));
    this.sizeY = Number(init.sizeY!.toFixed(2));
    this.sizeZ = Number(init.sizeZ!.toFixed(2));

    this.scale = Number(init.scale!.toFixed(2));
  }
}