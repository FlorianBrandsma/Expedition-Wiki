import { WikiSearchResultModel } from "../wikiSearchResultModel";

export class WikiSearchResultPageModel {

  totalCount!: number;

  wikiSearchResultModelList!: WikiSearchResultModel[];

  constructor(init:Partial<WikiSearchResultPageModel>) {  
    Object.assign(this, init);

    this.wikiSearchResultModelList = this.wikiSearchResultModelList.map((model) => new WikiSearchResultModel(model));
  }
}