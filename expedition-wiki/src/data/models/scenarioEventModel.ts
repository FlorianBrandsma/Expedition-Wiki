export class ScenarioEventModel {

  constructor(init:Partial<ScenarioEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Scenario';
  }
}