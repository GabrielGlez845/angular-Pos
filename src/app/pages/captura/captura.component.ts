import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatilloModel } from '../../modelos/platillo.model';
import { PosService } from '../../services/pos.service';
import { InventariosService } from '../../services/inventarios.service';
import Swal from 'sweetalert2'
import { CuentaDetalleModel } from '../../modelos/cuenta.model';

@Component({
  selector: 'app-captura',
  templateUrl: './captura.component.html',
  styleUrls: ['./captura.component.css']
})
export class CapturaComponent implements OnInit {
cuenta_id:number;
tipo:number;
  platillos:any[]=[];
  listaPlatillos:PlatilloModel[]=[];
  //cantidad:any[]=[];
  total:number;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private service_pos:PosService,
              private service_inventaio:InventariosService) {
      this.route.params.subscribe(data => {
      //console.log(data.id)
      this.cuenta_id = data.id;
      this.tipo = data.tipo;
  });
   }

  ngOnInit(): void {
    this.obtenerPlatillos();
  }

  Regresar(){
    this.router.navigate([`/detalle/${this.cuenta_id}/${this.tipo}`]);
  }

  obtenerPlatillos(){
    this.service_inventaio.obtenerPlatillo().subscribe((resp:any)=>{
      
      this.platillos=resp;
    })
  }

  agregarPlatillo(platillo: PlatilloModel){
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

  borrarPlatillo(platillo: PlatilloModel){
    if(platillo.cantidad <= 1){
      let objIndex = this.listaPlatillos.findIndex((obj => obj.producto_id == platillo.producto_id));
      this.listaPlatillos.splice(objIndex,1);
    }else{
      platillo.cantidad= platillo.cantidad-1;
    }
    this.total = this.listaPlatillos.reduce((sum, current) => sum + (parseInt(current.precio_venta) * current.cantidad), 0);
  }


  confirmarCuenta(){
    console.log("lista",this.listaPlatillos);
    let CuentaDetalle:CuentaDetalleModel[]=[];
    this.listaPlatillos.forEach(platillo => {
    let Detalle={cuenta_id:this.cuenta_id,cantidad:platillo.cantidad,producto_id:platillo.producto_id,descuento:0};
    CuentaDetalle.push(Detalle);
    });
  console.log("cuenta",CuentaDetalle)
  this.service_pos.agregarDetalleCuenta(CuentaDetalle).subscribe(resp =>{
    console.log(resp);
  })
  Swal.fire({
    icon: 'success',
    title: '',
    text: 'Productos agregados'
  });
    
    this.router.navigate([`/detalle/${this.cuenta_id}`]);
  }
}


