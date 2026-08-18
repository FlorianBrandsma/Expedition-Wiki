import { ResourceCaseConditionModel } from "./resourceCaseConditionModel";
import { EffectCaseConditionModel } from "./effectCaseConditionModel";
import { ItemCaseConditionModel } from "./itemCaseConditionModel";
import { FactionCaseConditionModel } from "./factionCaseConditionModel";
import { CharacterCaseConditionModel } from "./characterCaseConditionModel";
import { CompanionCaseConditionModel } from "./companionCaseConditionModel";
import { TaskCaseConditionModel } from "./taskCaseConditionModel";
import { CombatCaseConditionModel } from "./combatCaseConditionModel";
import { LootCaseConditionModel } from "./lootCaseConditionModel";
import { CaseConditionType } from "../../types/enums";

export class CaseConditionModel {

  id!: number;

  type!: number;

  resourceCaseConditionModelList!: ResourceCaseConditionModel[];
  effectCaseConditionModelList!: EffectCaseConditionModel[];
  itemCaseConditionModelList!: ItemCaseConditionModel[];
  factionCaseConditionModelList!: FactionCaseConditionModel[];
  characterCaseConditionModelList!: CharacterCaseConditionModel[];
  companionCaseConditionModelList!: CompanionCaseConditionModel[];
  taskCaseConditionModelList!: TaskCaseConditionModel[];
  combatCaseConditionModelList!: CombatCaseConditionModel[];
  lootCaseConditionModelList!: LootCaseConditionModel[];

  constructor(init:Partial<CaseConditionModel>) {  
    Object.assign(this, init);

    this.resourceCaseConditionModelList  = this.resourceCaseConditionModelList .map((model) => new ResourceCaseConditionModel (model));
    this.effectCaseConditionModelList    = this.effectCaseConditionModelList   .map((model) => new EffectCaseConditionModel   (model));
    this.itemCaseConditionModelList      = this.itemCaseConditionModelList     .map((model) => new ItemCaseConditionModel     (model));
    this.factionCaseConditionModelList   = this.factionCaseConditionModelList  .map((model) => new FactionCaseConditionModel  (model));
    this.characterCaseConditionModelList = this.characterCaseConditionModelList.map((model) => new CharacterCaseConditionModel(model));
    this.companionCaseConditionModelList = this.companionCaseConditionModelList.map((model) => new CompanionCaseConditionModel(model));
    this.taskCaseConditionModelList      = this.taskCaseConditionModelList     .map((model) => new TaskCaseConditionModel     (model));
    this.combatCaseConditionModelList    = this.combatCaseConditionModelList   .map((model) => new CombatCaseConditionModel   (model));
    this.lootCaseConditionModelList      = this.lootCaseConditionModelList     .map((model) => new LootCaseConditionModel     (model));
  }

  get resourceCaseConditionModel(): ResourceCaseConditionModel {  
    return this.resourceCaseConditionModelList[0];
  }

  get effectCaseConditionModel(): EffectCaseConditionModel {  
    return this.effectCaseConditionModelList[0];
  }

  get itemCaseConditionModel(): ItemCaseConditionModel {  
    return this.itemCaseConditionModelList[0];
  }

  get factionCaseConditionModel(): FactionCaseConditionModel {  
    return this.factionCaseConditionModelList[0];
  }

  get characterCaseConditionModel(): CharacterCaseConditionModel {  
    return this.characterCaseConditionModelList[0];
  }

  get companionCaseConditionModel(): CompanionCaseConditionModel {  
    return this.companionCaseConditionModelList[0];
  }

  get taskCaseConditionModel(): TaskCaseConditionModel {  
    return this.taskCaseConditionModelList[0];
  }

  get combatCaseConditionModel(): CombatCaseConditionModel {  
    return this.combatCaseConditionModelList[0];
  }

  get lootCaseConditionModel(): LootCaseConditionModel {  
    return this.lootCaseConditionModelList[0];
  }

  descriptionComponent(): React.ReactNode {

      switch (CaseConditionType[this.type])
      {
        case 'Resource':  return this.resourceCaseConditionModel! .description();
        case 'Effect':    return this.effectCaseConditionModel!   .descriptionComponent();
        case 'Item':      return this.itemCaseConditionModel!     .descriptionComponent();
        case 'Faction':   return this.factionCaseConditionModel!  .descriptionComponent();
        case 'Character': return this.characterCaseConditionModel!.descriptionComponent();
        case 'Companion': return this.companionCaseConditionModel!.descriptionComponent();
        case 'Task':      return this.taskCaseConditionModel!     .description();
        case 'Combat':    return this.combatCaseConditionModel!   .description();
        case 'Loot':      return this.lootCaseConditionModel!     .description();
      }
    }
}