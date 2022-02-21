import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent {
  taskName = new FormControl();

  @Output() addTask = new EventEmitter<Todo>();

  onAddTask(): void {
    if (!this.taskName.value || !this.taskName.value.trim()) {
      return;
    }
    const newTask = {
      title: this.taskName.value,
      completed: false,
    } as Todo;
    this.addTask.emit(newTask);
    this.taskName.setValue('');
  }
}
