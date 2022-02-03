export interface ProcurementTypes {
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
