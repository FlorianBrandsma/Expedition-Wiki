import { FactionModel } from "../factionModel";
import { InteractableModel } from "../interactableModel";
import { ReputationEventModel } from "../reputationEventModel";
import { StandingStatusEffectModel } from "../standingStatusEffectModel";

export class FactionPageModel {

  factionModel!: FactionModel;

  interactableModelList!: InteractableModel[];

  factionStandingModelList!: FactionModel[];
  standingFactionModelList!: FactionModel[];

  standingStatusEffectModelList!: StandingStatusEffectModel[];

  reputationEventModelList!: ReputationEventModel[];

  constructor(init:Partial<FactionPageModel>) {  
    Object.assign(this, init);

    this.factionModel = new FactionModel(this.factionModel);

    this.interactableModelList         = this.interactableModelList        .map((model) => new InteractableModel        (model));

    this.factionStandingModelList      = this.factionStandingModelList     .map((model) => new FactionModel             (model));
    this.standingFactionModelList      = this.standingFactionModelList     .map((model) => new FactionModel             (model));

    this.standingStatusEffectModelList = this.standingStatusEffectModelList.map((model) => new StandingStatusEffectModel(model));

    this.reputationEventModelList      = this.reputationEventModelList     .map((model) => new ReputationEventModel     (model));
  }

  get friendlyFactionModelList(): FactionModel[] {
    return this.standingFactionModelList.filter(x => x.rank >= this.factionModel.allyRank);
  }

  get hostileFactionModelList(): FactionModel[] {
    return this.standingFactionModelList.filter(x => x.rank < this.factionModel.allyRank);
  }
}