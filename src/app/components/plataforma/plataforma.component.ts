import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosService } from '../../services/pos.service';
import Swal from 'sweetalert2'
import { CuentaModel } from '../../modelos/cuenta.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-plataforma',
  templateUrl: './plataforma.component.html',
  styleUrls: ['./plataforma.component.css']
})
export class PlataformaComponent implements OnInit {

  turno_id:number;
  cuentas:any[];
  cuenta:CuentaModel;
  ClienteFormGroup: FormGroup;
  modal : NgbModalRef;
  constructor(private router:Router,
              private servicioPos: PosService,
              private _formBuilder: FormBuilder,
              private modalService: NgbModal) {
                this.ultimoTurno();
                 //Cliente
                 this.ClienteFormGroup = this._formBuilder.group({
                  cliente: ['', [Validators.required]]
                });
               }

  ngOnInit(): void {
    
  }

   //Retiro Deposito
   get clienteNovalido() {
    return this.ClienteFormGroup.get('cliente')!.invalid && this.ClienteFormGroup.get('cliente')!.touched;
  }

  seleccionarCliente(){
    if (this.ClienteFormGroup.invalid) {
      return Object.values( this.ClienteFormGroup.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });     
    }
    this.abrirCuenta(1);
  }
   //Ultimo turno
    ultimoTurno(){
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
    this.servicioPos.obtenerCuentasNoPagadas(this.turno_id,'Plataforma').subscribe((resp:any)=>{
      console.log(resp)
      this.cuentas = resp;
    })
  }

  // Detalle page
  verDetalle(cuenta:number){
    this.router.navigate(['/detalle',cuenta,'plataforma']);
  }

  abrirCuenta(cliente_id:number){
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
      cliente_id:cliente_id,
      turno_id:this.turno_id,
      seccion :'Plataforma'
    }
    console.log(this.cuenta)
    this.servicioPos.agregarCuenta(this.cuenta).toPromise().then(resp=>{
      console.log(resp)        
      this.cuentasSinPagar();
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'Nueva cuenta creada'
      });
      this.modal.close();
    }).catch((err)=>{
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Error '
      });
    })
  }

  open(content:any) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
}
