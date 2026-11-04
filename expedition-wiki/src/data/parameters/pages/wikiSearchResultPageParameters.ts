import type { IParameters } from "../interfaces";

export class WikiSearchResultPageParameters implements IParameters {

  readonly dataType: string = 'WikiSearchResultPage';

  page!: number;
  pageSize!: number;

  gameId?: number[];
  
  wikiSearchResultType?: number[];

  partialName?: string;

  constructor(init?:Partial<WikiSearchResultPageParameters>) {
    Object.assign(this, init);
  }
}