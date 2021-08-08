import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosService } from '../../services/pos.service';
import Swal from 'sweetalert2'
import { CuentaModel } from '../../modelos/cuenta.model';

@Component({
  selector: 'app-comedor',
  templateUrl: './comedor.component.html',
  styleUrls: ['./comedor.component.css']
})
export class ComedorComponent implements OnInit {

  turno_id:number;
  cuentas:any[];
  cuenta:CuentaModel;
  constructor(private router:Router,
              private servicioPos: PosService) {
                this.ultimoTurno();
               }

  ngOnInit(): void {
  }

  //Ultimo turno
   async ultimoTurno(){
    //const resp = await
     this.servicioPos.obtenerUltimoTurnoPromesa()
    .then(((resp:any)=>{
     this.turno_id = resp[0].turno_id;
    }))
   // const respuesta = await resp
    .then((() => {    
     this.cuentasSinPagar();
    }))
  }

  cuentasSinPagar(){
    this.servicioPos.obtenerCuentasNoPagadas(this.turno_id,'Comedor').subscribe((resp:any)=>{
      console.log(resp)
      this.cuentas = resp;
    })
  }
  // Detalle page
  verDetalle(cuenta:number){
    this.router.navigate(['/detalle',cuenta,'comedor']);
  }

 
  abrirCuenta(){
    this.ultimoTurno();
    let date: Date = new Date();
    let fecha : String;
    fecha = `${date.getFullYear()}/${(date.getMonth()+1)}/${date.getDate()}  ${(date.getHours())}:${date.getMinutes()}:${date.getSeconds()}`
    this.cuenta={
      apertura:fecha,
      cierre:'2000/10/26 12:00:00',
      total:'0',
      estado_id:2,
      descuento_gnral:'0',
      cajero_id:1,
      cliente_id:1,
      turno_id:this.turno_id,
      seccion :'Comedor'
    }
    console.log(this.cuenta)
    this.servicioPos.agregarCuenta(this.cuenta).subscribe(resp=>{
        console.log(resp)
        //this.router.navigate(['/pos/rapido']);
        //Nueva cuenta creada
        this.cuentasSinPagar();
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'Nueva cuenta creada'
        });
    },err=>{
      console.log(err)
    })
  }

}
