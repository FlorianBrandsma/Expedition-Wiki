import { FormatTime } from "../../services/timeManager";
import { StatusEffectState } from "../../types/enums";
import { TaskModel } from "./taskModel";
import { BehaviourInteractionModel } from "./behaviourInteractionModel";

export class InteractionModel {

  id!: number;

  type!: number;

  isDefault!: boolean;

  startTime!: number;
  endTime!: number;

  taskModel!: TaskModel;

  statusEffectState!: number;

  statusEffectStack!: number;

  activeStatusEffectRepetitionTime!: number;

  behaviourInteractionModelList!: BehaviourInteractionModel[];

  constructor(init:Partial<InteractionModel>) {  
    Object.assign(this, init);

    if (this.taskModel) this.taskModel = new TaskModel(this.taskModel);

    this.behaviourInteractionModelList = this.behaviourInteractionModelList.map((model) => new BehaviourInteractionModel(model));

    this.activeStatusEffectRepetitionTime = Number(init.activeStatusEffectRepetitionTime!.toFixed(2));
  }

  get behaviourInteractionModel(): BehaviourInteractionModel {
    return this.behaviourInteractionModelList[0];
  }

  get timeDescription(): string {
    return this.isDefault ? 'Default' : `${FormatTime(this.startTime)}-${FormatTime(this.endTime)}`;
  }

  get statusEffectStateDescription(): string {
    return StatusEffectState[this.statusEffectState];
  }

  get activeStatusEffectRepetitionTimeDescription(): string {
    return this.activeStatusEffectRepetitionTime > 0 ? `${this.activeStatusEffectRepetitionTime.toFixed(2)}s` : '';
  }
}