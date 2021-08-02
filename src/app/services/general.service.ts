import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CuentaDetalleModel } from '../modelos/cuenta.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private btn = new BehaviorSubject<boolean>(true);
  public activo$ = this.btn.asObservable();
  private Detalle_cuenta = new BehaviorSubject<Array<CuentaDetalleModel>>([]);
  public currentDataDetalle_cuenta$ = this.Detalle_cuenta.asObservable();

  constructor() { }

  public changeCart(detalle_cuenta: CuentaDetalleModel) {   
    //Inicializamos total
    if(!detalle_cuenta.cantidad){
      detalle_cuenta.cantidad = 1;
    }
    //Obtenemos el valor actual
    let  listCart = this.Detalle_cuenta.getValue();
    //Si no es el primer item del carrito
    
    if(listCart)
    {
      //Buscamos si ya cargamos ese item en el carrito
      let objIndex = listCart.findIndex((obj => obj.producto_id == detalle_cuenta.producto_id));
      //Si ya cargamos uno aumentamos su cantidad
      if(objIndex != -1)
      {
     //   listCart[objIndex].cantidad += 1;
      }
      //Si es el primer item de ese tipo lo agregamos derecho al carrito
      else {
        listCart.push(detalle_cuenta);
      }
      
      
      
    }
    //Si es el primer elemento lo inicializamos
    else {
      listCart = [];
      listCart.push(detalle_cuenta);
    }

    this.Detalle_cuenta.next(listCart);
  }

  public removeElementCart(detalle_cuenta:CuentaDetalleModel){
    //Obtenemos el valor actual de carrito
    let listCart = this.Detalle_cuenta.getValue();
    //Buscamos el item del carrito para eliminar
    let objIndex = listCart.findIndex((obj => obj.producto_id == detalle_cuenta.producto_id));
    if(objIndex != -1)
    {
      //Seteamos la cantidad en 1 (ya que los array se modifican los valores por referencia, si vovlemos a agregarlo la cantidad no se reiniciará)
      listCart[objIndex].cantidad = 1;
      //Eliminamos el item del array del carrito
      listCart.splice(objIndex,1);
    }

    this.Detalle_cuenta.next(listCart);

  }


}
