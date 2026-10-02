import { ItemEventType } from "../../types/enums";
import { EventModel } from "./eventModel";
import { ClaimItemEventModel } from "./claimItemEventModel";
import { CraftItemEventModel } from "./craftItemEventModel";
import { DistributeItemEventModel } from "./distributeItemEventModel";
import { LootItemEventModel } from "./lootItemEventModel";
import { RelinquishItemEventModel } from "./relinquishItemEventModel";
import { ShopItemEventModel } from "./shopItemEventModel";
import { StealItemEventModel } from "./stealItemEventModel";
import { TradeItemEventModel } from "./tradeItemEventModel";

export class ItemEventModel {

  id!: number;

  type!: number;

  eventName!: string;

  lootItemEventModelList!: LootItemEventModel[];
  stealItemEventModelList!: StealItemEventModel[];
  claimItemEventModelList!: ClaimItemEventModel[];
  tradeItemEventModelList!: TradeItemEventModel[];
  shopItemEventModelList!: ShopItemEventModel[];
  craftItemEventModelList!: CraftItemEventModel[];
  relinquishItemEventModelList!: RelinquishItemEventModel[];
  distributeItemEventModelList!: DistributeItemEventModel[];

  eventModelList!: EventModel[];

  constructor(init:Partial<ItemEventModel>) {  
    Object.assign(this, init);

    this.lootItemEventModelList       = this.lootItemEventModelList      .map((model) => new LootItemEventModel      (model));
    this.stealItemEventModelList      = this.stealItemEventModelList     .map((model) => new StealItemEventModel     (model));
    this.claimItemEventModelList      = this.claimItemEventModelList     .map((model) => new ClaimItemEventModel     (model));
    this.tradeItemEventModelList      = this.tradeItemEventModelList     .map((model) => new TradeItemEventModel     (model));
    this.shopItemEventModelList       = this.shopItemEventModelList      .map((model) => new ShopItemEventModel      (model));
    this.craftItemEventModelList      = this.craftItemEventModelList     .map((model) => new CraftItemEventModel     (model));
    this.relinquishItemEventModelList = this.relinquishItemEventModelList.map((model) => new RelinquishItemEventModel(model));
    this.distributeItemEventModelList = this.distributeItemEventModelList.map((model) => new DistributeItemEventModel(model));

    this.eventModelList               = this.eventModelList              .map((model) => new EventModel              (model));
  }

  get lootItemEventModel(): LootItemEventModel {  
    return this.lootItemEventModelList[0];
  }

  get stealItemEventModel(): StealItemEventModel {  
    return this.stealItemEventModelList[0];
  }

  get claimItemEventModel(): ClaimItemEventModel {  
    return this.claimItemEventModelList[0];
  }

  get tradeItemEventModel(): TradeItemEventModel {  
    return this.tradeItemEventModelList[0];
  }

  get shopItemEventModel(): ShopItemEventModel {  
    return this.shopItemEventModelList[0];
  }

  get craftItemEventModel(): CraftItemEventModel {  
    return this.craftItemEventModelList[0];
  }

  get relinquishItemEventModel(): RelinquishItemEventModel {  
    return this.relinquishItemEventModelList[0];
  }
  
  get distributeItemEventModel(): DistributeItemEventModel {  
    return this.distributeItemEventModelList[0];
  }

  get eventModel(): EventModel {
    return this.eventModelList[0];
  }

  get typeDescription(): string {

    switch (ItemEventType[this.type])
    {
      case 'Loot':       return this.lootItemEventModel      !.typeDescription;
      case 'Steal':      return this.stealItemEventModel     !.typeDescription;
      case 'Claim':      return this.claimItemEventModel     !.typeDescription;
      case 'Trade':      return this.tradeItemEventModel     !.typeDescription;
      case 'Shop':       return this.shopItemEventModel      !.typeDescription;
      case 'Craft':      return this.craftItemEventModel     !.typeDescription;
      case 'Relinquish': return this.relinquishItemEventModel!.typeDescription;
      case 'Distribute': return this.distributeItemEventModel!.typeDescription;
    }
  }
}