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

  statusEffectState!: number;

  statusEffectStack!: number;

  activeStatusEffectRepetitionTime!: number;

  behaviourInteractionModelList!: BehaviourInteractionModel[];

  taskModelList!: TaskModel[];

  constructor(init:Partial<InteractionModel>) {  
    Object.assign(this, init);

    this.activeStatusEffectRepetitionTime = Number(init.activeStatusEffectRepetitionTime!.toFixed(2));

    this.behaviourInteractionModelList = this.behaviourInteractionModelList.map((model) => new BehaviourInteractionModel(model));

    this.taskModelList                 = this.taskModelList                .map((model) => new TaskModel                (model));
  }

  get behaviourInteractionModel(): BehaviourInteractionModel {
    return this.behaviourInteractionModelList[0];
  }

  get taskModel(): TaskModel {
    return this.taskModelList[0];
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

  get params(): string[] {
  
    const params = [
      ...this.taskModel.params,
      this.timeDescription
    ]

    return params;
  }
}