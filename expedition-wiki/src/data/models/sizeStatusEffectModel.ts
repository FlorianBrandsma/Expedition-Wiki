export class SizeStatusEffectModel {

  scale!: number;

  constructor(init:Partial<SizeStatusEffectModel>) {  
    Object.assign(this, init);

    this.scale = Number(init.scale!.toFixed(2));
  }

  description(stack: number): string {

    const percentageChange = (this.scale - 1) * 100;

    return `${percentageChange >= 0 ? 'Increase' : 'Reduce'} size by ${percentageChange >= 0 ? percentageChange : Math.abs(percentageChange) * stack}%`;
  }
};