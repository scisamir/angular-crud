import { Component, Input } from "@angular/core";
import { Todo } from "./todo";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-todo',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './todo.component.html'
})
export class TodoComponent {
    @Input() todo!: Todo;
}
