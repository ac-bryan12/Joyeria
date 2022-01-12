import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/sitioComercial/inicio/inicio.component';
import { NavbarComponent } from './componentes/sitioComercial/partials/navbar/navbar.component';
import { ArticulosComponent } from './componentes/sitioComercial/articulos/articulos.component';
import { ContactenosComponent } from './componentes/sitioComercial/contactenos/contactenos.component';
import { NosotrosComponent } from './componentes/sitioComercial/nosotros/nosotros.component';
import { ProductoComponent } from './componentes/sitioComercial/partials/producto/producto.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './componentes/sitioComercial/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    ArticulosComponent,
    ContactenosComponent,
    NosotrosComponent,
    ProductoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
