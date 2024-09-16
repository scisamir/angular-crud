import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ActivatedRoute, Router } from "@angular/router";
import { Todo } from "../todo/todo";
import { TodoService } from "../todo.service";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-update-todo',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule
    ],
    templateUrl: './update-todo.component.html'
})
export class UpdateTodoComponent {
    updateTodoForm = new FormGroup({
        title: new FormControl('', Validators.required),
        body: new FormControl('', Validators.required),
    });

    todoList: Todo[] = [];
    todo: Todo = {
        id: "0",
        title: 'test',
        body: ''
    };

    route: ActivatedRoute = inject(ActivatedRoute);
    todoId = -1;

    constructor(
        private todoService: TodoService,
        private router: Router
    ) {
        this.todoId = this.route.snapshot.params['id'];
        console.log(`todoId: ${this.todoId}`);
        this.todoService.getTodoById(String(this.todoId)).subscribe(todo => {
            this.todo = todo;
            console.log('Todo:');
            console.log(this.todo);
            this.updateTodoForm.patchValue({
                title: this.todo?.title,
                body: this.todo?.body
            });
        });
    }

    updateTodo() {
        this.todo.title = this.updateTodoForm.value.title!;
        this.todo.body = this.updateTodoForm.value.body!;
        this.todoService.updateTodo(this.todo).subscribe(() => {
          this.router.navigate(['/']);
        });
    }

    goHome() {
        this.router.navigate(['/']);
    }
}
