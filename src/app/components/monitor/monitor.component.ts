import { Component, OnInit } from '@angular/core';
import { PosService } from '../../services/pos.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  
  turno_id:number
  comedor:number
  rapido:number
  plataforma:number
  constructor(private servicioPos: PosService) { 
    this.ultimoTurno();
  }

  ngOnInit(): void {

  }

  //Ultimo turno
  async ultimoTurno(){
    //const resp = await
     this.servicioPos.obtenerUltimoTurnoPromesa()
    .then(((resp:any)=>{
     this.turno_id = resp[0].turno_id;
    })).then(() => {
      this.turnoActual()}
      )
  }

  turnoActual(){
    this.servicioPos.obtenerVentasSeccion(this.turno_id,'Comedor').subscribe((comedor:any)=>{
        console.log(comedor);
        this.comedor=comedor[0].total
    })
    this.servicioPos.obtenerVentasSeccion(this.turno_id,'Plataforma').subscribe((plataforma:any)=>{
      console.log(plataforma);
      this.plataforma=plataforma[0].total
  })
  this.servicioPos.obtenerVentasSeccion(this.turno_id,'Rapido').subscribe((rapido:any)=>{
    console.log(rapido);
    this.rapido=rapido[0].total
})
  }
}
