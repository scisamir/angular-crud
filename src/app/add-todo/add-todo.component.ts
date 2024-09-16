import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TodoService } from "../todo.service";
import { Todo } from "../todo/todo";
import { Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-add-todo',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule
    ],
    templateUrl: './add-todo.component.html'
})
export class AddTodoComponent {
    addTodoForm = new FormGroup({
        title: new FormControl('', Validators.required),
        body: new FormControl('', Validators.required),
    });

    todoList: Todo[] = [];
    highestId: number = 0;
    newTodo: Todo = {
        id: '',
        title: '',
        body: ''
    };

    constructor(
        private todoService: TodoService,
        private router: Router
    ) {
        this.todoService.getAllTodos().subscribe((todos) => {
            this.todoList = todos;
            for (let i = 0; i < this.todoList.length; i++) {
                const id = Number(Object.values(this.todoList[i])[0]);
                if (id > this.highestId) {
                    this.highestId = id;
                }
            }
        });
    }

    addTodo() {
        this.newTodo = {
            id: String(this.highestId + 1),
            title: this.addTodoForm.value.title!,
            body: this.addTodoForm.value.body!
        };

        this.todoService.addTodo(this.newTodo).subscribe(() => {
            this.router.navigate(['/']);
        });
    }

    goHome() {
        this.router.navigate(['/']);
    }
}
