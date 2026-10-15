import { FormatTime } from "../../services/timeManager";
import { StatusEffectState } from "../../types/enums";
import { TaskModel } from "./taskModel";
import { BehaviourInteractionModel } from "./behaviourInteractionModel";
import { EntityWorldInteractableReflectionMovementModel } from "./entityWorldInteractableReflectionMovementModel";
import { TriggerWorldInteractableReflectionModel } from "./triggerWorldInteractableReflectionModel";
import type { MapCoordinates } from "../../services/interfaces";

export class InteractionModel {

  type!: number;

  isDefault!: boolean;

  startTime!: number;
  endTime!: number;

  statusEffectState!: number;

  statusEffectStack!: number;

  activeStatusEffectRepetitionTime!: number;

  terrainName!: string;
  regionName!: string;

  behaviourInteractionModelList!: BehaviourInteractionModel[];

  taskModelList!: TaskModel[];

  entityWorldInteractableReflectionMovementModelList!: EntityWorldInteractableReflectionMovementModel[];
  triggerWorldInteractableReflectionModelList!:        TriggerWorldInteractableReflectionModel[];

  constructor(init:Partial<InteractionModel>) {  
    Object.assign(this, init);

    this.activeStatusEffectRepetitionTime = Number(init.activeStatusEffectRepetitionTime!.toFixed(2));

    this.behaviourInteractionModelList                      = this.behaviourInteractionModelList                     .map((model) => new BehaviourInteractionModel                     (model));

    this.taskModelList                                      = this.taskModelList                                     .map((model) => new TaskModel                                     (model));

    this.entityWorldInteractableReflectionMovementModelList = this.entityWorldInteractableReflectionMovementModelList.map((model) => new EntityWorldInteractableReflectionMovementModel(model));
    this.triggerWorldInteractableReflectionModelList        = this.triggerWorldInteractableReflectionModelList       .map((model) => new TriggerWorldInteractableReflectionModel       (model));
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

  get pins(): MapCoordinates[] {

    if (this.entityWorldInteractableReflectionMovementModelList.length > 0) {

      return this.entityWorldInteractableReflectionMovementModelList.map(model => {
              
        const destinationModel = model.entityWorldInteractableReflectionMovementDestinationModelList[0];

        return {
          x: destinationModel.positionX, 
          z: destinationModel.positionZ
        } as MapCoordinates
      })
    }

    if (this.triggerWorldInteractableReflectionModelList.length > 0) {

      return this.triggerWorldInteractableReflectionModelList.map(model => (
        {
          x: model.positionX,
          z: model.positionZ
        } as MapCoordinates
      ));
    }

    return [];
  }

  get params(): string[] {
  
    const params = [
      ...this.taskModel.params,
      this.timeDescription
    ]

    return params;
  }
}