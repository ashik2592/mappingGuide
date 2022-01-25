
import { Component, OnInit, EventEmitter } from '@angular/core'; //Output
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
//import { shipmentTypes } from "src/app/shipmentTypes"
//import { procurementTypes } from "src/app/procurementTypes"

interface Group {
  name: string;
  id: string;
}
interface Operation {
  name: string;
}

interface Entity {
  name: string;
}

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css'],
})
export class FormularComponent implements OnInit {
  mgUI!: FormGroup;
  type!: FormGroup;
  selectedId!: string;
  newID!: string;
  newType!: string;
  newName!: string;
  selectedEntity!: string;
  combinedId!: string;
  columns!: any;

  selectFormControl = new FormControl('', Validators.required);
  groupIdControl = new FormControl('', Validators.required);
  groups: Group[] = [
    { name: 'Arne', id: 'limbiq-brand-jane-brand' },
    { name: 'Ashik', id: 'limbiq.com-ashikcorp' },
    { name: 'Nina', id: 'limbiq.com-onboardingconsignee' },
  ];
  operationControl = new FormControl('', Validators.required);
  operations: Operation[] = [{ name: 'Import' }, { name: 'Export' }];
  entityControl = new FormControl('', Validators.required);
  entities: Entity[] = [{ name: 'shipment' }, { name: 'procurement' }];
  //name = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.type = this.fb.group({
      _id: '',
      name: ['', Validators.required],
      entityType: ['', Validators.required],
    });
    this.columns = this.fb.array([

    ])
    // this.columns = this.fb.group({

    // })
    this.mgUI = this.fb.group({
      groupId: ['', Validators.required],
      operation: ['', Validators.required],
      type: this.type,
      eachRowUniqueEntity: false,
      matchCargosByOrderNumber: false,
      columns: this.columns
    });
    this.mgUI.get('groupId')?.valueChanges.subscribe((value) => {
      this.newID = value;
      return this.newID;
      //console.log(this.newID);
    });
    this.type.get('entityType')?.valueChanges.subscribe((value) => {
      this.newType = value;
      return this.newType;
      //console.log(this.newType);
    });

    this.type.get('name')?.valueChanges.subscribe((value) => {
      this.newName = this.newID + '_' + this.newType + '_' + value;
      //return this.newName
      console.log(this.newName);
    });

    const combinedId: any = this.type.get('_id') as FormControl;
    this.combinedId = this.newName;
    // console.log(combinedId);
  }

  addNewColumn() {
    const addColumn = this.mgUI.get('columns') as FormArray;
    addColumn.push(this.fb.group({
      excelHeader: ['', Validators.required],
      fields: { fieldName: ["ashik"] },
      type: [],
      primaryKeyOrder: [],
      primaryKeyField: [],
      description: [],
      multiValueDelimiter: [],
      deleteWhenNotMatching: [],
      enumType: [],
      valueMapping: {}
    }))
  }

  deleteNewColumn(index: number) {
    const deleteColumn = this.mgUI.get('columns') as FormArray;
    deleteColumn.removeAt(index)
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.mgUI.value);
  }

}
