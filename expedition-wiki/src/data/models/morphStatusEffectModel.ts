import { AssetIndefiniteArticle } from "../../types/enums";
import { AssetModel } from "./assetModel";

export class MorphStatusEffectModel {

  assetModelList!: AssetModel[];

  constructor(init:Partial<MorphStatusEffectModel>) {  
    Object.assign(this, init);

    this.assetModelList = this.assetModelList.map((model) => new AssetModel(model));
  }

  get assetModel(): AssetModel {
    return this.assetModelList[0];
  }

  description(): string {
    return `Morph into ${AssetIndefiniteArticle[this.assetModel.indefiniteArticle].toLowerCase()} ${this.assetModel.name.toLowerCase()}`;
  }
}