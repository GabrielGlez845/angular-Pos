import { Component, OnInit } from '@angular/core';
import { InventariosService } from '../../services/inventarios.service';
import { ArticuloModel } from '../../modelos/articulo.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  articulos:any[];
  articulo:ArticuloModel;
  modal : NgbModalRef;
  ArticuloFormGroup: FormGroup;
  constructor(private inventariosService:InventariosService,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder) {
                this.ArticuloFormGroup = this._formBuilder.group({
                  nombre: ['', [Validators.required]],
                  categoria: ['', [Validators.required]],
                  departamento: ['', [Validators.required]],
                  unidad_compra: ['', [Validators.required]],
                  unidad_venta: ['', [Validators.required]],
                  precio_compra: ['', [Validators.required,Validators.pattern('^\\d+$') ]],
                  precio_venta: ['', [Validators.required,Validators.pattern('^\\d+$') ]],
                  existencia: ['', [Validators.required,Validators.pattern('^\\d+$') ]]
                });
               }

  ngOnInit(): void {
   this.obtenerArticulos();
  }

  obtenerArticulos(){
    this.inventariosService.obtenerArticulo().subscribe((resp:any) =>{
      console.log(resp);
      this.articulos=resp;
  })
  }

   //Articulo
  get nombreNovalido() {
    return this.ArticuloFormGroup.get('nombre')!.invalid && this.ArticuloFormGroup.get('nombre')!.touched;
  }
  get categoriaNovalida() {
    return this.ArticuloFormGroup.get('categoria')!.invalid && this.ArticuloFormGroup.get('categoria')!.touched;
  }
  get departamentoNovalido() {
    return this.ArticuloFormGroup.get('departamento')!.invalid && this.ArticuloFormGroup.get('departamento')!.touched;
  }
  get unidadCompraNovalida() {
    return this.ArticuloFormGroup.get('unidad_compra')!.invalid && this.ArticuloFormGroup.get('unidad_compra')!.touched;
  }
  get unidadVentaNovalida() {
    return this.ArticuloFormGroup.get('unidad_venta')!.invalid && this.ArticuloFormGroup.get('unidad_venta')!.touched;
  }
  get precioCompraNovalida() {
    return this.ArticuloFormGroup.get('precio_compra')!.invalid && this.ArticuloFormGroup.get('precio_compra')!.touched;
  }
  get precioVentaNovalida() {
    return this.ArticuloFormGroup.get('precio_venta')!.invalid && this.ArticuloFormGroup.get('precio_venta')!.touched;
  }
  get existenciaNovalida() {
    return this.ArticuloFormGroup.get('existencia')!.invalid && this.ArticuloFormGroup.get('existencia')!.touched;
  }

  open(content:any) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
  }

  agregarArticulo(){
    if (this.ArticuloFormGroup.invalid) {
      return Object.values( this.ArticuloFormGroup.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
    }    
    this.articulo={
       nombre: `${this.ArticuloFormGroup.value.nombre}`,
       categoria_id: 1,
       departamento_id: 1,
       unidad_compra:`${this.ArticuloFormGroup.value.unidad_compra}`,
       unidad_venta: `${this.ArticuloFormGroup.value.unidad_venta}`,
       precio_compra:`${this.ArticuloFormGroup.value.precio_compra}`,
       precio_venta:`${this.ArticuloFormGroup.value.precio_venta}`,
       existencia:this.ArticuloFormGroup.value.existencia,       
       img:'null',
       visible:1,
       producto_id:0,
    }
    this.inventariosService.agregarArticulo(this.articulo).subscribe(resp=>{
      console.log(resp);
      this.obtenerArticulos();
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'Articulo agregado'
      });
      this.modal.close();
    },err=>{
      console.log('error',err)
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'error'
      });
    })
  }

  eliminarArticulo(id: number){
      this.inventariosService.borrarArticulo(id).subscribe(resp=>{
          console.log(resp);
          this.obtenerArticulos();
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'Articulo eliminado'
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
