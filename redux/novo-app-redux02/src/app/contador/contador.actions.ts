import { createAction, props } from '@ngrx/store';

export const incrementar = createAction('[Contador] Incrementar');
export const decrementar = createAction('[Contador] Decrementar');
export const reset = createAction('[Contador] Reset');

export const multiplicar = createAction(
 '[Contador] Multiplicar',
props<{numero: Number}>()
);

export const dividir = createAction(
    '[Contador] Dividir',
   props<{numero: Number}>()
   );