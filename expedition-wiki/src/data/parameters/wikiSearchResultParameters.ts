import type { IParameters } from "./interfaces";

export const WikiSearchResultRequestType = {
  Custom: 0
}  as const;

export class WikiSearchResultParameters implements IParameters {

  readonly dataType: string = "WikiSearchResult";

  requestType?: (typeof WikiSearchResultRequestType)[keyof typeof WikiSearchResultRequestType];

  gameId?: number[];
  
  partialName?: string;

  limit?: number;

  constructor(init?:Partial<WikiSearchResultParameters>) {
    Object.assign(this, init);
  }
}