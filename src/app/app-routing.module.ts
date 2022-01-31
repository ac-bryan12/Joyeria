import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddModifyProductComponent } from './componentes/admin/add-modify-product/add-modify-product.component';
import { ListProductsComponent } from './componentes/admin/list-products/list-products.component';
import { PedidosComponent } from './componentes/admin/pedidos/pedidos.component';
import { PerfilComponent } from './componentes/admin/perfil/perfil.component';
import { PortalComponent } from './componentes/admin/portal/portal.component';
import { ReporteCategoriaComponent } from './componentes/admin/reporte-categoria/reporte-categoria.component';
import { ReportesComponent } from './componentes/admin/reportes/reportes.component';
import { ArticulosComponent } from './componentes/sitioComercial/articulos/articulos.component';
import { CarritoComponent } from './componentes/sitioComercial/carrito/carrito.component';
import { ContactenosComponent } from './componentes/sitioComercial/contactenos/contactenos.component';
import { CreateCuentaComponent } from './componentes/sitioComercial/create-cuenta/create-cuenta.component';
import { InicioComponent } from './componentes/sitioComercial/inicio/inicio.component';
import { LoginComponent } from './componentes/sitioComercial/login/login.component';
import { NosotrosComponent } from './componentes/sitioComercial/nosotros/nosotros.component';
const routes: Routes = [
    {path: '',redirectTo: 'home',pathMatch:'full'},
    {path: 'home',component:InicioComponent},
    {path: 'articulos', component:ArticulosComponent},
    {path: 'contactenos',component:ContactenosComponent},
    {path: 'nosotros',component:NosotrosComponent},
    {path: 'login',component:LoginComponent},
    {path: 'signup',component:CreateCuentaComponent},
    {path:'portal',component:PortalComponent,children:
      [
        {path:'all_products',component:ListProductsComponent},
        {path:'add_product',component:AddModifyProductComponent},
        {path:'modify_product',component:AddModifyProductComponent},
        {path:'reportesFecha',component:ReportesComponent},
        {path:'reportesCategorias',component:ReporteCategoriaComponent},
        {path:'perfil',component:PerfilComponent},
        {path:'pedidos',component:PedidosComponent}
      ]
    },
    {path: 'shopping-cart',component:CarritoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
