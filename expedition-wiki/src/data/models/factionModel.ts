export class FactionModel {
  id!: number;
  type!: number;

  name!: string;

  rankLimit!: number;
  allyRank!: number;

  iconResourceName!: string;

  constructor(init:Partial<FactionModel>) {  
    Object.assign(this, init);
  }
};