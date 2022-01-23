import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.type = this.fb.group({
      _id: this.combinedId,
      name: ['', Validators.required],
      entityType: ['', Validators.required],
    });
    this.mgUI = this.fb.group({
      groupId: ['', Validators.required],
      operation: ['', Validators.required],
      type: this.type,
      eachRowUniqueEntity: false,
      matchCargosByOrderNumber: false,
      columns: this.fb.array([
        //nameID: ['', Validators.required],
      ]),
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

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.mgUI.value);
  }
}
