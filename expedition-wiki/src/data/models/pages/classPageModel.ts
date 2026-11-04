import { ClassModel } from "../classModel";
import { DischargeAbilityModel } from "../dischargeAbilityModel";
import { NoteModel } from "../noteModel";
import { CharacterAgentInteractableModel } from "../characterAgentInteractableModel";

export class ClassPageModel {

  classModel!: ClassModel;

  armEquipmentItemTypeList!: number[];
  gearEquipmentItemMaterialTypeList!: number[];

  dischargeAbilityModelList!: DischargeAbilityModel[];

  noteModelList!: NoteModel[];

  characterAgentInteractableModelList!: CharacterAgentInteractableModel[];

  constructor(init:Partial<ClassPageModel>) {  
    Object.assign(this, init);

    this.classModel = new ClassModel(this.classModel);

    this.dischargeAbilityModelList           = this.dischargeAbilityModelList          .map((model) => new DischargeAbilityModel          (model));

    this.noteModelList                       = this.noteModelList                      .map((model) => new NoteModel                      (model));

    this.characterAgentInteractableModelList = this.characterAgentInteractableModelList.map((model) => new CharacterAgentInteractableModel(model));
  }
}