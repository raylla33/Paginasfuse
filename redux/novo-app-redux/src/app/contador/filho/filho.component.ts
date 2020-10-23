import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from '../../app.reduces';
import * as actions from '../contador.actions';~

@Component({
  selector: 'app-filho',
  templateUrl: './filho.component.html',
  styleUrls: ['./filho.component.scss']
})
export class FilhoComponent implements OnInit {
contador: number; 


  constructor(private store: Store<appState>) { }

  ngOnInit(): void {
    this.store.select('contador')
    .subscribe(contador => this.contador = contador); 
  }
 multiplicar(){
   //this.contador *= 2;
   //this.alterarContador.emit(this.contador);
 this.store.dispatch(actions.multiplicar)
  }

 dividir(){
   //this.contador /=2;
   //this.alterarContador.emit(this.contador);
 }

}
