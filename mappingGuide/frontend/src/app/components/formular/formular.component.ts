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

interface MOT {
  //name: string;
  //value: string;
}

interface Status {
  name: string;
  value: string;
}
interface Incoterm {
  name: string;
  value: string;
}
interface OnCarriage {
  name: string;
  value: string;
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
  @Input() columnFieldCategories!: any[];
  mgUI!: FormGroup;
  type!: FormGroup;
  fields?: FormGroup;
  valueMapping?: any;
  selectedId!: string;
  newID!: string;
  newType!: string;
  newName!: string;
  selectedEntity!: string;
  combinedId!: string;
  procurement!: any;
  columnName!: FormArray;
  selectFormControl = new FormControl('', Validators.required);
  groupIdControl = new FormControl('', Validators.required);
  groups: Group[] = [
    { name: 'Arne', id: 'limbiq-brand-jane-brand' },
    { name: 'Ashik', id: 'limbiq.com-ashikcorp' },
    { name: 'Nina', id: 'limbiq.com-onboardingconsignee' },
  ];
  // mots: MOT[] = [
  //   { value: 'AIR', name: 'Air' },
  //   { value: 'SEA', name: 'Sea' },
  //   { value: 'SEA_AIR', name: 'Sea-Air' },
  //   { value: 'TRUCK', name: 'Truck' },
  //   { value: 'RAIL', name: 'Rail' },
  // ];
  // mots: MOT[] = [
  //   {
  //     mots: {
  //       Air: 'AIR',
  //       Sea: 'SEA',
  //       'Sea-Air': 'SEA_AIR',
  //       Truck: 'TRUCK',
  //       Rail: 'RAIL',
  //     },
  //   },
  // ];
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
    { name: 'LCL         ', value: 'LCL' },
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
  separatorKeysCodes: number[] = [ENTER, COMMA];
  headerCtrl = new FormControl();
  filteredheaders: Observable<string[]>;
  headers: string[] = ['POD'];
  allheaders: string[] = ['MOT', '20//', '40//', '40// HC', '20// HC'];
  @ViewChild('headerInput') headerInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private tasks: TaskService) {
    this.filteredheaders = this.headerCtrl.valueChanges.pipe(
      startWith(null),
      map((header: string | null) =>
        header ? this._filter(header) : this.allheaders.slice()
      )
    );
  }
  // regexGroup(): FormGroup {
  //   return this.fb.group({
  //     regexToSearch: '',
  //     replaceWith: '',
  //     useMatchedValue: false,
  //   });
  // }
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
      this.newName = this.newID + '_' + this.newType + '_' + value;
      console.log(this.newName);
    });
    // this.type.get('_id')?.patchValue({
    //   _id: this.newName
    // })
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our header
    if (value) {
      this.headers.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.headerCtrl.setValue(null);
  }
  remove(header: string): void {
    const index = this.headers.indexOf(header);
    if (index >= 0) {
      this.headers.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.headers.push(event.option.viewValue);
    this.headerInput.nativeElement.value = '';
    this.headerCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
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
  columnFieldCategories$: Observable<columnFieldCategory[]> | undefined;
  // addNewMapping(): void {
  //   const addMapping = this.columns.get('valueMapping') as FormArray;
  //   addMapping.push(
  //     this.fb.group({
  //       limbiqId: [''],
  //       companyId: [''],
  //     })
  //   );
  // }
  // deleteNewMapping(index: number) {
  //   // const deleteColumn = this.mgUI.get('columns') as FormArray;
  //   const deleteColumn = this.columns.get('valueMapping') as FormArray;
  //   deleteColumn.removeAt(index);
  // }
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
    console.log(shipment);
    //console.log(this.shipmentType);
    this.shipmentType = this.tasks
      .shipment()
      .filter((e) => e.fieldName == shipment);
    this.procurementType = this.tasks
      .procurement()
      .filter((e) => e.fieldName == procurement);

    if ((shipment || procurement) === 'mot') {
      this.motType = this.mots;
      //this.status = this.mots;
    } else if ((shipment || procurement) === 'incoterm') {
      this.incotermType = this.incoterms;
      //this.status = this.incoterms;
    } else if (this.entityValue === 'shipment' && shipment === 'onCarriage') {
      this.OnCarriageType = this.OnCarriages;
      //this.status = this.OnCarriages;
    } else if (shipment === 'shipmentType') {
      this.shipmentTypeValMap = this.shipmentTypesValMaps;
      //this.status= this.shipmentTypesValMaps;
    } else if (this.entityValue === 'procurement') {
      this.status = this.procurementStatuses;
    } else if (this.entityValue === 'shipment') {
      this.status = this.shipmentStatuses;
    }
    //delete this.motType;

    console.log(this.entityValue);
  }
  columns(): FormArray {
    return this.mgUI.get('columns') as FormArray;
  }
  newColumn(): FormGroup {
    return this.fb.group({
      name: [''],
      fields: this.fb.group({
        fieldName: ['', Validators.required],
        //regexToApply: this.fb.group(this.regexGroup()),
        regexToApply: this.fb.array([]),
      }),
      type: ['', Validators.required],
      csvProperties: this.fb.group({
        csvIndex: '',
      }),
      primaryKeyOrder: [''],
      primaryKeyField: [''],
      multiValueDelimiter: [''],
      deleteWhenNotMatching: [''],
      description: [''],
      enumType: '',
      valueMapping: this.fb.array([]),
    });
  }
  addNewColumn() {
    this.columns().push(this.newColumn());
  }
  removeColumn(colIndex: number) {
    this.columns().removeAt(colIndex);
  }

  regexFunctions(colIndex: number): FormArray {
    return this.columns().at(colIndex).get('fields')?.get('regexToApply') as FormArray;
  }

  newRegexFunc(): FormGroup {
    return this.fb.group({
      regexToSearch: '',
      replaceWith: '',
      useMatchedValue: false,
    });
  }

  addNewRegex(colIndex: number) {
    this.regexFunctions(colIndex).push(this.newRegexFunc());
  }
  removeRegex(colIndex: number, mapIndex: number) {
    this.regexFunctions(colIndex).removeAt(mapIndex);
  }

  valueMappings(colIndex: number): FormArray {
    return this.columns().at(colIndex).get('valueMapping') as FormArray;
  }
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
  // get columnArray(): FormArray {
  //   return <FormArray>this.mgUI.get('columns');
  // }
  // addColumn(): void {
  //   this.columnArray.push(this.addColumnGroup());
  //   console.log(this.columnArray);
  // }
  // removeColumn(index: number): void {
  //   this.columnArray.removeAt(index);
  // }
  // addMapping(index: number): void {
  //   (<FormArray>(
  //     (<FormGroup>this.columnArray.controls[index]).controls['valueMapping']
  //   )).push(this.Mapping());
  // }
  // addRegex(regexIndex: number): void {
  //   const addRegexValue = <FormArray>(
  //     (<FormGroup>this.columnArray.controls[regexIndex]).controls[
  //       'regexToApply'
  //     ]
  //   );
  //   addRegexValue.push(this.regexGroup());
  // }
  // deleteRegex(regexIndex: number): void {
  //   const delRegexValue = <FormArray>(
  //     (<FormGroup>this.columnArray.controls[regexIndex]).controls[
  //       'regexToApply'
  //     ]
  //   );
  //   delRegexValue.removeAt(regexIndex);
  // }
  // get valueMapping(): FormArray {
  //   return <FormArray>this.mgUI.get('columns');
  //   //return this.mgUI.controls['columns'].get('valueMapping') as FormArray
  //   //return this.columns.get("valueMapping") as FormArray
  //   //return this.columns.controls["valueMapping"] as FormArray
  // }
  // addMapping() {
  //   // const valueMappingForm = this.fb.group({
  //   //   limbiqId: [''],
  //   //   companyId: [''],
  //   // });
  //   this.valueMapping.push(this.valueMappingForm);
  // }
  // deleteMapping(mappingIndex: number) {
  //   //const removeMapping = this.columns.get('valueMapping') as FormArray;
  //   //removeMapping.removeAt(mappingIndex);
  //   this.valueMapping.removeAt(mappingIndex);
  // }
  // get regexFunc() {
  //   return this.mgUI.controls['columns'] as FormArray;
  //   //return this.mgUI.controls["columns"] as FormArray
  // }
  // regexFuncs = this.mgUI.controls["columns"].get('fields') as FormArray
  // // addRegex() {
  // //   const regexToApply = this.fb.group({
  // //     regexToSearch: [''],
  // //     replaceWith: [''],
  // //   });
  // //   this.regexFunc.push(regexToApply);
  // // }
  // // deleteRegex(regexIndex: number) {
  // //   //const removeMapping = this.columns.get('valueMapping') as FormArray;
  // //   //removeMapping.removeAt(mappingIndex);
  // //   this.regexFunc.removeAt(regexIndex);
  // // }
  onSubmit() {
    console.warn(this.mgUI.value);
  }
}
