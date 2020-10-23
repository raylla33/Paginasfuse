
import { createReducer,on } from '@ngrx/store';
import { incrementar,decrementar, multiplicar,dividir, reset } from './contador.actions';



export const initialState = 20;

 
const _contadorReducer = createReducer(initialState,
  on(incrementar, state => state + 1),
  on(decrementar, state => state - 1),
  on(reset,       state => 20),
  on(multiplicar, (state, {numero}  ) => state * 3 ),
  on(dividir, (state, {numero}  ) => state / 2 ),
  
);

 
export function contadorReducer(state, action) {
    return _contadorReducer(state, action);
  }




