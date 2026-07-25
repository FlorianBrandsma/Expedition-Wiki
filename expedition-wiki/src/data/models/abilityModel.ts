export class AbilityModel {
  id!: number;
  type!: number;

  name!: string;
  description!: string;
  
  energy!: number;
  enmity!: number;

  cooldownDuration!: number;

  executions!: number;

  iconResourceName!: string;

  constructor(init:Partial<AbilityModel>) {  
    Object.assign(this, init);

    this.cooldownDuration = Number(init.cooldownDuration!.toFixed(2));
  }
};