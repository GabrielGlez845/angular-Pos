import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PosService } from '../../services/pos.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  ConsultarFormGroup: FormGroup;
  cuentas:any[] = [];
  detalleCuenta:any[] = [];
  sinValores : boolean = false;
  constructor(private _formBuilder: FormBuilder,
              private service_pos:PosService) {
    this.ConsultarFormGroup = this._formBuilder.group({
      categoria: ['', [Validators.required ]],
      fecha: ['', [Validators.required ]]
    });
   }

  get categoriaNovalido() {
    return this.ConsultarFormGroup.get('categoria')!.invalid && this.ConsultarFormGroup.get('categoria')!.touched;
  }
  get fechaNovalida() {
    return this.ConsultarFormGroup.get('fecha')!.invalid && this.ConsultarFormGroup.get('fecha')!.touched;
  }

  consultarCuenta(){    
    if (this.ConsultarFormGroup.invalid) {
      return Object.values( this.ConsultarFormGroup.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
    }
    console.log("consular")
    this.service_pos.obtenerCuentasFecha(this.ConsultarFormGroup.value.fecha).subscribe((resp:any)=>{
      console.log(resp);
      this.cuentas = resp;
    })
  }

  verCuenta(cuenta:any){
    let cuenta_id = cuenta;
    this.service_pos.obtenerDetalleCuenta(cuenta_id).subscribe((resp:any) =>{
      console.log(resp)
      resp.forEach((detalle:any) => {
        if(detalle.producto_id == 4){
          detalle.producto_id="Chilaquiles"
          detalle.precio=35;
        }
        if(detalle.producto_id == 3){
          detalle.producto_id="burguer"
          detalle.precio=45;
        }
      });
      this.detalleCuenta = resp;
      //no tiene detalle cuenta
      if (resp[0] === undefined){
         // console.log("no existen productos asignados a esta cuenta")        
          this.sinValores = true;
      }else{
        this.sinValores = false;
      }
    })    //Sigue capturar segun una cuenta y una vez qu capture que se puede agregar platillos y se resten en los platillos
    
  }
  ngOnInit(): void {
  }

}
