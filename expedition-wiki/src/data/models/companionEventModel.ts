export class CompanionEventModel {

  id!: number;

  eventName!: string;

  constructor(init:Partial<CompanionEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Companion';
  }
}