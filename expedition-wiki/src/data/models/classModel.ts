export class ClassModel {
  id!: number;
  type!: number;

  name!: string;

  constructor(init:Partial<ClassModel>) {  
    Object.assign(this, init);
  }
};