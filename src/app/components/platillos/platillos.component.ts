import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { InventariosService } from '../../services/inventarios.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PlatilloModel } from '../../modelos/platillo.model';

@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styleUrls: ['./platillos.component.css']
})
export class PlatillosComponent implements OnInit {

  platillos:any[];
  platillo:PlatilloModel;
  modal : NgbModalRef;
  PlatilloFormGroup: FormGroup;
  constructor(private inventariosService:InventariosService,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder) {
                this.PlatilloFormGroup = this._formBuilder.group({
                  nombre: ['', [Validators.required]],
                  categoria: ['', [Validators.required]],
                  departamento: ['', [Validators.required]],
                  unidad_venta: ['', [Validators.required]],
                  precio_venta: ['', [Validators.required,Validators.pattern('^\\d+$') ]],
                  existencia: ['', [Validators.required,Validators.pattern('^\\d+$') ]]
                });
               }

          //Platillo
          get nombreNovalido() {
            return this.PlatilloFormGroup.get('nombre')!.invalid && this.PlatilloFormGroup.get('nombre')!.touched;
          }
          get categoriaNovalida() {
            return this.PlatilloFormGroup.get('categoria')!.invalid && this.PlatilloFormGroup.get('categoria')!.touched;
          }
          get departamentoNovalido() {
            return this.PlatilloFormGroup.get('departamento')!.invalid && this.PlatilloFormGroup.get('departamento')!.touched;
          }
          get unidadVentaNovalida() {
            return this.PlatilloFormGroup.get('unidad_venta')!.invalid && this.PlatilloFormGroup.get('unidad_venta')!.touched;
          }
          get precioVentaNovalida() {
            return this.PlatilloFormGroup.get('precio_venta')!.invalid && this.PlatilloFormGroup.get('precio_venta')!.touched;
          }
          get existenciaNovalida() {
            return this.PlatilloFormGroup.get('existencia')!.invalid && this.PlatilloFormGroup.get('existencia')!.touched;
          }


  ngOnInit(): void {
    this.obtenerPlatillos();
  }

  obtenerPlatillos(){
    this.inventariosService.obtenerPlatillo().subscribe((resp:any)=>{
      console.log(resp);
      this.platillos=resp;
    })
  }

  open(content:any) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
  }

  agregarPlatillo(){
    if (this.PlatilloFormGroup.invalid) {
      return Object.values( this.PlatilloFormGroup.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
    }

    this.platillo = {
      nombre:`${this.PlatilloFormGroup.value.nombre}`,
      categoria_id:1,
      departamento_id:1,
      unidad_venta:`${this.PlatilloFormGroup.value.unidad_venta}`,
      precio_venta:this.PlatilloFormGroup.value.precio_venta,
      existencia:this.PlatilloFormGroup.value.existencia,
      img:'null',
      producto_id:0,
      visible:1
    }
    this.inventariosService.agregarPlatillo(this.platillo).subscribe(resp=>{
      console.log(resp);
      this.obtenerPlatillos();
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'insumo agregado'
      });
      this.modal.close();
    },err=>{
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'error'
      });
    })
  }

  eliminarPlatillo(id:number){
    this.inventariosService.borrarPlatillo(id).subscribe(resp=>{
      console.log(resp)
      this.obtenerPlatillos();
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'platillo eliminado'
      });
    },err=>{
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'error'
      });
    })
  }
//Agregar stpper donde se rellene tambien informacion para detalle platillo
}
