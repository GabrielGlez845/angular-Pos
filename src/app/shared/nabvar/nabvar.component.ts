import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MovimientosModel } from '../../modelos/movimiento.model';
import { PosService } from '../../services/pos.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent implements OnInit {

  TurnoAbiertoFormGroup: FormGroup;
  TurnoCerradoFormGroup: FormGroup;
  movimiento : MovimientosModel;
  turno_abierto : boolean = true;
  turno_id:Number;
  constructor(private servicioPos: PosService,
              private _formBuilder: FormBuilder) { 
                //AbrirTurno
                this.TurnoAbiertoFormGroup = this._formBuilder.group({
                  apertura: ['', [Validators.required,Validators.pattern('^\\d+$') ]]
                });
                //Cerrar Turno
                this.TurnoCerradoFormGroup = this._formBuilder.group({
                  efectivo: ['', [Validators.required,Validators.pattern('^\\d+$') ]],
                  tarjeta: ['', [Validators.required,Validators.pattern('^\\d+$') ]]
                });
              }

              //Abrir Turno
  get aperturaNovalida() {
    return this.TurnoAbiertoFormGroup.get('apertura')!.invalid && this.TurnoAbiertoFormGroup.get('apertura')!.touched;
  }

  //Cerrar Turno
  get efectivoNovalido() {
    return this.TurnoCerradoFormGroup.get('efectivo')!.invalid && this.TurnoCerradoFormGroup.get('efectivo')!.touched;
  }

  get tarjetaNovalida() {
    return this.TurnoCerradoFormGroup.get('tarjeta')!.invalid && this.TurnoCerradoFormGroup.get('tarjeta')!.touched;
  }

  ngOnInit() {
    this.ultimoTurno();
     
   }
 
   ultimoTurno(){
     this.servicioPos.obtenerUltimoTurno().subscribe((resp:any)=>{
      // console.log('ultimo turno',resp[0].turno_id);      
      // console.log('ultimo turno',resp[0].turno_abierto);
       this.turno_id = resp[0].turno_id;
       if(resp[0].turno_abierto === 'true'){
           this.turno_abierto = true;
       }else{
         this.turno_abierto = false;
       }
     })
   }
 
   abrirTurno(){
     if (this.TurnoAbiertoFormGroup.invalid) {
       return Object.values( this.TurnoAbiertoFormGroup.controls).forEach(control => {
        if (control instanceof FormGroup ) {
         Object.values( control.controls).forEach(control => control.markAsTouched());
        } else {
           control.markAllAsTouched();       
        }
      });
     }
     /*Swal.fire({
       allowOutsideClick:false,
       icon: 'info',
       text: 'Espere porfavor'
     });
     Swal.showLoading();
     */
     this.ultimoTurno();
     let date: Date = new Date();
     let fecha : String;
     fecha = `${date.getFullYear()}/${(date.getMonth()+1)}/${date.getDate()}  ${(date.getHours())}:${date.getMinutes()}:${date.getSeconds()}`
     //console.log(fecha);
     this.servicioPos.abrirTurno(fecha,this.TurnoAbiertoFormGroup.value.apertura,this.turno_id).subscribe((resp:any) =>{
      // console.log('respuesta',resp.output['message'])
       //Swal.close();
       Swal.fire({
         icon: 'info',
         title: '',
         text: resp.output['message']
       });
       this.ultimoTurno();
     })
     
   }
 
   cerrarTurno(){
     if (this.TurnoCerradoFormGroup.invalid) {
       return Object.values( this.TurnoCerradoFormGroup.controls).forEach(control => {
        if (control instanceof FormGroup ) {
         Object.values( control.controls).forEach(control => control.markAsTouched());
        } else {
           control.markAsTouched();
        }
       
      });
       
     }
   
     this.ultimoTurno();
     let date: Date = new Date();
     let fecha : String;
     fecha = `${date.getFullYear()}/${(date.getMonth()+1)}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
     this.servicioPos.cerrarTurno(fecha,'0',this.turno_id).subscribe((resp:any) =>{
       console.log('respuesta',resp.output['message'])
       //Swal.close();
       Swal.fire({
         icon: 'info',
         title: '',
         text: resp.output['message']
       });
       this.ultimoTurno();
     })
   }

}

//Navbar y sidebar terminado terminado 