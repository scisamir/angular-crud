import { Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';

export const routes: Routes = [
    {
        path: '',
        component: TodoListComponent,
        title: 'Todo List'
    },
    {
        path: 'add-todo',
        component: AddTodoComponent,
        title: 'Add Todo'
    },
    {
        path: 'update-todo/:id',
        component: UpdateTodoComponent,
        title: 'Update Todo'
    }
];
