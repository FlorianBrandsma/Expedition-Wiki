export class TextReferenceModel {

  type!: number;

  name!: string;
  referenceCode!: string;

  constructor(init:Partial<TextReferenceModel>) {  
    Object.assign(this, init);
  }
}