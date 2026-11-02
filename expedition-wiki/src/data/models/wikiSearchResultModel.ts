import { WikiSearchResultType } from "../../types/enums";
import { AbilityModel } from "./abilityModel";
import { ClassModel } from "./classModel";
import { ClimateModel } from "./climateModel";
import { EffectModel } from "./effectModel";
import { EquipmentSetModel } from "./equipmentSetModel";
import { EventModel } from "./eventModel";
import { FactionModel } from "./factionModel";
import { InteractableModel } from "./interactableModel";
import { ItemModel } from "./itemModel";
import { ObjectiveModel } from "./objectiveModel";
import { QuestModel } from "./questModel";
import { TaskModel } from "./taskModel";
import { TerrainModel } from "./terrainModel";
import { WaypointModel } from "./waypointModel";

export class WikiSearchResultModel {

  type!: number;

  effectModelList!:       EffectModel[];
  abilityModelList!:      AbilityModel[];
  itemModelList!:         ItemModel[];
  equipmentSetModelList!: EquipmentSetModel[];
  factionModelList!:      FactionModel[];
  classModelList!:        ClassModel[];
  interactableModelList!: InteractableModel[];
  terrainModelList!:      TerrainModel[];
  climateModelList!:      ClimateModel[];
  waypointModelList!:     WaypointModel[];
  questModelList!:        QuestModel[];
  objectiveModelList!:    ObjectiveModel[];
  taskModelList!:         TaskModel[];
  eventModelList!:        EventModel[];

  activeModel: EffectModel       |
               AbilityModel      | 
               ItemModel         |
               EquipmentSetModel | 
               FactionModel      | 
               ClassModel        | 
               InteractableModel | 
               TerrainModel      | 
               ClimateModel      | 
               WaypointModel     | 
               QuestModel        | 
               ObjectiveModel    | 
               TaskModel         | 
               EventModel        |             
               undefined;

  constructor(init:Partial<WikiSearchResultModel>) {  
    Object.assign(this, init);

    this.effectModelList       = this.effectModelList      .map((model) => new EffectModel      (model));
    this.abilityModelList      = this.abilityModelList     .map((model) => new AbilityModel     (model));
    this.itemModelList         = this.itemModelList        .map((model) => new ItemModel        (model));
    this.equipmentSetModelList = this.equipmentSetModelList.map((model) => new EquipmentSetModel(model));
    this.factionModelList      = this.factionModelList     .map((model) => new FactionModel     (model));
    this.classModelList        = this.classModelList       .map((model) => new ClassModel       (model));
    this.interactableModelList = this.interactableModelList.map((model) => new InteractableModel(model));
    this.terrainModelList      = this.terrainModelList     .map((model) => new TerrainModel     (model));
    this.climateModelList      = this.climateModelList     .map((model) => new ClimateModel     (model));
    this.waypointModelList     = this.waypointModelList    .map((model) => new WaypointModel    (model));
    this.questModelList        = this.questModelList       .map((model) => new QuestModel       (model));
    this.objectiveModelList    = this.objectiveModelList   .map((model) => new ObjectiveModel   (model));
    this.taskModelList         = this.taskModelList        .map((model) => new TaskModel        (model));
    this.eventModelList        = this.eventModelList       .map((model) => new EventModel       (model));

    this.activeModel = [
      this.effectModel,
      this.abilityModel,
      this.itemModel, 
      this.equipmentSetModel, 
      this.factionModel, 
      this.classModel, 
      this.interactableModel, 
      this.terrainModel, 
      this.climateModel, 
      this.waypointModel, 
      this.questModel, 
      this.objectiveModel, 
      this.taskModel, 
      this.eventModel
    ].find(Boolean);
  }

  get effectModel():       EffectModel       { return this.effectModelList      [0]; }
  get abilityModel():      AbilityModel      { return this.abilityModelList     [0]; }
  get itemModel():         ItemModel         { return this.itemModelList        [0]; }
  get equipmentSetModel(): EquipmentSetModel { return this.equipmentSetModelList[0]; }
  get factionModel():      FactionModel      { return this.factionModelList     [0]; }
  get classModel():        ClassModel        { return this.classModelList       [0]; }
  get interactableModel(): InteractableModel { return this.interactableModelList[0]; }
  get terrainModel():      TerrainModel      { return this.terrainModelList     [0]; }
  get climateModel():      ClimateModel      { return this.climateModelList     [0]; }
  get waypointModel():     WaypointModel     { return this.waypointModelList    [0]; }
  get questModel():        QuestModel        { return this.questModelList       [0]; }
  get objectiveModel():    ObjectiveModel    { return this.objectiveModelList   [0]; }
  get taskModel():         TaskModel         { return this.taskModelList        [0]; }
  get eventModel():        EventModel        { return this.eventModelList       [0]; }

  get typeDescription(): WikiSearchResultType {
    return WikiSearchResultType[this.type];
  }

  get key(): string {
    return `${this.typeDescription}_${this.activeModel?.id ?? 0}`;
  }

  get name(): string {
    return this.activeModel?.name ?? '';
  }

  get description(): string {
    
    switch (WikiSearchResultType[this.type]) {
      case 'Effect':       return this.effectModel      .typeDescription;
      case 'Ability':      return this.abilityModel     .typeDescription;
      case 'Item':         return this.itemModel        .typeDescription;
      case 'Interactable': return this.interactableModel.typeDescription;
      case 'Terrain':      return this.terrainModel     .regionName;
      case 'Climate':      return this.climateModel     .terrainName;
      case 'Waypoint':     return this.waypointModel    .terrainName;
      case 'Quest':        return this.questModel       .typeDescription;
      case 'Objective':    return this.objectiveModel   .questName;
      case 'Task':         return this.taskModel        .worldInteractableName;
      case 'Event':        return this.eventModel       .typeDescription;    
      default: return '';
    }
  }

  get iconResourceName(): string {

    if (this.activeModel && 'iconResourceName' in this.activeModel) {
      return (this.activeModel as any).iconResourceName;
    }

    if (this.activeModel && 'assetIconResourceName' in this.activeModel) {
      return (this.activeModel as any).assetIconResourceName;
    }

    return '';
  }

  get params(): string[] {
    return this.activeModel?.params ?? [];
  }

  get optionalParams(): Record<string, string> | undefined {
    
    if (this.activeModel && 'optionalParams' in this.activeModel)
      return this.activeModel?.optionalParams ?? undefined;
  }
}