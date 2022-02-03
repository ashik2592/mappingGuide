import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription, Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { TaskService} from 'src/app/services/task.service';

interface headers {
  name: string;
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  //auto-complete
  name!: string;
  fieldName!: string;
  reminder: boolean = false;
  showAddTask!: boolean;
  subscription!: Subscription;
  //shipment!: string;
  //shipmentTypes!: string[];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  headerCrtl = new FormControl();
  filteredHeaders!: Observable<string[]>;
  headers: string[] = ['MOT'];
  headerSuggestions: string[] = [
    "20//'",
    "20//' GP",
    "40//'",
    "40//' GP",
    "40//'HC",
    "40//' HQ",
    'POD',
  ];
  addOnBlur!: string;

  @ViewChild('headerInput') headerInput!: ElementRef<HTMLInputElement>;
  //shipment!: shipmentTypes[];

  constructor(private uiService: UiService, taskService: TaskService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));

    this.filteredHeaders = this.headerCrtl.valueChanges.pipe(
      startWith(null),
      map((header: string | null) =>
        header ? this._filter(header) : this.headerSuggestions.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our header
    if (value) {
      this.headers.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.headerCrtl.setValue(null);
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
    this.headerCrtl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.headerSuggestions.filter((header) =>
      header.toLowerCase().includes(filterValue)
    );
  }
  // onSubmit() {
  //   if (!this.name) {
  //     alert('Please add a Excel Header');
  //     return;
  //   }
  //   const newTask = {
  //     name: this.name,
  //     fieldName: this.fieldName,
  //     reminder: this.reminder,
  //   };

  //   this.onAddTask.emit(newTask);

  //   this.name = '';
  //   this.fieldName = '';
  //   this.reminder = false;
  // }
}
