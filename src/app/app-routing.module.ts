import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './componentes/sitioComercial/articulos/articulos.component';
import { InicioComponent } from './componentes/sitioComercial/inicio/inicio.component';
const routes: Routes = [
    {path: '',redirectTo: 'home',pathMatch:'full'},
    {path: 'home',component:InicioComponent},
    {path: 'articulos', component:ArticulosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
