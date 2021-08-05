import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ComedorComponent } from './components/comedor/comedor.component';
import { PlataformaComponent } from './components/plataforma/plataforma.component';
import { RapidoComponent } from './components/rapido/rapido.component';
import { RetiroDepositoComponent } from './components/retiro-deposito/retiro-deposito.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { CorteComponent } from './components/corte/corte.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { CapturaComponent } from './pages/captura/captura.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { PlatillosComponent } from './components/platillos/platillos.component';
import { InsumosComponent } from './components/insumos/insumos.component';

const routes: Routes = [  
    { path: "inicio",component: InicioComponent},
    { path: "comedor",component: ComedorComponent},
    { path: "plataforma",component: PlataformaComponent},
    { path: "rapido",component: RapidoComponent},
    { path: "retiro",component: RetiroDepositoComponent},
    { path: "consultar",component: ConsultaComponent},
    { path: "monitor",component: MonitorComponent},
    { path: "corte",component: CorteComponent},
    { path: "detalle/:id/:tipo",component: DetalleComponent},
    { path: "captura/:id/:tipo",component: CapturaComponent},

    { path: "articulos",component: ArticulosComponent},
    { path: "platillos",component: PlatillosComponent},
    { path: "insumos",component: InsumosComponent},
    { path:"**", component:InicioComponent },
    { path: "", pathMatch: "full", redirectTo: "inicio" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//Diseños de inventarios, sin fotos , habilitar funciones de monitor, habilitar fuciones de los inventarios
// terminar comedor para pagar e imprimir ticket