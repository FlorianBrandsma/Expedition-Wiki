import { EventModel } from "../eventModel";
import { DialogueEventSpeechModel } from "../dialogueEventSpeech";
import { MenuEventEntryModel } from "../menuEventEntryModel";
import { ItemModel } from "../itemModel";
import { ItemEventItemModel } from "../itemEventItemModel";
import { EffectModel } from "../effectModel";
import { DischargeAbilityModel } from "../dischargeAbilityModel";
import { PlayableCharacterAgentInteractableModel } from "../playableCharacterAgentInteractableModel";
import { FactionModel } from "../factionModel";
import { AgentInteractableLootTableModel } from "../agentInteractableLootTableModel";
import { WorldInteractableReflectionModel } from "../worldInteractableReflectionModel";
import { EventContinuationModel } from "../eventContinuationModel";
import { AgentInteractableReactionModel } from "../agentInteractableReactionModel";
import { InteractionTriggerModel } from "../interactionTriggerModel";
import { StealItemEventModel } from "../stealItemEventModel";
import { EventEffectModel } from "../eventEffectModel";

export class EventPageModel {

  eventModel!: EventModel;

  menuEventEntryModelList!:                     MenuEventEntryModel[];
  
  dialogueEventSpeechModelList!:                DialogueEventSpeechModel[];

  itemModelList!:                               ItemModel[];

  itemEventItemModelList!:                      ItemEventItemModel[];

  effectModelList!:                             EffectModel[];

  dischargeAbilityModelList!:                   DischargeAbilityModel[];

  playableCharacterAgentInteractableModelList!: PlayableCharacterAgentInteractableModel[];

  factionModelList!:                            FactionModel[];

  agentInteractableLootTableModelList!:         AgentInteractableLootTableModel[];

  worldInteractableReflectionModelList!:        WorldInteractableReflectionModel[];

  eventContinuationModelList!:                  EventContinuationModel[];

  sourceAgentInteractableReactionModelList!:    AgentInteractableReactionModel[];
  sourceEventContinuationModelList!:            EventContinuationModel[];
  sourceInteractionTriggerModelList!:           InteractionTriggerModel[];
  sourceMenuEventEntryModelList!:               MenuEventEntryModel[];
  sourceStealItemEventModelList!:               StealItemEventModel[];
  sourceEventEffectModelList!:                  EventEffectModel[];

  constructor(init:Partial<EventPageModel>) {  
    Object.assign(this, init);

    if(this.eventModel) this.eventModel = new EventModel(this.eventModel);

    this.menuEventEntryModelList                     = this.menuEventEntryModelList                    .map((model) => new MenuEventEntryModel                    (model));

    this.dialogueEventSpeechModelList                = this.dialogueEventSpeechModelList               .map((model) => new DialogueEventSpeechModel               (model));

    this.itemModelList                               = this.itemModelList                              .map((model) => new ItemModel                              (model));

    this.itemEventItemModelList                      = this.itemEventItemModelList                     .map((model) => new ItemEventItemModel                     (model));

    this.effectModelList                             = this.effectModelList                            .map((model) => new EffectModel                            (model));

    this.dischargeAbilityModelList                   = this.dischargeAbilityModelList                  .map((model) => new DischargeAbilityModel                  (model));

    this.playableCharacterAgentInteractableModelList = this.playableCharacterAgentInteractableModelList.map((model) => new PlayableCharacterAgentInteractableModel(model));

    this.factionModelList                            = this.factionModelList                           .map((model) => new FactionModel                           (model));

    this.agentInteractableLootTableModelList         = this.agentInteractableLootTableModelList        .map((model) => new AgentInteractableLootTableModel        (model));

    this.worldInteractableReflectionModelList        = this.worldInteractableReflectionModelList       .map((model) => new WorldInteractableReflectionModel       (model));

    this.eventContinuationModelList                  = this.eventContinuationModelList                 .map((model) => new EventContinuationModel                 (model));

    this.sourceAgentInteractableReactionModelList    = this.sourceAgentInteractableReactionModelList   .map((model) => new AgentInteractableReactionModel         (model));
    this.sourceEventContinuationModelList            = this.sourceEventContinuationModelList           .map((model) => new EventContinuationModel                 (model));
    this.sourceInteractionTriggerModelList           = this.sourceInteractionTriggerModelList          .map((model) => new InteractionTriggerModel                (model));
    this.sourceMenuEventEntryModelList               = this.sourceMenuEventEntryModelList              .map((model) => new MenuEventEntryModel                    (model));
    this.sourceStealItemEventModelList               = this.sourceStealItemEventModelList              .map((model) => new StealItemEventModel                    (model));
    this.sourceEventEffectModelList                  = this.sourceEventEffectModelList                 .map((model) => new EventEffectModel                       (model));
  }
}