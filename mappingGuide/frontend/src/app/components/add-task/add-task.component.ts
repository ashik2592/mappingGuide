import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  
  name!: string;
  fieldName!: string;
  reminder: boolean = false;
  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}
  onSubmit() {
    if (!this.name) {
      alert('Please add a Excel Header');
      return;
    }
    const newTask = {
      name: this.name,
      fieldName: this.fieldName,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);

    this.name = '';
    this.fieldName = '';
    this.reminder = false;
  }
}
