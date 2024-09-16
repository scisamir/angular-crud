import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Todo } from "../todo/todo";
import { TodoComponent } from "../todo/todo.component";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TodoService } from "../todo.service";

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [
      TodoComponent,
      MatButtonModule,
      FormsModule,
      MatInputModule,
      MatFormFieldModule,
      RouterLink,
    ],
    template: `
        <h1 class="font-bold sm:text-5xl text-3xl my-8 text-center text-gray-800">Task List</h1>
        <div class="w-full flex flex-row justify-between p-10 flex-wrap">
          <form>
            <mat-form-field class="w-72">
              <mat-label>Search</mat-label>
              <input matInput placeholder="Ex. My todo..." #filter (input)="filterTodos(filter.value)"/>
            </mat-form-field>
          </form>
          <a routerLink="/add-todo" mat-stroked-button class="text-xl w-60 ml-4">Add Task</a>
        </div>
        <div class="flex flex-row justify-between flex-wrap gap-8 p-10">
          @for (todo of filteredTodoList; track todo.id) {
            <app-todo [todo]="todo" (deleteTodoEvent)="deleteTodo($event)" />
          }
        </div>
    `
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = [];

  filteredTodoList: Todo[] = [];

  filterTodos(text: string) {
    if (!text) {
      this.filteredTodoList = this.todoList;
      return;
    }

    this.filteredTodoList = this.todoList.filter(todo =>
      todo.title.includes(text) || todo.body.includes(text)
    );
  }

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getAllTodos().subscribe(todos => {
      this.todoList = todos.reverse();
      console.log(this.todoList);
      this.filteredTodoList = this.todoList;
    });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(String(id)).subscribe(() => {
      this.getTodos();
    });
  }
}