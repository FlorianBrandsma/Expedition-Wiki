export class MenuEventModel {

  constructor(init:Partial<MenuEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Menu';
  }
}