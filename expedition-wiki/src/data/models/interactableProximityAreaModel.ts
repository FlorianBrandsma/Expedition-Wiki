import { TriggerShapeType } from "../../types/enums";
import { BoxTriggerShapeModel } from "./boxTriggerShapeModel";
import { CapsuleTriggerShapeModel } from "./capsuleTriggerShapeModel";
import { SphereTriggerShapeModel } from "./sphereTriggerShapeModel";

export class InteractableProximityAreaModel {

  triggerShapeType!: number;

  boxTriggerShapeModelList!:     BoxTriggerShapeModel[];
  capsuleTriggerShapeModelList!: CapsuleTriggerShapeModel[];
  sphereTriggerShapeModelList!:  SphereTriggerShapeModel[];

  constructor(init:Partial<InteractableProximityAreaModel>) {  
    Object.assign(this, init);

    this.boxTriggerShapeModelList     = this.boxTriggerShapeModelList    .map((model) => new BoxTriggerShapeModel    (model));
    this.capsuleTriggerShapeModelList = this.capsuleTriggerShapeModelList.map((model) => new CapsuleTriggerShapeModel(model));
    this.sphereTriggerShapeModelList  = this.sphereTriggerShapeModelList .map((model) => new SphereTriggerShapeModel (model));
  }

  get boxTriggerShapeModel(): BoxTriggerShapeModel {  
    return this.boxTriggerShapeModelList[0];
  }

  get capsuleTriggerShapeModel(): CapsuleTriggerShapeModel {  
    return this.capsuleTriggerShapeModelList[0];
  }

  get sphereTriggerShapeModel(): SphereTriggerShapeModel {  
    return this.sphereTriggerShapeModelList[0];
  }

  get dimensionList(): { label: string; value: number}[] {

    switch (TriggerShapeType[this.triggerShapeType])
    {
      case 'Box':     return this.boxTriggerShapeModel    .dimensionList;
      case 'Capsule': return this.capsuleTriggerShapeModel.dimensionList;
      case 'Sphere':  return this.sphereTriggerShapeModel .dimensionList;
    }
  }
}