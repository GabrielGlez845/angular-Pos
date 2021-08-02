import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ArticuloModel } from '../modelos/articulo.model';
import { InsumoModel } from '../modelos/insumo.model';
import { PlatilloModel } from '../modelos/platillo.model';
import { PlatilloDetalleModel } from '../modelos/platillo.model';
@Injectable({
  providedIn: 'root'
})
export class InventariosService {

  private api = 'http://localhost:3000/api';
 // private api = 'https://pos-system-angular.herokuapp.com/api';
  constructor(private http:HttpClient) { }

  //Articulo
  obtenerArticulo(){
    return this.http.get(`${this.api}/articulo`);
   }

   agregarArticulo(articulo: ArticuloModel){ 
    return this.http.post(`${this.api}/articulo`,articulo);
   }

   ActualzarArticulo(articulo: ArticuloModel,id_articulo:Number){
     return this.http.put(`${this.api}/articulo`,{id:id_articulo,articulo});
   }
   
   borrarArticulo(id_articulo:Number){
    return this.http.delete(`${this.api}/articulo/${id_articulo}`);
   }

   //Insumo
  obtenerInsumo(){
    return this.http.get(`${this.api}/insumo`);
   }

   agregarInsumo(insumo: InsumoModel){ 
    return this.http.post(`${this.api}/insumo`,insumo);
   }

   ActualzarInsumo(id_insumo:Number,insumo:InsumoModel){
     return this.http.put(`${this.api}/insumo`,{id:id_insumo,insumo});
   }
   
   borrarInsumo(id_insumo:Number){
    return this.http.delete(`${this.api}/insumo/${id_insumo}`);
   }

   //Platillo
  obtenerPlatillo(){
    return this.http.get(`${this.api}/platillo`);
   }

   agregarPlatillo(platillo: PlatilloModel){  
    return this.http.post(`${this.api}/platillo`,platillo);
   }

   ActualzarPlatillo(id_platillo:Number,platillo:PlatilloModel){
     return this.http.put(`${this.api}/comedor/pagar`,{id:id_platillo,platillo});
   }
   
   borrarPlatillo(id_platillo:Number){
    return this.http.delete(`${this.api}/comedor/cuenta/${id_platillo}`);
   }

   //Detalle Platillo
  obtenerDetallePlatillo(){
    return this.http.get(`${this.api}/platillo/detalle`);
   }

   agregarDetallePlatillo(detalle_platillo: PlatilloDetalleModel){ 
    return this.http.post(`${this.api}/platillo/detalle`,detalle_platillo);
   }

   ActualzarDetallePlatillo(id_detalle_platillo:Number,detalle_platillo: PlatilloDetalleModel){
     return this.http.put(`${this.api}/platillo/detalle`,{id:id_detalle_platillo,detalle_platillo});
   }
   
   borrarDetallePlatillo(id_detalle_platillo:Number){
    return this.http.delete(`${this.api}/platillo/detalle/${id_detalle_platillo}`);
   }
}


