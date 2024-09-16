import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo } from "./todo";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-todo',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
    templateUrl: './todo.component.html'
})
export class TodoComponent {
    @Input() todo!: Todo;
    @Output() deleteTodoEvent = new EventEmitter<string>();

    deleteTodo() {
        this.deleteTodoEvent.emit(this.todo.id);
    }
}
