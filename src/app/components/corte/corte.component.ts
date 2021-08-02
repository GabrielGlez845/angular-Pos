import { Component, OnInit } from '@angular/core';
import { PosService } from '../../services/pos.service';

@Component({
  selector: 'app-corte',
  templateUrl: './corte.component.html',
  styleUrls: ['./corte.component.css']
})
export class CorteComponent implements OnInit {

  turno_id:any;
  total:Number;
  entrada:Number;
  salida:Number;
  constructor(private servicioPos: PosService) { 
    this.ultimoTurno();
  }

  ngOnInit(): void {

  }

  ultimoTurno(){
    this.servicioPos.obtenerUltimoTurno().subscribe((resp:any)=>{
      this.turno_id = resp[0].turno_id;
    })
  }

  corteCaja(){
    this.ultimoTurno();
    console.log(this.turno_id);
    this.servicioPos.obtenerVentasTurnoCaja(this.turno_id).subscribe((resp:any)=>{
      console.log(resp);
      this.total=resp[0]['total'];
      this.salida=resp[0]['salida'];
      this.entrada=resp[0]['entrada'];
    })
  }

}
