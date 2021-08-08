import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NabvarComponent } from './shared/nabvar/nabvar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
//http
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
//components
import { ComedorComponent } from './components/comedor/comedor.component';
import { PlataformaComponent } from './components/plataforma/plataforma.component';
import { RapidoComponent } from './components/rapido/rapido.component';
import { RetiroDepositoComponent } from './components/retiro-deposito/retiro-deposito.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { CorteComponent } from './components/corte/corte.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
//material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';

//Graficas
//import { ChartsModule } from 'ng2-charts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Componentes
import { DetalleComponent } from './pages/detalle/detalle.component';
import { CapturaComponent } from './pages/captura/captura.component';
import { GraficaComponent } from './shared/grafica/grafica.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { PlatillosComponent } from './components/platillos/platillos.component';
import { InsumosComponent } from './components/insumos/insumos.component';

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
    ConsultaComponent,
    DetalleComponent,
    CapturaComponent,
    GraficaComponent,
    ArticulosComponent,
    PlatillosComponent,
    InsumosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
 //   ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
