export interface ShipmentTypes {
  fieldName: string;
  regexToApply?: [
    {
      regexToSearch: [];
      replaceWith: '';
    }
  ];
  multiValueDelimiter?: [];
  primaryKeyOrder?: number;
  primaryKeyField?: string;
  deleteWhenNotMatching?: [];
  defaultValue?: string;
  description?: string;
  name: string;
  csvProperties?: {
    csvIndex: number;
  };
  type: any;
  enumType?: string;
  valueMapping?: object;
  exportable?: boolean;
}
// export class ShipmentTypes {
//   constructor (public fieldName: string,
//     public name: string,
//     public type: any,
//   regexToApply?: [
//     {
//       regexToSearch: [],
//       replaceWith: ''
//     }
//   ],
//   multiValueDelimiter?: [],
//   primaryKeyOrder?: number,
//   primaryKeyField?: string,
//   deleteWhenNotMatching?: [],
//   defaultValue?: string,
//   description?: string,
//   csvProperties?: {
//     csvIndex: number,
//   },
//   enumType?: string,
//   valueMapping?: object,
//   exportable?: boolean,){}
// }

