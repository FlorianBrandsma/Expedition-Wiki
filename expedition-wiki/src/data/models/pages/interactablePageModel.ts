import { InteractableModel } from "../interactableModel";
import { FactionModel } from "../factionModel";
import { InteractableProximityAreaModel } from "../interactableProximityAreaModel";
import { ClassModel } from "../classModel";
import { NoteModel } from "../noteModel";
import { AgentInteractableBehaviourModel } from "../agentInteractableBehaviourModel";
import { AgentInteractableReactionModel } from "../agentInteractableReactionModel";
import { AgentInteractableLootTableModel } from "../agentInteractableLootTableModel";
import { StatusEffectModel } from "../statusEffectModel";
import { EquipmentItemModel } from "../equipmentItemModel";
import { DischargeAbilityModel } from "../dischargeAbilityModel";
import { CaseConditionModel } from "../caseConditionModel";
import { CompanionEventModel } from "../companionEventModel";
import { WorldInteractableModel } from "../worldInteractableModel";
import { EventModel } from "../eventModel";

export class InteractablePageModel {

  interactableModel!:              InteractableModel;
  factionModel!:                   FactionModel;
  interactableProximityAreaModel!: InteractableProximityAreaModel;
  classModel!:                     ClassModel;

  noteModelList!:                          NoteModel[];

  agentInteractableBehaviourModelList!:    AgentInteractableBehaviourModel[];
  agentInteractableReactionModelList!:     AgentInteractableReactionModel[];
  agentInteractableLootTableModelList!:    AgentInteractableLootTableModel[];

  agentInteractableStatusEffectModelList!: StatusEffectModel[];
  interactionStatusEffectModelList!:       StatusEffectModel[];

  equipmentItemModelList!:                 EquipmentItemModel[];
  dischargeAbilityModelList!:              DischargeAbilityModel[];

  worldInteractableModelList!:             WorldInteractableModel[];

  eventModelList!:                         EventModel[];

  caseConditionModelList!:                 CaseConditionModel[];

  companionEventModelList!:                CompanionEventModel[];

  constructor(init:Partial<InteractablePageModel>) {  
    Object.assign(this, init);

    if (this.interactableModel)              this.interactableModel              = new InteractableModel             (this.interactableModel);
    if (this.factionModel)                   this.factionModel                   = new FactionModel                  (this.factionModel);
    if (this.interactableProximityAreaModel) this.interactableProximityAreaModel = new InteractableProximityAreaModel(this.interactableProximityAreaModel);
    if (this.classModel)                     this.classModel                     = new ClassModel                    (this.classModel);

    this.noteModelList                          = this.noteModelList                         .map((model) => new NoteModel                      (model));

    this.agentInteractableBehaviourModelList    = this.agentInteractableBehaviourModelList   .map((model) => new AgentInteractableBehaviourModel(model));
    this.agentInteractableReactionModelList     = this.agentInteractableReactionModelList    .map((model) => new AgentInteractableReactionModel (model));
    this.agentInteractableLootTableModelList    = this.agentInteractableLootTableModelList   .map((model) => new AgentInteractableLootTableModel(model));

    this.agentInteractableStatusEffectModelList = this.agentInteractableStatusEffectModelList.map((model) => new StatusEffectModel              (model));
    this.interactionStatusEffectModelList       = this.interactionStatusEffectModelList      .map((model) => new StatusEffectModel              (model));

    this.equipmentItemModelList                 = this.equipmentItemModelList                .map((model) => new EquipmentItemModel             (model));
    this.dischargeAbilityModelList              = this.dischargeAbilityModelList             .map((model) => new DischargeAbilityModel          (model));

    this.worldInteractableModelList             = this.worldInteractableModelList            .map((model) => new WorldInteractableModel         (model));

    this.eventModelList                         = this.eventModelList                        .map((model) => new EventModel                     (model));

    this.caseConditionModelList                 = this.caseConditionModelList                .map((model) => new CaseConditionModel             (model));

    this.companionEventModelList                = this.companionEventModelList               .map((model) => new CompanionEventModel            (model));
  }
}