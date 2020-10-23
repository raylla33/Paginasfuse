import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-neto',
  templateUrl: './neto.component.html',
  styleUrls: ['./neto.component.scss']
})
export class NetoComponent implements OnInit {

  @Input() contador:number;
  @Output() alterarContador = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
reset(){
  this.contador = 0;
  this.alterarContador.emit(0);
}
}
