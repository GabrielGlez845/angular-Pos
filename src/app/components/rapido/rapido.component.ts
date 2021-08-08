import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { PlatilloModel } from '../../modelos/platillo.model';
import { PosService } from '../../services/pos.service';
import { InventariosService } from '../../services/inventarios.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MovimientosModel } from '../../modelos/movimiento.model';
@Component({
  selector: 'app-rapido',
  templateUrl: './rapido.component.html',
  styleUrls: ['./rapido.component.css']
})
export class RapidoComponent implements OnInit {
  platillos:any[]=[];
  //listaPlatillos:PlatilloModel[]=[];
  listaPlatillos:any[]=[];
  total:number = 0;
  PagarDepositoFormGroup: FormGroup;
  movimiento : MovimientosModel;
  turno_id:number;
  modal : NgbModalRef;
  constructor( private servicioPos:PosService,
               private service_inventaio:InventariosService,
               private _formBuilder: FormBuilder,
               private modalService: NgbModal) {
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
    this.obtenerPlatillos();
    this.ultimoTurno();
  }

  ultimoTurno(){
    this.servicioPos.obtenerUltimoTurno().subscribe((resp:any)=>{
      this.turno_id = resp[0].turno_id;      
    })
  }

  obtenerPlatillos(){
    this.service_inventaio.obtenerPlatillo().subscribe((resp:any)=>{
      
      this.platillos=resp;
    })
  }

  agregarPlatillo(platillo: any){
    //Saber la cantidad y emitirla
    let objIndex = this.listaPlatillos.findIndex((obj => obj.producto_id == platillo.producto_id));
    if(objIndex != -1)
      {     
        platillo.cantidad=platillo.cantidad+1;
      }
      //Si es el primer item de ese tipo lo agregamos derecho al carrito
      else {
        platillo.cantidad = 1;
        this.listaPlatillos.push(platillo);
        console.log("lista platillos",this.listaPlatillos)
      }
    this.total = this.listaPlatillos.reduce((sum, current) => sum + ((parseInt(current.precio_venta) * current.cantidad)), 0);  
  }

  borrarPlatillo(platillo: any){
    if(platillo.cantidad <= 1){
      let objIndex = this.listaPlatillos.findIndex((obj => obj.producto_id == platillo.producto_id));
      this.listaPlatillos.splice(objIndex,1);
    }else{
      platillo.cantidad= platillo.cantidad-1;
    }
    this.total = this.listaPlatillos.reduce((sum, current) => sum + (parseInt(current.precio_venta) * current.cantidad), 0);
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
    if (this.total>this.PagarDepositoFormGroup.value.cantidad) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'El dinero para pagar no es suficiente'
      });
    }else{     
          let date: Date = new Date();
          let fecha : String;
          fecha = `${date.getFullYear()}/${(date.getMonth()+1)}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
          this.movimiento = {
            fecha:fecha,
            entrada:this.total.toString(),
            saldo:'0',
            salida:'0',
            tipo:`${this.PagarDepositoFormGroup.value.tipo}`,
            turno_id:this.turno_id
          }
          this.servicioPos.agregarDeposito(this.movimiento).toPromise().then(()=>{
            Swal.fire({
              icon: 'success',
              title: '',
              text: 'Cuenta pagada'
            });
            this.modal.close();
          })
    }
  }

  open(content:any) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
}

