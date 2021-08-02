import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PosService } from '../../services/pos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cuenta_id:number;
  detalleCuenta:any[];
  producto:any[];
  sinValores:boolean;
  checkSeleccionado: boolean = true;
  detalleBorarr: any[] =[];
  constructor(private router:Router,
              private route:ActivatedRoute,
              private servicioPos:PosService) {
    this.route.params.subscribe(data => {
      this.cuenta_id = data['id'];
     });
   }

  ngOnInit(): void {
    this.verCuenta(this.cuenta_id);
  }

  Capturar(){
    this.router.navigate(['/captura',this.cuenta_id]);
  }

  verCuenta(cuenta:number){
    let cuenta_id = cuenta;
    this.servicioPos.obtenerDetalleCuenta(cuenta_id).subscribe((resp:any) =>{
      console.log(resp)
      this.detalleCuenta = resp;
      this.cuenta_id = cuenta_id;
      console.log(resp.producto_id);
      //this.servicioPos.obtenerDetalleCuentaPlatillo()
      //no tiene detalle cuenta
      if (resp[0] === undefined){
         // console.log("no existen productos asignados a esta cuenta")        
          this.sinValores = true;
      }else{
        this.sinValores = false;
      }
    })    //Sigue capturar segun una cuenta y una vez qu capture que se puede agregar platillos y se resten en los platillos
    
  }

  detallesEliminar(id : number){
    if(this.checkSeleccionado){
      this.detalleBorarr.push(id);
    }else{
      console.log("no seleccionado")
    }
    //Eliminar repetidos
    this.detalleBorarr = this.detalleBorarr.filter((item,index)=>{
      return this.detalleBorarr.indexOf(item) === index;
    }) 
  }

  cancelarProductos(){
    // console.log(this.EminarFormGroup.value);
    console.log(this.detalleBorarr)
     this.servicioPos.borrarDetalleCuentaPromise(this.detalleBorarr)
     .then((resp=>{
       this.verCuenta(this.cuenta_id)
     })).catch((resp =>{
       this.verCuenta(this.cuenta_id)
     })
       
     ); 
   Swal.fire({
     icon: 'success',
     title: '',
     text: 'Productos eliminados'
   });
 
   //enviar el array para que sea eliminado
   }

   Regresar(){
    this.router.navigate(['/comedor']);
  }
}
