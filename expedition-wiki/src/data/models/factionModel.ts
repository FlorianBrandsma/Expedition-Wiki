export class FactionModel {
  
  id!: number;
  type!: number;

  name!: string;

  rankLimit!: number;
  allyRank!: number;

  iconResourceName!: string;
  
  rank!: number;

  constructor(init:Partial<FactionModel>) {  
    Object.assign(this, init);
  }

  get attitudeDescription(): string {
    return this.rank >= this.allyRank ? 'Friendly' : 'Hostile';
  }
}