import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './components/todo/todo.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { LineThroughDirective } from './directives/line-through.directive';
import { UppercaseCustomPipe } from './pipes/uppercase.pipe';

@NgModule({
  declarations: [TodoComponent, TodoInputComponent, LineThroughDirective, UppercaseCustomPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [TodoComponent, TodoInputComponent],
})
export class SharedModule {}
