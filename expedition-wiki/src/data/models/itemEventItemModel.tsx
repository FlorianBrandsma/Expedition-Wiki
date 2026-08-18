import { StealItemEventItemModel } from "./stealItemEventItemModel";
import { TradeItemEventItemModel } from "./tradeItemEventItemModel";
import { ShopItemEventItemModel } from "./shopItemEventItemModel";
import { CraftItemEventItemModel } from "./craftItemEventItemModel";
import { RelinquishItemEventItemModel } from "./relinquishItemEventItemModel";
import { DistributeItemEventItemModel } from "./distributeItemEventItemModel";
import { LimitedItemEventItemModel } from "./limitedItemEventItemModelList";
import { CaseConditionModel } from "./caseConditionModel";
import type { ItemModel } from "./itemModel";

export class ItemEventItemModel {

  id!: number;

  itemEventType!: number;

  type!: number;

  itemEventName!: string;

  itemName!: string;
  
  itemAssetIconResourceName!: string;

  stealItemEventItemModelList!: StealItemEventItemModel[];
  tradeItemEventItemModelList!: TradeItemEventItemModel[];
  shopItemEventItemModelList!: ShopItemEventItemModel[];
  craftItemEventItemModelList!: CraftItemEventItemModel[];
  relinquishItemEventItemModelList!: RelinquishItemEventItemModel[];
  distributeItemEventItemModelList!: DistributeItemEventItemModel[];

  limitedItemEventItemModelList!: LimitedItemEventItemModel[];

  caseConditionModelList!: CaseConditionModel[];

  constructor(init:Partial<ItemEventItemModel>) {  
    Object.assign(this, init);

    this.stealItemEventItemModelList      = this.stealItemEventItemModelList     .map((model) => new StealItemEventItemModel     (model));
    this.tradeItemEventItemModelList      = this.tradeItemEventItemModelList     .map((model) => new TradeItemEventItemModel     (model));
    this.shopItemEventItemModelList       = this.shopItemEventItemModelList      .map((model) => new ShopItemEventItemModel      (model));
    this.craftItemEventItemModelList      = this.craftItemEventItemModelList     .map((model) => new CraftItemEventItemModel     (model));
    this.relinquishItemEventItemModelList = this.relinquishItemEventItemModelList.map((model) => new RelinquishItemEventItemModel(model));
    this.distributeItemEventItemModelList = this.distributeItemEventItemModelList.map((model) => new DistributeItemEventItemModel(model));

    this.limitedItemEventItemModelList    = this.limitedItemEventItemModelList   .map((model) => new LimitedItemEventItemModel   (model));
    
    this.caseConditionModelList           = this.caseConditionModelList          .map((model) => new CaseConditionModel          (model));
  }

  get stealItemEventItemModel(): StealItemEventItemModel {  
    return this.stealItemEventItemModelList[0];
  }

  get tradeItemEventItemModel(): TradeItemEventItemModel {  
    return this.tradeItemEventItemModelList[0];
  }

  get shopItemEventItemModel(): ShopItemEventItemModel {  
    return this.shopItemEventItemModelList[0];
  }

  get craftItemEventItemModel(): CraftItemEventItemModel {  
    return this.craftItemEventItemModelList[0];
  }

  get relinquishItemEventItemModel(): RelinquishItemEventItemModel {  
    return this.relinquishItemEventItemModelList[0];
  }

  get distributeItemEventItemModel(): DistributeItemEventItemModel {  
    return this.distributeItemEventItemModelList[0];
  }

  get limitedItemEventItemModel(): LimitedItemEventItemModel {  
    return this.limitedItemEventItemModelList[0];
  }

  get tradeItemEventItemRelinquishItemModelList(): ItemModel[] {
    return this.tradeItemEventItemModel.itemModelList;
  }

  get relinquishItemEventItemQuantity(): number {
    return this.relinquishItemEventItemModel.quantity;
  }

  get stealItemEventItemQuantityDescription(): string {
    return this.stealItemEventItemModel.quantityDescription;
  }

  get stealItemEventItemSuccessChanceDescription(): string {
    return this.stealItemEventItemModel.successChanceDescription;
  }

  get tradeItemEventItemRelinquishQuantity(): number {  
    return this.tradeItemEventItemModel.relinquishQuantity;
  }

  get shopItemEventItemRate(): number {
    return this.shopItemEventItemModel.rate;
  }

  get shopItemEventItemValue(): number {
    return this.shopItemEventItemModel.value;
  }

  get shopItemEventItemCurrencyItemName(): string {
    return this.shopItemEventItemModel.shopItemEventCurrencyItemName;
  }

  get shopItemEventItemCurrencyItemIconResourceName(): string {
    return this.shopItemEventItemModel.shopItemEventCurrencyItemAssetIconResourceName;
  }

  get costCraftItemEventItemQuantity(): number {  
    return this.craftItemEventItemModel.costCraftItemEventItemModel.quantity;
  }

  get costCraftItemEventItemName(): string {
    return this.craftItemEventItemModel.costCraftItemEventItemModel.itemName;
  }

  get costCraftItemEventItemIconResourceName(): string {
    return this.craftItemEventItemModel.costCraftItemEventItemModel.itemIconResourceName;
  }

  get distributeItemEventItemQuantityDescription(): string {
    return this.distributeItemEventItemModel.quantityDescription;
  }

  get limitedItemEventItemQuantityDescription(): string {  
    return this.limitedItemEventItemModel?.quantityDescription;
  }
}