import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Pessoa {
  // id?: string;
  id?: string;
  nome: string;
  idade: number;
  sexo: string;
}

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private todosCollection: AngularFirestoreCollection<Pessoa>;
 
  private todos: Observable<Pessoa[]>;
 
  constructor(db: AngularFirestore) {

    this.todosCollection = db.collection<Pessoa>('todos');
    
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getTodos() {
    return this.todos;
  }
 
  getTodo(id) {
    return this.todosCollection.doc<Pessoa>(id).valueChanges();
  }
 
  updateTodo(todo: Pessoa, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }
 
  addTodo(todo: Pessoa) {
    return this.todosCollection.add(todo);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }
}
