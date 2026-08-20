export class ActionDelayModel {

  id!: number;

  type!: number;

  duration!: number;

  cancelOnInput!: boolean;
  cancelOnMovementInput!: boolean;
  cancelOnHit!: boolean;

  constructor(init:Partial<ActionDelayModel>) {  
    Object.assign(this, init);

    this.duration = Number(init.duration!.toFixed(2));
  }

  get durationDescription(): string {
    return `${this.duration.toFixed(2)}s`
  }

  get cancelDescription(): string {
    let list: string[] = [];

    if (this.cancelOnInput)
      list.push('input');

    if (this.cancelOnMovementInput)
      list.push('movement input');

    if (this.cancelOnHit)
      list.push('hit');

    return list.length > 0 ? `On ${list.join(', ')}` : '';
  }
}