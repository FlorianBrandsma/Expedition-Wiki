import { EffectModel } from "../effectModel";

import { AbilityModel } from "../abilityModel";
import { StatusEffectModel } from "../statusEffectModel";
import { ResistStatusEffectModel } from "../resistStatusEffectModel";
import { EquipmentItemModel } from "../equipmentItemModel";
import { AgentInteractableModel } from "../agentInteractableModel";
import { EquipmentSetModel } from "../equipmentSetModel";
import { ClusterStatusEffectModel } from "../clusterStatusEffectModel";
import { EventModel } from "../eventModel";
import { EffectEventModel } from "../effectEventModel";
import { AtmosphereModel } from "../atmosphereModel";

export class EffectPageModel {

  effectModel!: EffectModel;

  eventModelList!: EventModel[];
  statusEffectModelList!: StatusEffectModel[];
  resistStatusEffectModelList!: ResistStatusEffectModel[];

  abilityModelList!: AbilityModel[];

  equipmentItemModelList!: EquipmentItemModel[];
  equipmentSetModelList!: EquipmentSetModel[];
  agentInteractableModelList!: AgentInteractableModel[];
  atmosphereModelList!: AtmosphereModel[];
  clusterStatusEffectModelList!: ClusterStatusEffectModel[];
  
  effectEventModelList!: EffectEventModel[];

  constructor(init:Partial<EffectPageModel>) {  
    Object.assign(this, init);

    this.effectModel = new EffectModel(this.effectModel);

    this.eventModelList               = this.eventModelList              .map((model) => new EventModel              (model));
    this.statusEffectModelList        = this.statusEffectModelList       .map((model) => new StatusEffectModel       (model));
    this.resistStatusEffectModelList  = this.resistStatusEffectModelList .map((model) => new ResistStatusEffectModel (model));

    this.abilityModelList             = this.abilityModelList            .map((model) => new AbilityModel            (model));

    this.equipmentItemModelList       = this.equipmentItemModelList      .map((model) => new EquipmentItemModel      (model));
    this.equipmentSetModelList        = this.equipmentSetModelList       .map((model) => new EquipmentSetModel       (model));
    this.agentInteractableModelList   = this.agentInteractableModelList  .map((model) => new AgentInteractableModel  (model));
    this.atmosphereModelList          = this.atmosphereModelList         .map((model) => new AtmosphereModel         (model));
    this.clusterStatusEffectModelList = this.clusterStatusEffectModelList.map((model) => new ClusterStatusEffectModel(model));

    this.effectEventModelList         = this.effectEventModelList        .map((model) => new EffectEventModel        (model));
  }
};