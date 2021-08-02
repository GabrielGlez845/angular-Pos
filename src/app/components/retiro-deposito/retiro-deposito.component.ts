import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2'
import { PosService } from '../../services/pos.service';
import { MovimientosModel } from '../../modelos/movimiento.model';

@Component({
  selector: 'app-retiro-deposito',
  templateUrl: './retiro-deposito.component.html',
  styleUrls: ['./retiro-deposito.component.css']
})
export class RetiroDepositoComponent implements OnInit {

  RetiroFormGroup: FormGroup;
  turno_id:any;
  movimiento : MovimientosModel;
  DepositoFormGroup: FormGroup;
  constructor( private _formBuilder: FormBuilder,
               private servicioPos:PosService) { 
    this.RetiroFormGroup = this._formBuilder.group({      
      concepto: ['', [Validators.required]],
      importe: ['', [Validators.required,Validators.pattern('^\\d+$') ]]
    });
    this.DepositoFormGroup = this._formBuilder.group({      
      concepto: ['', [Validators.required]],
      importe: ['', [Validators.required,Validators.pattern('^\\d+$') ]]
    });
  }

  //Retiro 
  get conceptoNovalido() {
    return this.RetiroFormGroup.get('concepto')!.invalid && this.RetiroFormGroup.get('concepto')!.touched;
  }
  get importeNovalido() {
    return this.RetiroFormGroup.get('importe')!.invalid && this.RetiroFormGroup.get('importe')!.touched;
  }

  //Deposito
  get conceptoNovalido1() {
    return this.DepositoFormGroup.get('concepto')!.invalid && this.DepositoFormGroup.get('concepto')!.touched;
  }
  get importeNovalido1() {
    return this.DepositoFormGroup.get('importe')!.invalid && this.DepositoFormGroup.get('importe')!.touched;
  }

  ngOnInit(): void {
    this.ultimoTurno();
  }

  retiro(tipo:string){
    if (this.RetiroFormGroup.invalid) {
      return Object.values( this.RetiroFormGroup.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
    }
    let date: Date = new Date();
    let fecha : String;
    let entrada: String = '0';
    let salida: string = '0';
    let bandera: boolean = false;
    let total: Number = 0;

    fecha = `${date.getFullYear()}/${(date.getMonth()+1)}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
   
      salida = this.RetiroFormGroup.value.importe
      //verificar si existen fondos PROMESA
      this.servicioPos.obtenerVentasTurnoCajaPromesa(this.turno_id)
      .then(((resp:any)=>{
       return total=resp[0]['total'];                        
      }), (err) => {
        console.log(err);
      })
      .then((()=>{ //colocar un = en el return para asigarlo a un variable
        if(parseInt(salida)<total){
          bandera= true;
         this.movimiento = {
          fecha: fecha,
          entrada:entrada,
          saldo:'0',
          salida:salida,
          tipo:tipo,
          turno_id:this.turno_id
      }
      console.log(this.movimiento)
      console.log(this.turno_id)
      this.servicioPos.agregarDeposito(this.movimiento).subscribe(resp =>{
        console.log(resp);
      });
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'Se añadio con exito el retiro'
      });
      }else{
       bandera = false;
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No existen suficientes fondos'
      });
       
      }
      }))
    
    }


    deposito(tipo:string){
      console.log("2 veces")
      if (this.DepositoFormGroup.invalid) {
        return Object.values( this.DepositoFormGroup.controls).forEach(control => {
         if (control instanceof FormGroup ) {
          Object.values( control.controls).forEach(control => control.markAsTouched());
         } else {
            control.markAsTouched();
         }
       });
      }
      
      let date: Date = new Date();
    let fecha : String;
    let entrada: String = '0';
    let salida: string = '0';

    fecha = `${date.getFullYear()}/${(date.getMonth()+1)}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      entrada = this.DepositoFormGroup.value.importe
      console.log('importe: ', entrada)
          this.movimiento = {
            fecha: fecha,
            entrada:entrada,
            saldo:'0',
            salida:salida,
            tipo:tipo,
            turno_id:this.turno_id
        }
        console.log(this.movimiento)
        console.log(this.turno_id)
        this.servicioPos.agregarDeposito(this.movimiento).subscribe(resp =>{
          console.log(resp);
        });
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'Se añadio con exito el deposito'
        });
    
    }


    ultimoTurno(){
      this.servicioPos.obtenerUltimoTurno().subscribe((resp:any)=>{
        this.turno_id = resp[0].turno_id;
      })
    }
}
