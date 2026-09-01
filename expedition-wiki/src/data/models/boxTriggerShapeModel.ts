export class BoxTriggerShapeModel {

  sizeX!: number;
  sizeY!: number;
  sizeZ!: number;

  constructor(init:Partial<BoxTriggerShapeModel>) {  
    Object.assign(this, init);

    this.sizeX = Number(init.sizeX!.toFixed(2));
    this.sizeY = Number(init.sizeY!.toFixed(2));
    this.sizeZ = Number(init.sizeZ!.toFixed(2));
  }

  get dimensionList(): { label: string; value: number}[] {
    return [
      { label: 'Width',  value: this.sizeX },
      { label: 'Height', value: this.sizeY },
      { label: 'Depth',  value: this.sizeZ }
    ];
  }
}