import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SharedModule } from '../shared/shared.module';
import { TodoService } from '../core/services/todos.service';

@NgModule({
  declarations: [TodoListComponent],
  imports: [CommonModule, SharedModule],
  providers: [TodoService],
  exports: [TodoListComponent],
})
export class TodosModule {}
