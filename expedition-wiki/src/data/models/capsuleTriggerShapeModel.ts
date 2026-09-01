export class CapsuleTriggerShapeModel {

  radius!: number;
  height!: number;

  constructor(init:Partial<CapsuleTriggerShapeModel>) {  
    Object.assign(this, init);

    this.radius = Number(init.radius!.toFixed(2));
    this.height = Number(init.height!.toFixed(2));
  }

  get dimensionList(): { label: string; value: number}[] {
    return [
      { label: 'Radius', value: this.radius },
      { label: 'Height', value: this.height }
    ];
  }
}