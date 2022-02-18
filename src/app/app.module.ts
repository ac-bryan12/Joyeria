import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './componentes/sitioComercial/inicio/inicio.component';
import { NavbarComponent } from './componentes/sitioComercial/partials/navbar/navbar.component';
import { ArticulosComponent } from './componentes/sitioComercial/articulos/articulos.component';
import { ContactenosComponent } from './componentes/sitioComercial/contactenos/contactenos.component';
import { NosotrosComponent } from './componentes/sitioComercial/nosotros/nosotros.component';
import { ProductoComponent } from './componentes/sitioComercial/partials/producto/producto.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './componentes/sitioComercial/login/login.component';
import { CreateCuentaComponent } from './componentes/sitioComercial/create-cuenta/create-cuenta.component';
import { PortalComponent } from './componentes/admin/portal/portal.component';
import { CookieService } from 'ngx-cookie-service';
import { ListProductsComponent } from './componentes/admin/list-products/list-products.component';
import { AddModifyProductComponent } from './componentes/admin/add-modify-product/add-modify-product.component';
import { CarritoComponent } from './componentes/sitioComercial/carrito/carrito.component';
import { ReportesComponent } from './componentes/admin/reportes/reportes.component';
import { ReporteCategoriaComponent } from './componentes/admin/reporte-categoria/reporte-categoria.component';
import { GraficosComponent } from './componentes/sitioComercial/partials/graficos/graficos.component';
import { PerfilComponent } from './componentes/admin/perfil/perfil.component';
import { PedidosComponent } from './componentes/admin/pedidos/pedidos.component';
import { BlogsComponent } from './componentes/sitioComercial/blogs/blogs.component';
import { ContenidoBlogComponent } from './componentes/sitioComercial/contenido-blog/contenido-blog.component';
import { EditBlogComponent } from './componentes/admin/edit-blog/edit-blog.component';
import { NgxEditorModule } from 'ngx-editor';
import { AllPostsComponent } from './componentes/admin/all-posts/all-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    ArticulosComponent,
    ContactenosComponent,
    NosotrosComponent,
    ProductoComponent,
    LoginComponent,
    CreateCuentaComponent,
    PortalComponent,
    ListProductsComponent,
    AddModifyProductComponent,
    CarritoComponent,
    ReportesComponent,
    ReporteCategoriaComponent,
    GraficosComponent,
    PerfilComponent,
    PedidosComponent,
    BlogsComponent,
    ContenidoBlogComponent,
    EditBlogComponent,
    AllPostsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
