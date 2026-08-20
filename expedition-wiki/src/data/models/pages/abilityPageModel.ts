import { AbilityModel } from "../abilityModel";
import { ClassModel } from "../classModel";
import { ArmEquipmentItemModel } from "../armEquipmentItemModel";
import { CharacterAgentInteractableModel } from "../characterAgentInteractableModel";
import { AbilityEventModel } from "../abilityEventModel";

export class AbilityPageModel {

  abilityModel!: AbilityModel;

  classModelList!: ClassModel[];

  armEquipmentItemModelList!: ArmEquipmentItemModel[];
  characterAgentInteractableModelList!: CharacterAgentInteractableModel[];
  abilityEventModelList!: AbilityEventModel[];

  constructor(init:Partial<AbilityPageModel>) {  
    Object.assign(this, init);

    this.abilityModel = new AbilityModel(this.abilityModel);

    this.classModelList                      = this.classModelList                     .map((model) => new ClassModel                     (model));

    this.armEquipmentItemModelList           = this.armEquipmentItemModelList          .map((model) => new ArmEquipmentItemModel          (model));
    this.characterAgentInteractableModelList = this.characterAgentInteractableModelList.map((model) => new CharacterAgentInteractableModel(model));
    this.abilityEventModelList               = this.abilityEventModelList              .map((model) => new AbilityEventModel              (model));
  }
}