import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/app.reduces';
import * as actions from '../contador.actions';

@Component({
  selector: 'app-neto',
  templateUrl: './neto.component.html',
  styleUrls: ['./neto.component.scss']
})
export class NetoComponent implements OnInit {

  contador:number;

  constructor( private store: Store<appState>) { }

  ngOnInit(): void {
    this.store.select ('contador')
    .subscribe(contador => this.contador);
  }
reset(){
 
  this.store.dispatch( actions.reset() );

}
}
