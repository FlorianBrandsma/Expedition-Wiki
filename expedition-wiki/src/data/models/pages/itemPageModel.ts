import { ItemComponentType, ItemEventType } from "../../../types/enums";

import { ItemModel } from "../itemModel";
import { ItemComponentModel } from "../itemComponentModel";
import { CurrencyItemModel } from "../currencyItemModel";
import { EquipmentSetModel } from "../equipmentSetModel";
import { StatusEffectModel } from "../statusEffectModel";
import { DischargeAbilityModel } from "../dischargeAbilityModel";
import { SpellDischargeAbilityModel } from "../spellDischargeAbilityModel";
import { ClassModel } from "../classModel";
import { AgentInteractableLootTableModel } from "../agentInteractableLootTableModel";
import { ItemEventModel } from "../itemEventModel";
import { MailEventModel } from "../mailEventModel";
import { RestEventModel } from "../restEventModel";
import { ShopItemEventModel } from "../shopItemEventModel";
import { CharacterAgentInteractableModel } from "../characterAgentInteractableModel";
import { ItemEventItemModel } from "../itemEventItemModel";

export class ItemPageModel {

  itemModel!: ItemModel;

  classModelList!: ClassModel[]

  equipmentSetModelList!: EquipmentSetModel[];

  statusEffectModelList!: StatusEffectModel[];

  dischargeAbilityModelList!: DischargeAbilityModel[];
  spellDischargeAbilityModelList!: SpellDischargeAbilityModel[];

  characterAgentInteractableModelList!: CharacterAgentInteractableModel[];

  currencyItemModelList!: CurrencyItemModel[];

  itemComponentModelList!: ItemComponentModel[];
  restEventModelList!: RestEventModel[];
  shopItemEventModelList!: ShopItemEventModel[];
  shopItemEventItemModelList!: ItemEventItemModel[];
  tradeItemEventItemModelList!: ItemEventItemModel[];
  craftItemEventItemModelList!: ItemEventItemModel[];

  componentItemModelList!: ItemModel[];
  agentInteractableLootTableModelList!: AgentInteractableLootTableModel[];
  mailEventModelList!: MailEventModel[];
  itemEventItemModelList!: ItemEventItemModel[];
  itemModelList!: ItemModel[];

  constructor(init:Partial<ItemPageModel>) {  
    Object.assign(this, init);

    this.itemModel = new ItemModel(this.itemModel);

    this.classModelList                      = this.classModelList                     .map((model) => new ClassModel                     (model));

    this.equipmentSetModelList               = this.equipmentSetModelList              .map((model) => new EquipmentSetModel              (model));

    this.statusEffectModelList               = this.statusEffectModelList              .map((model) => new StatusEffectModel              (model));

    this.dischargeAbilityModelList           = this.dischargeAbilityModelList          .map((model) => new DischargeAbilityModel          (model));
    this.spellDischargeAbilityModelList      = this.spellDischargeAbilityModelList     .map((model) => new SpellDischargeAbilityModel     (model));

    this.characterAgentInteractableModelList = this.characterAgentInteractableModelList.map((model) => new CharacterAgentInteractableModel(model));

    this.currencyItemModelList               = this.currencyItemModelList              .map((model) => new CurrencyItemModel              (model));

    this.itemComponentModelList              = this.itemComponentModelList             .map((model) => new ItemComponentModel             (model));
    this.restEventModelList                  = this.restEventModelList                 .map((model) => new RestEventModel                 (model));
    this.shopItemEventModelList              = this.shopItemEventModelList             .map((model) => new ShopItemEventModel             (model)); 
    this.shopItemEventItemModelList          = this.shopItemEventItemModelList         .map((model) => new ItemEventItemModel             (model));
    this.tradeItemEventItemModelList         = this.tradeItemEventItemModelList        .map((model) => new ItemEventItemModel             (model));
    this.craftItemEventItemModelList         = this.craftItemEventItemModelList        .map((model) => new ItemEventItemModel             (model));

    this.componentItemModelList              = this.componentItemModelList             .map((model) => new ItemModel                      (model));
    this.agentInteractableLootTableModelList = this.agentInteractableLootTableModelList.map((model) => new AgentInteractableLootTableModel(model));
    this.mailEventModelList                  = this.mailEventModelList                 .map((model) => new MailEventModel                 (model));
    this.itemEventItemModelList              = this.itemEventItemModelList             .map((model) => new ItemEventItemModel             (model));
    this.itemModelList                       = this.itemModelList                      .map((model) => new ItemModel                      (model));
  }

  get createComponentItemModelList(): ItemModel[] {
    return this.componentItemModelList?.filter(x => ItemComponentType[x.itemComponentType] === 'Create') ?? [];
  }

  get scrapComponentItemModelList(): ItemModel[] {
    return this.componentItemModelList?.filter(x => ItemComponentType[x.itemComponentType] === 'Scrap') ?? [];
  }

  get relinquishItemEventItemModelList(): ItemEventItemModel[] {
    return this.itemEventItemModelList?.filter(x => ItemEventType[x.itemEventType] == 'Relinquish') ?? [];
  }

  get sourceStealItemEventItemModelList(): ItemEventItemModel[] {
    return this.itemEventItemModelList?.filter(x => ItemEventType[x.itemEventType] == 'Steal') ?? [];
  }

  get sourceClaimItemEventItemModelList(): ItemEventItemModel[] {
    return this.itemEventItemModelList?.filter(x => ItemEventType[x.itemEventType] == 'Claim') ?? [];
  }

  get sourceTradeItemEventItemModelList(): ItemEventItemModel[] {
    return this.itemEventItemModelList?.filter(x => ItemEventType[x.itemEventType] == 'Trade') ?? [];
  }

  get sourceShopItemEventItemModelList(): ItemEventItemModel[] {
    return this.itemEventItemModelList?.filter(x => ItemEventType[x.itemEventType] == 'Shop') ?? [];
  }

  get sourceCraftItemEventItemModelList(): ItemEventItemModel[] {
    return this.itemEventItemModelList?.filter(x => ItemEventType[x.itemEventType] == 'Craft') ?? [];
  }

  get sourceDistributeItemEventItemModelList(): ItemEventItemModel[] {
    return this.itemEventItemModelList?.filter(x => ItemEventType[x.itemEventType] == 'Distribute') ?? [];
  }
}