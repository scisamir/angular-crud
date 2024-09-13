import { Component } from "@angular/core";
import { Todo } from "../todo/todo";
import { TodoComponent } from "../todo/todo.component";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [
      TodoComponent,
      MatButtonModule,
      FormsModule,
      MatInputModule,
      MatFormFieldModule
    ],
    template: `
        <h1 class="font-bold text-6xl my-8 text-center text-gray-800">Task List</h1>
        <div class="w-full flex flex-row justify-between p-10">
          <form>
            <mat-form-field>
              <mat-label>Search</mat-label>
              <input matInput placeholder="Ex. My todo..." #filter (input)="filterTodos(filter.value)"/>
            </mat-form-field>
          </form>
          <button mat-stroked-button class="text-xl w-30">Add Task</button>
        </div>
        <div class="flex flex-row justify-between flex-wrap gap-8 p-10">
          @for (todo of filteredTodoList; track todo.id) {
            <app-todo [todo]="todo" />
          }
        </div>
    `
})
export class TodoListComponent {
    todoList: Todo[] = [
        {
          "id": 1,
          "title": "Complete project documentation",
          "body": "Finalize the project documentation and send it to the team."
        },
        {
          "id": 2,
          "title": "Fix login bug",
          "body": "Investigate and resolve the issue where users are unable to log in with certain browsers."
        },
        {
          "id": 3,
          "title": "Update unit tests",
          "body": "Add more unit tests for the authentication module."
        },
        {
          "id": 4,
          "title": "Code review for feature X",
          "body": "Review the code for the new feature X implemented by the team."
        },
        {
          "id": 5,
          "title": "Team meeting",
          "body": "Prepare for the upcoming team meeting and discuss the project timeline."
        },
        {
          "id": 6,
          "title": "Optimize database queries",
          "body": "Identify and optimize slow queries in the database for faster performance."
        },
        {
          "id": 7,
          "title": "Design API endpoints",
          "body": "Design new API endpoints for the payment processing system."
        },
        {
          "id": 8,
          "title": "Refactor legacy code",
          "body": "Refactor the old payment processing code to align with modern standards."
        },
        {
          "id": 9,
          "title": "Write documentation for API usage",
          "body": "Create comprehensive documentation for using the new API endpoints."
        },
        {
          "id": 10,
          "title": "Fix UI alignment issue",
          "body": "Fix the UI alignment issue on the dashboard page for better user experience."
        }
      ];

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

      constructor() {
        this.filteredTodoList = this.todoList;
      }
}