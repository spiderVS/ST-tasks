import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../shared/models/todo';
import { TodoService } from '../../../core/services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public tasks: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(targetTask: Todo): void {
    this.todoService.deleteTask(targetTask).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== targetTask.id);
    });
  }

  saveTask(targetTask: Todo): void {
    this.todoService.changeTask(targetTask).subscribe((edited) => {
      const taskIdx = this.tasks.findIndex((task) => task.id === edited.id);
      this.tasks[taskIdx] = edited;
    });
  }

  addTask(targetTask: Todo): void {
    this.todoService.addTask(targetTask).subscribe((added) => {
      this.tasks[this.tasks.length] = added;
    });
  }
}
