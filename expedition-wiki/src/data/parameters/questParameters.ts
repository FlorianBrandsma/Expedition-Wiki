import type { IParameters } from "./interfaces";

export const QuestRequestType = {
  Custom: 0,
  GetFilterQuests: 1
}  as const;

export class QuestParameters implements IParameters {

  readonly dataType: string = "Quest";

  requestType?: (typeof QuestRequestType)[keyof typeof QuestRequestType];

  id?: number[];
  excludeId?: number[];

  gameId?: number[];

  name?: string;

  constructor(init?:Partial<QuestParameters>) {
    Object.assign(this, init);
  }
}