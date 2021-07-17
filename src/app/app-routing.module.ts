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

const routes: Routes = [  
    { path: "inicio",component: InicioComponent},
    { path: "comedor",component: ComedorComponent},
    { path: "plataforma",component: PlataformaComponent},
    { path: "rapido",component: RapidoComponent},
    { path: "retiro",component: RetiroDepositoComponent},
    { path: "consultar",component: ConsultaComponent},
    { path: "monitor",component: MonitorComponent},
    { path: "corte",component: CorteComponent},
    { path:"**", component:InicioComponent },
    { path: "", pathMatch: "full", redirectTo: "inicio" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
