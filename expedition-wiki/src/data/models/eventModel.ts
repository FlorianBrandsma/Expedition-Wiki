import { EventType } from "../../types/enums";
import { EffectEventModel } from "./effectEventModel";
import { InteractionModel } from "./interactionModel";
import { InteractableModel } from "./interactableModel";
import { RestEventModel } from "./restEventModel";
import { MailEventModel } from "./mailEventModel";
import { ItemEventModel } from "./itemEventModel";
import { AbilityEventModel } from "./abilityEventModel";
import { CompanionEventModel } from "./companionEventModel";
import { ReputationEventModel } from "./reputationEventModel";
import { CombatEventModel } from "./combatEventModel";
import { DialogueEventModel } from "./dialogueEventModel";
import { IntelEventModel } from "./intelEventModel";
import { LootEventModel } from "./lootEventModel";
import { MailboxEventModel } from "./mailboxEventModel";
import { MenuEventModel } from "./menuEventModel";
import { PartyEventModel } from "./partyEventModel";
import { ScenarioEventModel } from "./scenarioEventModel";
import { SignalEventModel } from "./signalEventModel";
import { SpeechEventModel } from "./speechEventModel";
import { TransportEventModel } from "./transportEventModel";

export class EventModel {

  id!: number;

  type!: number;

  name!: string;

  completeTask!: boolean;

  interactableModel!: InteractableModel;
  interactionModel!:  InteractionModel;

  menuEventModelList!:       MenuEventModel[];
  speechEventModelList!:     SpeechEventModel[];
  dialogueEventModelList!:   DialogueEventModel[];
  scenarioEventModelList!:   ScenarioEventModel[];
  transportEventModelList!:  TransportEventModel[];
  restEventModelList!:       RestEventModel[];
  partyEventModelList!:      PartyEventModel[];
  mailboxEventModelList!:    MailboxEventModel[];
  mailEventModelList!:       MailEventModel[];
  itemEventModelList!:       ItemEventModel[];
  abilityEventModelList!:    AbilityEventModel[];
  effectEventModelList!:     EffectEventModel[];
  companionEventModelList!:  CompanionEventModel[];
  reputationEventModelList!: ReputationEventModel[];
  combatEventModelList!:     CombatEventModel[];
  lootEventModelList!:       LootEventModel[];
  signalEventModelList!:     SignalEventModel[];
  intelEventModelList!:      IntelEventModel[];
  
  constructor(init:Partial<EventModel>) {  
    Object.assign(this, init);

    if (this.interactableModel) this.interactableModel = new InteractableModel(this.interactableModel);
    if (this.interactionModel)  this.interactionModel  = new InteractionModel (this.interactionModel);

    this.menuEventModelList       = this.menuEventModelList      .map((model) => new MenuEventModel      (model));
    this.speechEventModelList     = this.speechEventModelList    .map((model) => new SpeechEventModel    (model));
    this.dialogueEventModelList   = this.dialogueEventModelList  .map((model) => new DialogueEventModel  (model));
    this.scenarioEventModelList   = this.scenarioEventModelList  .map((model) => new ScenarioEventModel  (model));
    this.transportEventModelList  = this.transportEventModelList .map((model) => new TransportEventModel (model));
    this.restEventModelList       = this.restEventModelList      .map((model) => new RestEventModel      (model));
    this.partyEventModelList      = this.partyEventModelList     .map((model) => new PartyEventModel     (model));
    this.mailboxEventModelList    = this.mailboxEventModelList   .map((model) => new MailboxEventModel   (model));
    this.mailEventModelList       = this.mailEventModelList      .map((model) => new MailEventModel      (model));
    this.itemEventModelList       = this.itemEventModelList      .map((model) => new ItemEventModel      (model));
    this.abilityEventModelList    = this.abilityEventModelList   .map((model) => new AbilityEventModel   (model));
    this.effectEventModelList     = this.effectEventModelList    .map((model) => new EffectEventModel    (model));
    this.companionEventModelList  = this.companionEventModelList .map((model) => new CompanionEventModel (model));
    this.reputationEventModelList = this.reputationEventModelList.map((model) => new ReputationEventModel(model));
    this.combatEventModelList     = this.combatEventModelList    .map((model) => new CombatEventModel    (model));
    this.lootEventModelList       = this.lootEventModelList      .map((model) => new LootEventModel      (model));
    this.signalEventModelList     = this.signalEventModelList    .map((model) => new SignalEventModel    (model));
    this.intelEventModelList      = this.intelEventModelList     .map((model) => new IntelEventModel     (model));
  }

