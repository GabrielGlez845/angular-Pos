import { Component, OnInit } from '@angular/core';
import { InventariosService } from '../../services/inventarios.service';
import { ArticuloModel } from '../../modelos/articulo.model';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  articulos:any[];
  articulo:ArticuloModel;
  constructor(private inventariosService:InventariosService) { }

  ngOnInit(): void {
    this.inventariosService.obtenerArticulo().subscribe((resp:any) =>{
        console.log(resp);
        this.articulos=resp;
    })
  }

  agregarArticulo(){
    
  }

}
