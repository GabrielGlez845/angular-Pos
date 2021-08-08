import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PosService } from '../../services/pos.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MovimientosModel } from '../../modelos/movimiento.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
  importe:number = 0;
  turno_id:number;
  movimiento : MovimientosModel;
  PagarDepositoFormGroup: FormGroup;
  //
  bandera:boolean;
  regresartipo:string;
  clientes:any[];
  modal : NgbModalRef;
  constructor(private router:Router,
              private route:ActivatedRoute,
              private servicioPos:PosService,
              private _formBuilder: FormBuilder,
              private modalService: NgbModal) {
    this.route.params.subscribe(data => {
      this.cuenta_id = data['id'];
      if (data['tipo'] === 'plataforma') {
        this.regresartipo = data['tipo'];
        this.bandera=true;
     }else{
       this.bandera=false;
       this.regresartipo = data['tipo'];
     }
     });
     //Retiro Deposito
     this.PagarDepositoFormGroup = this._formBuilder.group({
      tipo: ['', [Validators.required]],
      cantidad: ['', [Validators.required,Validators.pattern('^\\d+$') ]]
    });
   }

   //Retiro Deposito
  get tipoNovalido() {
    return this.PagarDepositoFormGroup.get('tipo')!.invalid && this.PagarDepositoFormGroup.get('tipo')!.touched;
  }
  get cantidadNovalido() {
    return this.PagarDepositoFormGroup.get('cantidad')!.invalid && this.PagarDepositoFormGroup.get('cantidad')!.touched;
  }

  ngOnInit(): void {
    this.verCuenta(this.cuenta_id);
    this.verCliente(this.cuenta_id);

    this.ultimoTurno();
  }

  ultimoTurno(){
    this.servicioPos.obtenerUltimoTurno().subscribe((resp:any)=>{
      this.turno_id = resp[0].turno_id;      
    })
  }

  Capturar(){
    this.router.navigate(['/captura',this.cuenta_id,this.regresartipo]);
  }

  verCuenta(cuenta:number){
    this.servicioPos.obtenerDetalleCuenta(cuenta).subscribe((resp:any) =>{
      console.log(resp)
      this.detalleCuenta = resp;
      this.cuenta_id = cuenta;
      console.log(resp.producto_id);
      //no tiene detalle cuenta
      if (resp[0] === undefined){
         // console.log("no existen productos asignados a esta cuenta")        
          this.sinValores = true;
      }else{
        this.sinValores = false;
      }
      //Suma de los productos      
    this.detalleCuenta.forEach(detalle => {
      this.importe +=detalle.precio_venta;
    });
    console.log(this.importe);
    })   
    
  }

  verCliente(id:number){
    //hacer una llamada paar obtener la cuenta y de ahi obtener el id clente y buscarlo
    this.servicioPos.obtenerCuentasId(id).toPromise().then((resp:any)=>{
      this.servicioPos.obtenerClienteId(resp[0].cliente_id).toPromise().then((resp:any)=>{
        console.log(resp);
        this.clientes=resp;
      })
    })
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
     .then((()=>{
       this.verCuenta(this.cuenta_id)
       Swal.fire({
        icon: 'success',
        title: '',
        text: 'Productos eliminados'
      });
     })).catch((() =>{
       this.verCuenta(this.cuenta_id)
       Swal.fire({
        icon: 'error',
        title: '',
        text: 'Sucedio un error'
      });
     })
       
     ); 
   
 
   //enviar el array para que sea eliminado
   }

   Regresar(){
    this.router.navigate(['/',this.regresartipo]);
  }

  pagarCuenta(){
    if (this.PagarDepositoFormGroup.invalid) {
      return Object.values( this.PagarDepositoFormGroup.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
     
    }
    if (this.importe>this.PagarDepositoFormGroup.value.cantidad) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'El dinero para pagar no es suficiente'
      });
    }else{
      this.servicioPos.ActualzarEstadoCuenta(this.cuenta_id,1).toPromise().then((resp)=>{
          console.log(resp);
          let date: Date = new Date();
          let fecha : String;
          fecha = `${date.getFullYear()}/${(date.getMonth()+1)}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
          this.movimiento = {
            fecha:fecha,
            entrada:this.importe.toString(),
            saldo:'0',
            salida:'0',
            tipo:`${this.PagarDepositoFormGroup.value.tipo}`,
            turno_id:this.turno_id
          }
          this.servicioPos.agregarDeposito(this.movimiento).toPromise().then((resp)=>{
              console.log(resp);
              this.servicioPos.actualizarCuentaTotal(this.cuenta_id,this.importe).subscribe(resp=>{
                console.log(resp);
              })
              this.router.navigate(['/',this.regresartipo]);
              Swal.fire({
                icon: 'success',
                title: '',
                text: 'Cuenta pagada'
              });
              this.modal.close();
              
          }).catch((error)=>{
            Swal.fire({
              icon: 'error',
              title: '',
              text: error
            });
          })
      })
    }
  }

  open(content:any) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  imprimirCuenta(){
    Swal.fire({
      icon: 'success',
      title: '',
      text: 'imprimiendo ticket'
    });
  }
}
