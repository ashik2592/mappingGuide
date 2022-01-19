import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, FormControl, Validators} from '@angular/forms';

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-select-hint-error-example',
  templateUrl: './select-hint-error-example.component.html',
  styleUrls: ['./select-hint-error-example.component.css']
})
export class SelectHintErrorExampleComponent {

  animalControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];
}
