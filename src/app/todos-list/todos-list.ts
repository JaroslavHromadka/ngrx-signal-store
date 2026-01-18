import { Component, effect, inject, viewChild } from '@angular/core';
import { TodosFilter, TodosStore } from '../store/todos.store';
import { Todo } from '../model/todo.model';
import { MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'todos-list',
  standalone: false,
  templateUrl: './todos-list.html',
  styleUrl: './todos-list.scss',
})
export class TodosList {
  store = inject(TodosStore);

  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter;
    });
  }

  async onAddTodo(title: string) {
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id: string, event: PointerEvent) {
    event.stopPropagation();

    await this.store.deleteTodo(id);
  }

  async onTodoToggled(id: string, completed: boolean) {
    //await this.store.updateTodo(id, completed);
  }

  async onSelectionChange(event: MatSelectionListChange) {
    const option = event.options[0];
    const todo = option.value as Todo;

    this.store.updateTodo(todo.id, option.selected);
  }

  onFilterTodos(event: MatButtonToggleChange) {
    const filter = event.value as TodosFilter;
    this.store.updateFilter(filter);
  }
}
