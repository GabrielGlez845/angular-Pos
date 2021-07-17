import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NabvarComponent } from './shared/nabvar/nabvar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
//http
import {HttpClientModule} from '@angular/common/http';
import { ComedorComponent } from './components/comedor/comedor.component';
import { PlataformaComponent } from './components/plataforma/plataforma.component';
import { RapidoComponent } from './components/rapido/rapido.component';
import { RetiroDepositoComponent } from './components/retiro-deposito/retiro-deposito.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { CorteComponent } from './components/corte/corte.component';
import { ConsultaComponent } from './components/consulta/consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    NabvarComponent,
    InicioComponent,
    SidebarComponent,
    ComedorComponent,
    PlataformaComponent,
    RapidoComponent,
    RetiroDepositoComponent,
    MonitorComponent,
    CorteComponent,
    ConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
