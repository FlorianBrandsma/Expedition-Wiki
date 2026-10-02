export class ClaimItemEventModel {

  constructor(init:Partial<ClaimItemEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Claim Item';
  }
}