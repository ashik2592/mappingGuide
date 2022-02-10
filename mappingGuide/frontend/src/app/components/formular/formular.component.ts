import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  ElementRef,
  ViewChild,
  VERSION,
} from '@angular/core'; //Output
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  FormGroup,
  FormControlName,
  AbstractControl,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
interface Group {
  name: string;
  id: string;
}
interface ShipmentTypeValMap {
  name: string;
  value: string;
}
interface Operation {
  name: string;
}
interface Delimiter {
  name: string;
}
interface Entity {
  name: string;
}
interface columnFieldCategory {
  fieldName: String;
  type: string;
}
@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css'],
})
export class FormularComponent implements OnInit {
  mgUI!: FormGroup;
  type!: FormGroup;
  //fields!: FormArray;
  valueMapping?: any;
  selectedId!: string;
  newID!: string;
  newType!: string;
  newName!: string;
  selectedEntity!: string;
  combinedId!: string;
  procurement!: any;
  selectFormControl = new FormControl('', Validators.required);
  groupIdControl = new FormControl('', Validators.required);
  groups: Group[] = [
    { name: 'Arne', id: 'limbiq-brand-jane-brand' },
    { name: 'Ashik', id: 'limbiq.com-ashikcorp' },
    { name: 'Nina', id: 'limbiq.com-onboardingconsignee' },
  ];
  mots: { [key: string]: string } = {
    Air: 'AIR',
    Sea: 'SEA',
    'Sea-Air': 'SEA_AIR',
    Truck: 'TRUCK',
    Rail: 'RAIL',
  };
  shipmentStatuses: { [key: string]: string } = {
    CARGO_PLANNED: 'Cargo Planned',
    CARGO_READY: 'Cargo Ready',
    SHIPMENT_PLACED: 'Shipment Placed',
    SHIPMENT_CONFIRMED: 'Shipment Confirmed',
    ESCALATION_CLARIFICATION: 'Clarification',
    CARGO_DISPATCHED: 'Cargo Dispatched',
    SHIPPED: 'Shipped',
    ARRIVED_AT_POD: 'Arrived at POD',
    SHIPPED_FROM_POD_TO_DESTINATION: 'Shipped from POD',
    ARRIVED_AT_DESTINATION: 'Arrived at Destination',
    CANCELLED: 'Cancelled',
  };
  procurementStatuses: { [key: string]: string } = {
    SUBMITTED: 'Submitted',
    REQUEST_CHANGES: 'Requested Changes',
    APPROVE_CHANGES: 'Approved Changes',
    REJECT_CHANGES: 'Rejected Changes',
    REJECTED: 'Rejected',
    CANCELLED: 'Cancelled',
    PO_CONFIRMED: 'Order Confirmed',
    CARGO_PLANNED: 'Cargo Planned',
    CARGO_READY: 'Cargo Ready',
    SHIPMENT_PLACED: 'Shipment Placed',
    SHIPMENT_CONFIRMED: 'Shipment Confirmed',
    ESCALATION_CLARIFICATION: 'Clarification',
    CARGO_DISPATCHED: 'Cargo Dispatched',
    SHIPPED: 'Shipped',
    ARRIVED_AT_POD: 'Arrived at POD',
    SHIPPED_FROM_POD_TO_DESTINATION: 'Shipped from POD',
    ARRIVED_AT_DESTINATION: 'Arrived at Destination',
  };
  incoterms: { [key: string]: string } = {
    EXW: 'EXW',
    FCA: 'FCA',
    FAS: 'FAS',
    FOB: 'FOB',
    CFR: 'CFR',
    CIF: 'CIF',
    CPT: 'CPT',
    CIP: 'CIP',
    DAP: 'DAP',
    DPU: 'DPU',
    DDP: 'DDP',
  };
  OnCarriages: { [key: string]: string } = {
    NA: 'Not Applicable',
    TRUCK: 'Truck',
    BARGE: 'Barge',
    BARGE_TRUCK: 'Barge - Truck',
    BARGE_RAIL_TRUCK: 'Barge - Rail - Truck',
    RAIL: 'Rail',
    RAIL_TRUCK: 'Rail - Truck',
  };
  shipmentTypesValMaps: ShipmentTypeValMap[] = [
    { name: 'FCL         ', value: 'FCL' },
    { name: 'LCL ', value: 'LCL' },
    { name: 'FTL         ', value: 'FTL' },
    { name: 'LTL         ', value: 'LTL' },
    { name: 'PARTIAL_TL  ', value: 'Partial Truck Load' },
    { name: 'AIR_FREIGHT ', value: 'Air Freight' },
    { name: 'RAIL_FREIGHT', value: 'Rail Freight' },
  ];
  operationControl = new FormControl('', Validators.required);
  operations: Operation[] = [{ name: 'Import' }, { name: 'Export' }];
  delimiters: Delimiter[] = [
    { name: ',' },
    { name: '.' },
    { name: '/' },
    { name: ';' },
    { name: '-' },
    { name: ':' },
    { name: '#' },
    { name: '+' },
    { name: '*' },
    { name: '=' },
    { name: '&' },
    { name: '@' },
    { name: '$' },
    { name: '!' },
    { name: '、' },
    { name: '\\s' },
  ];
  entityControl = new FormControl('', Validators.required);
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  headerCtrl = new FormControl();
  filteredheaders: Observable<string[]>;
  headers: any[] = [];
  allheaders: any[] = ['MOT', '20//', '40//', '40// HC', '20// HC'];
  @ViewChild('headerInput') headerInput!: ElementRef;
  //@ViewChild('headerInput') headerInput!: ElementRef<HTMLInputElement>;
  constructor(private fb: FormBuilder, private tasks: TaskService) {
    this.filteredheaders = this.headerCtrl.valueChanges.pipe(
      startWith(null),
      map((header: string | null) =>
        header ? this._filter(header) : this.allheaders.slice()
      )
    );
  }
  ngOnInit() {
    this.entity = this.tasks.entity();
    this.shipment = this.tasks.shipment();
    this.procurement = this.tasks.procurement();
    this.type = this.fb.group({
      _id: '',
      name: ['', Validators.required],
      entityType: ['', Validators.required],
    });
    this.mgUI = this.fb.group({
      groupId: ['', Validators.required],
      operation: ['', Validators.required],
      type: this.type,
      eachRowUniqueEntity: false,
      matchCargosByOrderNumber: false,
      columns: this.fb.array([]),
    });
    this.mgUI.get('groupId')?.valueChanges.subscribe((value) => {
      this.newID = value;
      return this.newID;
    });
    this.type.get('entityType')?.valueChanges.subscribe((value) => {
      this.newType = value;
      return this.newType;
    });
    this.type.get('name')?.valueChanges.subscribe((value) => {
      this.newName = this.newID[0] + '_' + this.newType + '_' + value;
    });
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our header
    if ((value || '').trim()) {
      this.headers.push(value.trim());
    }
    // Clear the input value
    if (input) {
      input.value = '';
    }
    this.headerCtrl.setValue(null);
  }
  remove(header: any, indx: number): void {
    this.headers.splice(indx, 1);
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.headers.push(event.option.value);
    this.headerInput.nativeElement.value = '';
    this.headerCtrl.setValue(null);
  }
  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.allheaders.filter((header) =>
      header.toLowerCase().includes(filterValue)
    );
  }
  entity: any = [];
  shipment: any = [];
  shipmentType: any = [];
  OnCarriageType: any = [];
  entityValue?: string;
  motType: any = [];
  incotermType: any = [];
  status: any = [];
  shipmentStatus: any = [];
  procurementStatus: any = [];
  procurementType: any = [];
  shipmentTypeValMap: any = [];
  map = new Map<String, String>();
  newKey: string = '';
  newValue: string = '';
  onSelect(entity: any) {
    let entity_id: any;
    if (entity === 'shipment') {
      entity_id = 1;
    } else if (entity === 'procurement') {
      entity_id = 2;
    }
    this.shipment = this.tasks
      .shipment()
      .filter((e) => e.entity_id == entity_id);
    this.procurement = this.tasks
      .procurement()
      .filter((e) => e.entity_id == entity_id);
    return (this.entityValue = entity);
  }
  onChange(shipment: any, procurement: any) {
    this.shipmentType = this.tasks
      .shipment()
      .filter((e) => e.fieldName == shipment);

    //.filter((e) => console.log(e));
    this.procurementType = this.tasks
      .procurement()
      .filter((e) => e.fieldName == procurement);

    // console.log(this.shipmentType[0]);
    // console.log(this.procurementType[0]);

    if ((shipment || procurement) === 'mot') {
      this.motType = this.mots;
    } else if ((shipment || procurement) === 'incoterm') {
      this.incotermType = this.incoterms;
    } else if (this.entityValue === 'shipment' && shipment === 'onCarriage') {
      this.OnCarriageType = this.OnCarriages;
    } else if (shipment === 'shipmentType') {
      this.shipmentTypeValMap = this.shipmentTypesValMaps;
    } else if (this.entityValue === 'procurement') {
      this.status = this.procurementStatuses;
    } else if (this.entityValue === 'shipment') {
      this.status = this.shipmentStatuses;
    }
    console.log(shipment);
  }

  columns(): FormArray {
    return this.mgUI.get('columns') as FormArray;
  }
  newColumn(): FormGroup {
    return this.fb.group({
      name: this.fb.array([this.fb.control('')]),
      fields: this.fb.array([]),
      importable: this.fb.array([]),
      condition: this.fb.array([]),
      type: ['', Validators.required],
      csvProperties: this.fb.group({
        csvIndex: '',
      }),
      primaryKey: false,
      primaryKeyOrder: [''],
      primaryKeyField: [''],
      defaultValue: [''],
      externalIdOrder: [''],
      prefix: [''],
      suffix: [''],
      exportCategory: this.fb.array([this.fb.control('')]),
      excludeFromIdentifier: this.fb.array([this.fb.control('')]),
      exportable: false,
      showOnlyDate: false,
      showOnlyTime: false,
      multiValueDelimiter: [''],
      deleteWhenNotMatching: [''],
      description: [''],
      enumType: '',
      valueMapping: '',
      valueMappings: this.fb.array([]),
    });
  }
  addNewColumn() {
    this.columns().push(this.newColumn());
  }
  removeColumn(colIndex: number) {
    this.columns().removeAt(colIndex);
  }
  newExcelHeaders(colIndex: number): FormArray {
    return this.columns().at(colIndex).get('name') as FormArray;
  }
  addNewHeader(colIndex: number) {
    this.newExcelHeaders(colIndex).push(this.fb.control(''));
  }
  removeHeader(colIndex: number, hrdIndex: number) {
    this.newExcelHeaders(colIndex).removeAt(hrdIndex);
  }
  fieldFunctions(colIndex: number): FormArray {
    return this.columns().at(colIndex).get('fields') as FormArray;
  }
  newFieldFunc(): FormGroup {
    return this.fb.group({
      fieldName: ['', Validators.required],
      fieldNames: [''],
      regexToApply: this.fb.array([]),
    });
  }
  addNewField(colIndex: number) {
    this.fieldFunctions(colIndex).push(this.newFieldFunc());
  }
  removeFields(colIndex: number, fieldIndex: number) {
    this.fieldFunctions(colIndex).removeAt(fieldIndex);
  }
  // refernceValueFilter(value: string) {
  //   console.log('this is the value' ,value);
  //   (selectionChange)="refernceValueFilter(ref.value)
  // }
  updateAdditionalReferenceInFormControl(
    column: AbstractControl,
    fieldIndex: number,
    value: any
  ) {
    const columnFormArray = !!column ? (column as FormArray) : null;
    if (
      !!columnFormArray &&
      !!(columnFormArray.get('fields') as FormArray).at(fieldIndex) &&
      !!(columnFormArray.get('fields') as FormArray)
        .at(fieldIndex)
        .get('fieldNames')
    ) {
      const columnFieldName = (columnFormArray.get('fields') as FormArray)
        .at(fieldIndex)
        .get('fieldNames')?.value;
      const addReference =
        'additionalReferences[referenceFieldName=' +
        columnFieldName +
        '].referenceFieldValue';

      (columnFormArray.get('fields') as FormArray)
        .at(fieldIndex)
        .get('fieldName')
        ?.patchValue(addReference);
    }
  }
  regexFunctions(colIndex: number, fieldIndex: number): FormArray {
    return (this.columns().at(colIndex).get('fields') as FormArray)
      .at(fieldIndex)
      .get('regexToApply') as FormArray;
  }
  newRegexFunc(): FormGroup {
    return this.fb.group({
      regexToSearch: '',
      replaceWith: '',
      useMatchedValue: false,
    });
  }
  addNewRegex(colIndex: number, fieldIndex: number) {
    const regexField = (this.columns().at(colIndex).get('fields') as FormArray)
      .at(fieldIndex)
      .get('regexToApply') as FormArray;
    regexField.push(this.newRegexFunc());
  }
  removeRegex(colIndex: number, fieldIndex: number, mapIndex: number) {
    const regexField = (this.columns().at(colIndex).get('fields') as FormArray)
      .at(fieldIndex)
      .get('regexToApply') as FormArray;
    regexField.removeAt(mapIndex);
  }
  /************************************importable******************************************/
  importableFunctions(colIndex: number): FormArray {
    return this.columns().at(colIndex).get('importable') as FormArray;
  }
  newImportableFunc(): FormGroup {
    return this.fb.group({
      applicableTo: [''],
      when: this.fb.array([]),
    });
  }
  addNewImportable(colIndex: number) {
    this.importableFunctions(colIndex).push(this.newImportableFunc());
  }
  removeImportable(colIndex: number, impIndex: number) {
    this.importableFunctions(colIndex).removeAt(impIndex);
  }
  importableCdnFunctions(colIndex: number, impIndex: number): FormArray {
    return (this.columns().at(colIndex).get('importable') as FormArray)
      .at(impIndex)
      .get('when') as FormArray;
  }
  newConditionFunc(): FormGroup {
    return this.fb.group({
      operation: '',
      value: '',
    });
  }
  addNewCdn(colIndex: number, impIndex: number) {
    const cdnField = (
      this.columns().at(colIndex).get('importable') as FormArray
    )
      .at(impIndex)
      .get('when') as FormArray;
    cdnField.push(this.newConditionFunc());
  }
  removeCdn(colIndex: number, impIndex: number, cdnIndex: number) {
    const cdnField = (
      this.columns().at(colIndex).get('importable') as FormArray
    )
      .at(impIndex)
      .get('when') as FormArray;
    cdnField.removeAt(cdnIndex);
  }
  /***************************************end*********************************************/
  /************************************Condition*****************************************/
  conditionFunctions(colIndex: number): FormArray {
    return this.columns().at(colIndex).get('condition') as FormArray;
  }
  newConditionsFunc(): FormGroup {
    return this.fb.group({
      when: this.fb.array([]),
      //then: [''],
      then: this.fb.group({
        columnName: [''],
        operation: [''],
        value: [''],
      }),
    });
  }
 
  addNewConditions(colIndex: number) {
    this.conditionFunctions(colIndex).push(this.newConditionsFunc());
  }
  removeConditions(colIndex: number, cdnsIndex: number) {
    this.conditionFunctions(colIndex).removeAt(cdnsIndex);
  }
  conditionsFunctions(colIndex: number, cdnsIndex: number): FormArray {
    return (this.columns().at(colIndex).get('condition') as FormArray)
      .at(cdnsIndex)
      .get('when') as FormArray;
  }
  newCdnWhenFunc(): FormGroup {
    return this.fb.group({
      operation: '',
      value: '',
      regexToApply: this.fb.array([]),
    });
  }
  addNewCdns(colIndex: number, cdnsIndex: number) {
    const cdnsField = (
      this.columns().at(colIndex).get('condition') as FormArray
    )
      .at(cdnsIndex)
      .get('when') as FormArray;
    cdnsField.push(this.newCdnWhenFunc());
  }
  removeCdns(colIndex: number, cdnsIndex: number, whenIndex: number) {
    const cdnsField = (
      this.columns().at(colIndex).get('condition') as FormArray
    )
      .at(cdnsIndex)
      .get('when') as FormArray;
    cdnsField.removeAt(whenIndex);
  }
  conditionsRegexFunctions(
    colIndex: number,
    cdnsIndex: number,
    whenIndex: number
  ): FormArray {
    return (
      (this.columns().at(colIndex).get('condition') as FormArray)
        .at(cdnsIndex)
        .get('when') as FormArray
    )
      .at(whenIndex)
      .get('regexToApply') as FormArray;
  }
  newCdnWhenRegexFunc(): FormGroup {
    return this.fb.group({
      regexToSearch: '',
      replaceWith: '',
      useMatchedValue: false,
    });
  }
  addNewCdnsRegex(colIndex: number, cdnsIndex: number, whenIndex: number) {
    const cdnsField = (
      (this.columns().at(colIndex).get('condition') as FormArray)
        .at(cdnsIndex)
        .get('when') as FormArray
    )
      .at(whenIndex)
      .get('regexToApply') as FormArray;
    cdnsField.push(this.newCdnWhenRegexFunc());
  }
  removeCdnsRegex(
    colIndex: number,
    cdnsIndex: number,
    whenIndex: number,
    rgxIndex: number
  ) {
    const cdnsField = (
      (this.columns().at(colIndex).get('condition') as FormArray)
        .at(cdnsIndex)
        .get('when') as FormArray
    )
      .at(whenIndex)
      .get('regexToApply') as FormArray;
    cdnsField.removeAt(rgxIndex);
  }

  /***************************************end*********************************************/
  exportCategory(colIndex: number): FormArray {
    return this.columns().at(colIndex).get('exportCategory') as FormArray;
  }
  addNewExport(colIndex: number) {
    this.exportCategory(colIndex).push(this.fb.control(''));
  }
  removeExport(colIndex: number, expIndex: number) {
    this.exportCategory(colIndex).removeAt(expIndex);
  }
  excludeFromIdentifiers(colIndex: number): FormArray {
    return this.columns()
      .at(colIndex)
      .get('excludeFromIdentifier') as FormArray;
  }
  addNewIdentifier(colIndex: number) {
    this.excludeFromIdentifiers(colIndex).push(this.fb.control(''));
  }
  removeIdentifier(colIndex: number, idnIndex: number) {
    this.excludeFromIdentifiers(colIndex).removeAt(idnIndex);
  }
  isValidField(
    column: AbstractControl,
    fieldIndex: number,
    fieldName: string
  ): boolean {
    const columnFormArray = !!column ? (column as FormArray) : null;
    //const columnFormArray = this.mgUI.get('columns');
    if (
      !!columnFormArray &&
      !!(columnFormArray.get('fields') as FormArray).at(fieldIndex) &&
      !!(columnFormArray.get('fields') as FormArray)
        .at(fieldIndex)
        .get('fieldName')
    ) {
      //const columnFieldName = this.shipment;
      const columnFieldName = (columnFormArray.get('fields') as FormArray)
        .at(fieldIndex)
        .get('fieldName')?.value;
      if (!!columnFieldName && columnFieldName === fieldName) {
        return true;
      }
    }
    return false;
  }
  valueMappings(colIndex: number): FormArray {
    return this.columns().at(colIndex).get('valueMappings') as FormArray;
  }
  onNewKey(newKey: string) {
    return (this.newKey = newKey);
  }
  onNewValue(newValue: string) {
    return (this.newValue = newValue);
  }
  mapKey = this.onNewKey(this.newKey);
  mapValue = this.onNewValue(this.newValue);
  mappedMot: any = {};
  newMapping(): FormGroup {
    return this.fb.group({
      limbiqId: [''],
      companyId: [''],
    });
  }
  addNewMapping(colIndex: number) {
    this.valueMappings(colIndex).push(this.newMapping());
  }
  removeMapping(colIndex: number, mapIndex: number) {
    this.valueMappings(colIndex).removeAt(mapIndex);
  }
  updateValueMappingKeyInFormControl(column: AbstractControl, value: any) {
    const columnFormGroup = !!column ? (column as FormGroup) : null;
    if (!!columnFormGroup && !!columnFormGroup.get('valueMapping')) {
      let columnFieldName = columnFormGroup.get('valueMapping')?.value;
      if (!columnFieldName) {
        columnFieldName = {};
      }
      columnFieldName[value] = '';
      columnFormGroup.get('valueMapping')?.patchValue(columnFieldName);
    }
  }
  updateValueMappingValueInFormControl(
    column: AbstractControl,
    value: any,
    colIndex: number,
    mapIndex: number
  ) {
    const columnFormGroup = !!column ? (column as FormGroup) : null;
    if (!!columnFormGroup && !!columnFormGroup.get('valueMapping')) {
      let columnFieldName = columnFormGroup.get('valueMapping')?.value;
      if (!columnFieldName) {
        columnFieldName = {};
      }
      columnFieldName[
        (this.valueMappings(colIndex).at(mapIndex) as FormGroup).get(
          'limbiqId'
        )?.value
      ] = value;
      columnFormGroup.get('valueMapping')?.patchValue(columnFieldName);
    }
  }
  onSubmit() {
    console.warn(this.mgUI.value);
  }
}