  get menuEventModel(): MenuEventModel {
    return this.menuEventModelList[0];
  }

  get speechEventModel(): SpeechEventModel {
    return this.speechEventModelList[0];
  }

  get dialogueEventModel(): DialogueEventModel {
    return this.dialogueEventModelList[0];
  }

  get scenarioEventModel(): ScenarioEventModel {
    return this.scenarioEventModelList[0];
  }

  get transportEventModel(): TransportEventModel {
    return this.transportEventModelList[0];
  }

  get restEventModel(): RestEventModel {
    return this.restEventModelList[0];
  }

  get partyEventModel(): PartyEventModel {
    return this.partyEventModelList[0];
  }

  get mailboxEventModel(): MailboxEventModel {
    return this.mailboxEventModelList[0];
  }

  get mailEventModel(): MailEventModel {
    return this.mailEventModelList[0];
  }

  get itemEventModel(): ItemEventModel {
    return this.itemEventModelList[0];
  }

  get abilityEventModel(): AbilityEventModel {
    return this.abilityEventModelList[0];
  }

  get effectEventModel(): EffectEventModel {
    return this.effectEventModelList[0];
  }

  get companionEventModel(): CompanionEventModel {
    return this.companionEventModelList[0];
  }

  get reputationEventModel(): ReputationEventModel {
    return this.reputationEventModelList[0];
  }

  get combatEventModel(): CombatEventModel {
    return this.combatEventModelList[0];
  }

  get lootEventModel(): LootEventModel {
    return this.lootEventModelList[0];
  }

  get signalEventModel(): SignalEventModel {
    return this.signalEventModelList[0];
  }

  get intelEventModel(): IntelEventModel {
    return this.intelEventModelList[0];
  }

  get typeDescription(): string {

    switch (EventType[this.type])
    {
      case 'Menu':       return this.menuEventModel      !.typeDescription;
      case 'Speech':     return this.speechEventModel    !.typeDescription;
      case 'Dialogue':   return this.dialogueEventModel  !.typeDescription;
      case 'Scenario':   return this.scenarioEventModel  !.typeDescription;
      case 'Transport':  return this.transportEventModel !.typeDescription;
      case 'Rest':       return this.restEventModel      !.typeDescription;
      case 'Party':      return this.partyEventModel     !.typeDescription;
      case 'Mailbox':    return this.mailboxEventModel   !.typeDescription;
      case 'Mail':       return this.mailEventModel      !.typeDescription;
      case 'Item':       return this.itemEventModel      !.typeDescription;
      case 'Ability':    return this.abilityEventModel   !.typeDescription;
      case 'Effect':     return this.effectEventModel    !.typeDescription;
      case 'Companion':  return this.companionEventModel !.typeDescription;
      case 'Reputation': return this.reputationEventModel!.typeDescription;
      case 'Combat':     return this.combatEventModel    !.typeDescription;
      case 'Loot':       return this.lootEventModel      !.typeDescription;
      case 'Signal':     return this.signalEventModel    !.typeDescription;
      case 'Intel':      return this.intelEventModel     !.typeDescription;

      default: return '';
    }
  }

  get interactionTimeDescription(): string {
    return this.interactionModel.timeDescription;
  }
}