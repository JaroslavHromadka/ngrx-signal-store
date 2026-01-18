import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosStore } from './store/todos.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  store = inject(TodosStore);

  ngOnInit(): void {
    this.loadTodos();
  }

  async loadTodos() {
    await this.store.loadAll();
  }
}
