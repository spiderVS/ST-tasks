import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  editMode: boolean = false;

  editedTask = {} as Todo;

  @Input() todo: Todo;

  @Output() saveTask = new EventEmitter<Todo>();

  @Output() deleteTask = new EventEmitter<Todo>();

  constructor() {}

  onChangeStatus(checked: boolean) {
    this.editedTask = { ...this.todo };
    this.editedTask.completed = checked;
    this.onSaveItem();
    this.editedTask = {} as Todo;
  }

  onEdit() {
    this.editMode = true;
    this.editedTask = { ...this.todo };
  }

  onSaveItem(): void {
    if (
      !this.editedTask.title ||
      !this.editedTask.title.trim() ||
      (this.editedTask.title === this.todo.title &&
        this.editedTask.completed === this.todo.completed)
    ) {
      this.editMode = false;
      return;
    }
    this.saveTask.emit(this.editedTask);
    this.editMode = false;
  }

  onDeleteItem(): void {
    this.deleteTask.emit(this.todo);
  }
}
