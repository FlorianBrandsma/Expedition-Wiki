export class ReputationEventModel {

  id!: number;

  eventName!: string;
  
  factionReputation!: number;

  constructor(init:Partial<ReputationEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Reputation Event';
  }
}