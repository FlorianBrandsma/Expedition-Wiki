export class FactionModel {
  
  id!: number;
  type!: number;

  name!: string;

  rankLimit!: number;
  allyRank!: number;

  iconResourceName!: string;
  
  factionRank!: number;

  constructor(init:Partial<FactionModel>) {  
    Object.assign(this, init);
  }

  get attitudeDescription(): string {
    return this.factionRank >= this.allyRank ? 'Friendly' : 'Hostile';
  }
}