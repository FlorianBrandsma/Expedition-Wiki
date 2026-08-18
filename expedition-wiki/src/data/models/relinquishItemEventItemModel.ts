export class RelinquishItemEventItemModel {

  quantity!: number;

  constructor(init:Partial<RelinquishItemEventItemModel>) {  
    Object.assign(this, init);
  }
}