export class WorldObjectReflectionModel {

  id!: number;

  positionX!: number;
  positionZ!: number;

  scale!: number;

  worldObjectIconResourceName!: number;

  worldObjectAssetSizeX!: number;
  worldObjectAssetSizeY!: number;
  worldObjectAssetSizeZ!: number;

  worldObjectAssetSizeScale!: number;

  constructor(init:Partial<WorldObjectReflectionModel>) {  
    Object.assign(this, init);
  }
}