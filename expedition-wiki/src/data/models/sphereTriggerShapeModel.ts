export class SphereTriggerShapeModel {

  radius!: number;

  constructor(init:Partial<SphereTriggerShapeModel>) {  
    Object.assign(this, init);

    this.radius = Number(init.radius!.toFixed(2));
  }

  get dimensionList(): { label: string; value: number}[] {
    return [
      { label: 'Radius', value: this.radius }
    ];
  }
}