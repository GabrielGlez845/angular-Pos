import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { InventariosService } from '../../services/inventarios.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { InsumoModel } from '../../modelos/insumo.model';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {

  insumos:any[];
  insumo:InsumoModel;
  modal : NgbModalRef;
  InsumoFormGroup: FormGroup;
  constructor(private inventariosService:InventariosService,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder) {
                this.InsumoFormGroup = this._formBuilder.group({
                  nombre: ['', [Validators.required]],
                  categoria: ['', [Validators.required]],
                  departamento: ['', [Validators.required]],
                  unidad_compra: ['', [Validators.required]],
                  unidad_consumo: ['', [Validators.required]],
                  factor: ['', [Validators.required]],
                  precio_compra: ['', [Validators.required,Validators.pattern('^\\d+$') ]],
                  precio_venta: ['', [Validators.required,Validators.pattern('^\\d+$') ]],
                  stock_minimo: ['', [Validators.required,Validators.pattern('^\\d+$')]],
                  stock_maximo: ['', [Validators.required,Validators.pattern('^\\d+$')]],
                  existencia: ['', [Validators.required,Validators.pattern('^\\d+$') ]]
                });
               }

  //Insumo
  get nombreNovalido() {
    return this.InsumoFormGroup.get('nombre')!.invalid && this.InsumoFormGroup.get('nombre')!.touched;
  }
  get categoriaNovalida() {
    return this.InsumoFormGroup.get('categoria')!.invalid && this.InsumoFormGroup.get('categoria')!.touched;
  }
  get departamentoNovalido() {
    return this.InsumoFormGroup.get('departamento')!.invalid && this.InsumoFormGroup.get('departamento')!.touched;
  }
  get unidadCompraNovalida() {
    return this.InsumoFormGroup.get('unidad_compra')!.invalid && this.InsumoFormGroup.get('unidad_compra')!.touched;
  }
  get unidadConsumoNovalida() {
    return this.InsumoFormGroup.get('unidad_consumo')!.invalid && this.InsumoFormGroup.get('unidad_consumo')!.touched;
  }
  get factorNovalido() {
    return this.InsumoFormGroup.get('factor')!.invalid && this.InsumoFormGroup.get('factor')!.touched;
  }
  get precioCompraNovalida() {
    return this.InsumoFormGroup.get('precio_compra')!.invalid && this.InsumoFormGroup.get('precio_compra')!.touched;
  }
  get precioVentaNovalida() {
    return this.InsumoFormGroup.get('precio_venta')!.invalid && this.InsumoFormGroup.get('precio_venta')!.touched;
  }
  get stockMinimo() {
    return this.InsumoFormGroup.get('stock_minimo')!.invalid && this.InsumoFormGroup.get('stock_minimo')!.touched;
  }
  get stockMaximo() {
    return this.InsumoFormGroup.get('stock_maximo')!.invalid && this.InsumoFormGroup.get('stock_maximo')!.touched;
  }
  get existenciaNovalida() {
    return this.InsumoFormGroup.get('existencia')!.invalid && this.InsumoFormGroup.get('existencia')!.touched;
  }
  ngOnInit(): void {
    this.obtenerInsumos()
  }

  open(content:any) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
  }

  obtenerInsumos(){
    this.inventariosService.obtenerInsumo().subscribe((resp:any) =>{
      console.log(resp);
      this.insumos=resp;
    })
  }

  agregarInsumo(){
    if (this.InsumoFormGroup.invalid) {
      return Object.values( this.InsumoFormGroup.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
    }
    
    this.insumo= {
      nombre:`${this.InsumoFormGroup.value.nombre}`,
      categoria_id:1,
      departamento_id:1,
      unidad_compra:`${this.InsumoFormGroup.value.unidad_compra}`,
      unidad_consumo:`${this.InsumoFormGroup.value.unidad_consumo}`,
      factor: this.InsumoFormGroup.value.factor,
      precio_compra:this.InsumoFormGroup.value.precio_compra,
      precio_venta:this.InsumoFormGroup.value.precio_venta,
      stock_minimo:this.InsumoFormGroup.value.stock_minimo,
      stock_maximo:this.InsumoFormGroup.value.stock_maximo,
      existencia:this.InsumoFormGroup.value.existencia,
      img:'null',
      producto_id:0,
      visible:1
    }

    this.inventariosService.agregarInsumo(this.insumo).subscribe(resp =>{
      console.log(resp);
      this.obtenerInsumos();
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

  eliminarInsumo(id:number){
    this.inventariosService.borrarInsumo(id).subscribe(resp=>{
      console.log(resp)
      this.obtenerInsumos();
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'insumo eliminado'
      });
    },err=>{
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'error'
      });
    })
      
  }
}
