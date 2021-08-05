import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CuentaModel } from '../modelos/cuenta.model';
import { CuentaDetalleModel } from '../modelos/cuenta.model';
import { MovimientosModel } from '../modelos/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class PosService {
  private api = 'http://localhost:3000/api';
  //private api = 'https://pos-system-angular.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  
  //Turnos-->
  abrirTurno(fecha:String,apertura:String,turno:Number){
    return this.http.post(`${this.api}/turno/abrir`,{fecha:fecha,apertura:apertura,turno_id:turno});
   }
 
   cerrarTurno(fecha:String,retiro:String,turno:Number){
     return this.http.post(`${this.api}/turno/cerrar`,{fecha:fecha,retiro:retiro,turno_id:turno});
    }
 
 
    obtenerUltimoTurno(){
     return this.http.get(`${this.api}/turno/ultimo`);
    }
 
    obtenerUltimoTurnoPromesa(){
     return this.http.get(`${this.api}/turno/ultimo`).toPromise();
    }
 
    //Comedor
    obtenerCuentasId(id:number){
      return this.http.get(`${this.api}/comedor/cuenta/id/${id}`);
     }

    obtenerCuentasNoPagadas(turno:Number,seccion:string){
     return this.http.get(`${this.api}/comedor/turno/${turno}/seccion/${seccion}`);
    }
 
    obtenerDetalleCuenta(cuenta:Number){
     return this.http.get(`${this.api}/comedor/cuenta/${cuenta}`);
    }

    obtenerDetalleCuentaPlatillo(producto:Number){
      return this.http.get(`${this.api}/comedor/producto/${producto}`);
     }
 
    agregarCuenta(cuenta: CuentaModel){
     return this.http.post(`${this.api}/comedor`,cuenta);
    }
 
    agregarDetalleCuenta(detallesCuenta: CuentaDetalleModel[]){
     return this.http.post(`${this.api}/comedor/cuenta`,detallesCuenta);
    }
 
    actualizarDetalleCuenta(id:Number,cantidad:Number,descuento:String){
     return this.http.put(`${this.api}/comedor/cuenta`,{id:id,cantidad:cantidad,descuento:descuento});
    }

    actualizarCuentaTotal(id:Number,total:Number){
      return this.http.put(`${this.api}/comedor/cuenta/total`,{id:id,total:total});
     }
 
    borrarDetalleCuenta(cuenta:number[]){
     return this.http.post(`${this.api}/comedor/cuenta/borrar`,cuenta);
    }
 
    borrarDetalleCuentaPromise(cuenta:number[]){
     return this.http.post(`${this.api}/comedor/cuenta/borrar`,cuenta).toPromise();
    }
 
    //Plataforma
    
    obtenerClienteId(id:number){
      return this.http.get(`${this.api}/plataforma/cliente/${id}`);
    }
 
    //Rapido
    obtenerPlatillos(){
     return this.http.get(`${this.api}/rapido/platillo`);
    }
 
    obtenerPlatillosCategoria(categoria:Number){
     return this.http.get(`${this.api}/comedor/platillo/categoria/${categoria}`);
    }
 
    //Deposito Retiro
    agregarDeposito(movimiento: MovimientosModel){
    // return this.http.post(`${this.api}/caja/deposito`,{movimiento,turno_id:turno_id});
      return this.http.post(`${this.api}/caja/deposito`,movimiento); 
    }
 /*
    agregarRetiro(movimiento: MovimientosModel){ //-->Redundante 
     return this.http.post(`${this.api}/caja/retiro`,movimiento);
    }
 */
    //Consultar cuentas
    obtenerCuentas(){
     return this.http.get(`${this.api}/consultar`);
    }
 
    obtenerCuentasTurno(turno:Number){
     return this.http.get(`${this.api}/consultar/turno/${turno}`);
    }
 
    obtenerCuentasFecha(fecha:Date){
     return this.http.get(`${this.api}/consultar/fecha/${fecha}`);
    }
 
    ActualzarEstadoCuenta(id:Number,estado:Number){
      return this.http.put(`${this.api}/comedor/pagar`,{id:id,estado_id:estado});
    }
 
    //Monitor
    obtenerVentasTurno(turno:Number){
     return this.http.get(`${this.api}/consultar/venta/turno/${turno}`);
    }
 
    obtenerVentasSeccion(turno:Number,seccion:String){
     return this.http.get(`${this.api}/consultar/venta/seccion/${seccion}/turno/${turno}`);
    }
 
    obtenerVentasCategoria(turno:Number,categoria:Number){
     return this.http.get(`${this.api}consultar/venta/turno/${turno}/categoria/${categoria}`);
    }
 
    //Caja
    obtenerVentasTurnoCaja(turno:Number){
     return this.http.get(`${this.api}/caja/turno/${turno}`);
    }
 
    //Caja
    obtenerVentasTurnoCajaPromesa(turno:Number){
     return this.http.get(`${this.api}/caja/turno/${turno}`).toPromise()
    }
 //Detalles cerrar el modal por medio de ts en detalle modal y plataforma modal
}
