import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './componentes/sitioComercial/articulos/articulos.component';
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
    {path: 'signup',component:CreateCuentaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
