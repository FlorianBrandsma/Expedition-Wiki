import { ItemComponentType } from "../../../types/enums";

import { ItemModel } from "../itemModel";
import { ItemComponentModel } from "../itemComponentModel";
import { CurrencyItemModel } from "../currencyItemModel";
import { EquipmentSetModel } from "../equipmentSetModel";
import { StatusEffectModel } from "../statusEffectModel";
import { DischargeAbilityModel } from "../dischargeAbilityModel";
import { SpellDischargeAbilityModel } from "../spellDischargeAbilityModel";
import { ClassModel } from "../classModel";

export class ItemPageModel {

  itemModel!: ItemModel;

  classModelList!: ClassModel[]

  equipmentSetModelList!: EquipmentSetModel[];

  statusEffectModelList!: StatusEffectModel[];

  dischargeAbilityModelList!: DischargeAbilityModel[];
  spellDischargeAbilityModelList!: SpellDischargeAbilityModel[];

  currencyItemModelList!: CurrencyItemModel[];

  itemComponentModelList!: ItemComponentModel[];
  componentItemModelList!: ItemModel[];

  constructor(init:Partial<ItemPageModel>) {  
    Object.assign(this, init);

    this.itemModel = new ItemModel(this.itemModel);

    this.classModelList                 = this.classModelList                .map((model) => new ClassModel                (model));

    this.equipmentSetModelList          = this.equipmentSetModelList         .map((model) => new EquipmentSetModel         (model));

    this.statusEffectModelList          = this.statusEffectModelList         .map((model) => new StatusEffectModel         (model));

    this.dischargeAbilityModelList      = this.dischargeAbilityModelList     .map((model) => new DischargeAbilityModel     (model));
    this.spellDischargeAbilityModelList = this.spellDischargeAbilityModelList.map((model) => new SpellDischargeAbilityModel(model));

    this.currencyItemModelList          = this.currencyItemModelList         .map((model) => new CurrencyItemModel         (model));

    this.itemComponentModelList         = this.itemComponentModelList        .map((model) => new ItemComponentModel        (model));
    this.componentItemModelList         = this.componentItemModelList        .map((model) => new ItemModel                 (model));
  }

  get createItemComponentModelList(): ItemComponentModel[] {
    return this.itemComponentModelList?.filter(x => ItemComponentType[x.type] == 'Create') ?? [];
  }

  get scrapItemComponentModelList(): ItemComponentModel[] {
    return this.itemComponentModelList?.filter(x => ItemComponentType[x.type] == 'Scrap') ?? [];
  }
};