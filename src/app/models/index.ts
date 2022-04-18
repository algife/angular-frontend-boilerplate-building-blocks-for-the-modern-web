import { v4 as uuidv4 } from 'uuid';

export interface ApiResponse<T> {
  data: T;
}

export class Item {
  readonly id: string = uuidv4();
  prop1: number;
  prop2: string;

  constructor(p1: number, p2: string) {
    this.prop1 = p1;
    this.prop2 = p2;
  }
}

export interface ItemUpdateRequest {
  upsert: boolean;
  payloadObj: Item;
  filterBy: Item;
}

// Extra for demo purposes

export type myTypeDefinition = {
  prop1: string;
};

export enum myEnum {
  'First Value' = 0,
  '2ndValue' = 1,
  value3 = 2,
  'Fourth Value' = 'index is 3',
  'Fifth Value' = 'Value Assigned',
}

export class myClass implements myTypeDefinition {
  prop1: string = ''; // public
  private priv1: myEnum;
  protected prot1: string;

  constructor(_prop1: string, _priv1: string, _prot1: string) {
    this.prop1 = _prop1;
    this.priv1 = myEnum['Fifth Value'];
    this.prot1 = _prot1;
  }
}
