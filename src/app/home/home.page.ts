import { Component, OnInit } from '@angular/core';
import { Pessoa, TodoService } from '../servicos/todo.service';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  pessoas: Pessoa[];
 
  constructor(private todoService: TodoService) { }
 
  ngOnInit() {

    this.todoService.getTodos().subscribe(res => {
      this.pessoas = res;
    });
  }
 
  remove(item) {
    this.todoService.removeTodo(item.id);
  }
}