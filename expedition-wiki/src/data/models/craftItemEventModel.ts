export class CraftItemEventModel {

  constructor(init:Partial<CraftItemEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Craft Item';
  }
}